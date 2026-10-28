import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.app.services.f1_service import (
    get_curated_circuits,
    get_available_years,
    get_session_telemetry
)

def test_api():
    print("Testing Available Years...")
    years = get_available_years()
    print(f"Years: {years}")
    assert 2025 not in years, "2025 should be removed!"
    assert 2023 in years, "2023 must be available!"

    print("\nTesting 2023 Circuits...")
    circuits_2023 = get_curated_circuits(2023)
    print(f"Total 2023 circuits found: {len(circuits_2023)}")
    assert len(circuits_2023) == 22, f"Expected 22 circuits for 2023, got {len(circuits_2023)}"

    print("\nTesting Telemetry Response for Round 1 (Bahrain)...")
    res = get_session_telemetry(year=2023, gp="1")
    assert res.driver_name == "Max Verstappen"
    assert res.lap_time == "1:29:708"
    assert res.sector_breakdown is not None
    
    sb = res.sector_breakdown
    print(f"Driver Sectors: S1={sb.driver_sectors.sector_1}, S2={sb.driver_sectors.sector_2}, S3={sb.driver_sectors.sector_3}")
    print(f"Purple Sectors: S1={sb.purple_sectors.sector_1}, S2={sb.purple_sectors.sector_2}, S3={sb.purple_sectors.sector_3}")
    print(f"S1 Record Holder: {sb.s1_record_holder}")
    print(f"S2 Record Holder: {sb.s2_record_holder}")
    print(f"S3 Record Holder: {sb.s3_record_holder}")
    print(f"Fastest Driver Name: {sb.fastest_driver_name}")

    assert "Colon:" not in sb.driver_sectors.sector_1
    assert ":" in sb.driver_sectors.sector_1
    assert sb.s1_record_holder is not None
    assert sb.s2_record_holder is not None
    assert sb.s3_record_holder is not None

    print("\nTesting Weather...")
    w = res.weather
    print(f"Air Temp: {w.air_temp}°C, Track Temp: {w.track_temp}°C, Rainfall: {w.rainfall}")
    assert w.air_temp is not None

    print("\nALL BACKEND API VERIFICATIONS PASSED!")

if __name__ == "__main__":
    test_api()
