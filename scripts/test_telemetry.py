import os
import fastf1
import pandas as pd

CACHE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend", "cache"))
os.makedirs(CACHE_DIR, exist_ok=True)

try:
    fastf1.Cache.configure(cache_dir=CACHE_DIR)
except Exception:
    fastf1.Cache.enable_cache(CACHE_DIR)

print(f"FastF1 cache enabled at: {CACHE_DIR}")

def test_telemetry():
    year = 2021
    gp = "Bahrain"
    session_type = "Q"
    
    print(f"Loading {year} {gp} Grand Prix - Session: {session_type}...")
    session = fastf1.get_session(year, gp, session_type)
    session.load(telemetry=True, laps=True, weather=True)
    
    print(f"Session Loaded: {session.event['EventName']}")
    
    # 1. Fastest lap in qualifying
    fastest_lap = session.laps.pick_fastest()
    driver_name = fastest_lap['Driver']
    lap_time = fastest_lap['LapTime']
    print(f"\n--- Fastest Lap ---")
    print(f"Driver: {driver_name}")
    print(f"Lap Time: {lap_time}")
    
    # 2. Sector times for fastest driver
    s1 = fastest_lap['Sector1Time']
    s2 = fastest_lap['Sector2Time']
    s3 = fastest_lap['Sector3Time']
    print(f"\n--- Fastest Driver Sectors ---")
    print(f"Sector 1: {s1}")
    print(f"Sector 2: {s2}")
    print(f"Sector 3: {s3}")
    
    # 3. Session-best purple sectors
    best_s1 = session.laps['Sector1Time'].min()
    best_s2 = session.laps['Sector2Time'].min()
    best_s3 = session.laps['Sector3Time'].min()
    print(f"\n--- Theoretical Best (Purple) Sectors ---")
    print(f"Purple Sector 1: {best_s1}")
    print(f"Purple Sector 2: {best_s2}")
    print(f"Purple Sector 3: {best_s3}")
    
    # 4. Telemetry coordinates & speed/brake
    telemetry = fastest_lap.get_telemetry()
    coords = telemetry[['X', 'Y', 'Speed', 'Brake']]
    print(f"\n--- Telemetry Preview ---")
    print(coords.head())
    print(f"Total telemetry data points: {len(coords)}")
    print(f"Speed range: {coords['Speed'].min()} km/h to {coords['Speed'].max()} km/h")
    
    # 5. Weather metrics
    if session.weather_data is not None and not session.weather_data.empty:
        latest_weather = session.weather_data.iloc[-1]
        print(f"\n--- Weather Conditions ---")
        print(f"Air Temp: {latest_weather.get('AirTemp')} °C")
        print(f"Track Temp: {latest_weather.get('TrackTemp')} °C")
        print(f"Humidity: {latest_weather.get('Humidity')} %")
        print(f"Rainfall: {latest_weather.get('Rainfall')}")
    else:
        print("\nNo weather data found.")

if __name__ == "__main__":
    test_telemetry()
