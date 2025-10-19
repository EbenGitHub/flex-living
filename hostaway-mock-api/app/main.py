# app/main.py

from fastapi import FastAPI
from .routers import reviews # Import your router module

# Create the main app instance
app = FastAPI(
    title="My Scalable FastAPI App",
    description="An API structured with APIRouter for scalability.",
    version="0.1.0"
)

# ⭐️ Include Routers
# This is the key to decoupling your application
app.include_router(reviews.router, prefix="/api/v1") 

@app.get("/", include_in_schema=False)
def root():
    return {"message": "Welcome to the API. Go to /docs for documentation."}

# Add setup code here for:
# - Event Handlers (startup/shutdown)
# - Middleware (CORS, logging)
# - Database/Logging initialization