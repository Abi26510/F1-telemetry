from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional, Any
from backend.app.api.v1.schemas import (
    NextRaceResponse,
    CircuitOption,
    SessionTelemetryResponse,
    AuthStatusResponse,
    AuthLoginRequest,
    AuthLoginResponse
)
from backend.app.services.schedule_service import get_next_race_countdown
from backend.app.services.f1_service import (
    get_available_years,
    get_curated_circuits,
    get_session_telemetry,
    get_auth_status,
    authenticate_f1,
    logout_f1
)

router = APIRouter()

@router.get("/schedule/next", response_model=NextRaceResponse, summary="Get next F1 race and live countdown")
def get_next_race():
    """
    Returns the upcoming Formula 1 race details and remaining countdown time.
    """
    try:
        return get_next_race_countdown()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch next race schedule: {str(e)}")

@router.get("/auth/status", response_model=AuthStatusResponse, summary="Get F1TV API authentication status")
def auth_status():
    """
    Returns whether official Formula 1 live timing credentials are active.
    """
    return get_auth_status()

@router.post("/auth/login", response_model=AuthLoginResponse, summary="Sign in with Formula 1 credentials")
def login(payload: AuthLoginRequest):
    """
    Authenticates with Formula 1 IDP and connects backend to official live telemetry streams.
    """
    return authenticate_f1(username=payload.username, password=payload.password)

@router.post("/auth/logout", response_model=AuthStatusResponse, summary="Disconnect Formula 1 account")
def logout():
    """
    Clears cached Formula 1 tokens and disconnects session.
    """
    return logout_f1()

@router.get("/years", response_model=List[int], summary="List available championship seasons")
def get_years():
    """
    Returns available seasons for telemetry speed visualization (2018-2024, excluding 2025).
    """
    return get_available_years()

@router.get("/circuits", response_model=List[CircuitOption], summary="List all circuits/rounds for a season")
def get_circuits(year: Optional[int] = Query(2023, description="Filter circuits by championship season")):
    """
    Returns the calendar of circuits and Grand Prix rounds for the selected season.
    """
    try:
        return get_curated_circuits(year=year)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to list circuits: {str(e)}")

@router.get("/telemetry/speed-map", response_model=SessionTelemetryResponse, summary="Get circuit speed map, sectors & weather")
def get_speed_map(
    year: int = Query(2023, description="F1 Championship Season"),
    gp: str = Query("1", description="Grand Prix round number or name"),
    session_type: str = Query("Q", description="Session type: Q (Qualifying), FP1, FP2, FP3, R"),
    driver: Optional[str] = Query(None, description="Driver code/number (e.g. VER, PER, LEC, HAM)")
):
    """
    Generates a color-coded speed map and returns sector analysis, lap times, and weather metrics.
    """
    try:
        return get_session_telemetry(year=year, gp=gp, session_type=session_type, driver_code=driver)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load telemetry for {year} {gp}: {str(e)}")
