import os
import re
from dotenv import load_dotenv

# Load .env from backend directory or workspace root
env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env")
load_dotenv(env_path)
load_dotenv()  # fallback

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.types import ASGIApp, Scope, Receive, Send
from backend.app.core.config import settings
from backend.app.api.v1.endpoints import router as api_v1_router

class NormalizePathMiddleware:
    """
    Normalizes consecutive redundant slashes (e.g. '//auth/login' -> '/auth/login')
    and trailing slashes so deployment URL variations work cleanly.
    """
    def __init__(self, app: ASGIApp):
        self.app = app

    async def __call__(self, scope: Scope, receive: Receive, send: Send):
        if scope["type"] == "http" and "path" in scope:
            p = re.sub(r"/+", "/", scope["path"])
            if len(p) > 1 and p.endswith("/"):
                p = p.rstrip("/")
            scope["path"] = p
        await self.app(scope, receive, send)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="F1 Positional and Speed Telemetry Circuit Visualizer API",
    version="1.0.0"
)

# Normalize paths before routing
app.add_middleware(NormalizePathMiddleware)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API v1 router under /api/v1 AND at root as a fallback
app.include_router(api_v1_router, prefix=settings.API_V1_STR)
app.include_router(api_v1_router)

@app.get("/", tags=["Health"])
def root():
    return {
        "status": "online",
        "service": settings.PROJECT_NAME,
        "docs_url": "/docs",
        "version": "1.0.0"
    }

@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host=settings.HOST, port=settings.PORT, reload=True)
