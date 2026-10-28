from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class NextRaceResponse(BaseModel):
    country: str
    location: str
    event_name: str
    race_date: str
    target_timestamp_utc: str
    days_left: int
    hours_left: int
    minutes_left: int
    seconds_left: int

class SectorTimes(BaseModel):
    sector_1: str
    sector_2: str
    sector_3: str
    sector_1_seconds: Optional[float] = None
    sector_2_seconds: Optional[float] = None
    sector_3_seconds: Optional[float] = None

class SectorBreakdown(BaseModel):
    driver_sectors: SectorTimes
    purple_sectors: SectorTimes
    fastest_driver_sectors: Optional[SectorTimes] = None
    delta_s1: Optional[str] = None
    delta_s2: Optional[str] = None
    delta_s3: Optional[str] = None
    fastest_driver_name: Optional[str] = None
    s1_record_holder: Optional[str] = None
    s2_record_holder: Optional[str] = None
    s3_record_holder: Optional[str] = None

class WeatherReport(BaseModel):
    air_temp: Optional[float] = None
    track_temp: Optional[float] = None
    humidity: Optional[float] = None
    rainfall: bool = False
    wind_speed: Optional[float] = None
    wind_direction: Optional[float] = None
    pressure: Optional[float] = None

class DriverSummary(BaseModel):
    code: str
    number: Optional[str] = None
    full_name: Optional[str] = None
    team: Optional[str] = None
    lap_time: Optional[str] = None

class CircuitOption(BaseModel):
    id: str
    name: str
    round_number: int
    country: str
    location: str
    year: int
    session_type: str = "Q"
    display_label: str

class TelemetryStats(BaseModel):
    min_speed_kmh: float
    max_speed_kmh: float
    avg_speed_kmh: float
    braking_percentage: float
    data_points: int

class AuthStatusResponse(BaseModel):
    is_authenticated: bool
    username: Optional[str] = None
    message: str
    instructions: str

class SessionTelemetryResponse(BaseModel):
    year: int
    grand_prix: str
    circuit_name: str
    location: str
    country: str
    session_type: str
    driver_code: str
    driver_name: str
    driver_number: str
    team_name: str
    lap_time: str
    lap_number: int
    telemetry_stats: TelemetryStats
    sector_breakdown: SectorBreakdown
    weather: WeatherReport
    map_image_data_uri: str
    available_drivers: List[DriverSummary]
    auth_notice: Optional[str] = None
