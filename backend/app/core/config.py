import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "F1 Circuit Speed & Telemetry Visualizer"
    API_V1_STR: str = "/api/v1"
    
    # Base paths
    BASE_DIR: str = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    CACHE_DIR: str = os.path.join(BASE_DIR, "cache")
    GENERATED_MAPS_DIR: str = os.path.join(BASE_DIR, "generated_maps")
    
    # Server configs
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        "*"
    ]

settings = Settings()
os.makedirs(settings.CACHE_DIR, exist_ok=True)
os.makedirs(settings.GENERATED_MAPS_DIR, exist_ok=True)
