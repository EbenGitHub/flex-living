from fastapi import FastAPI
from .routers import reviews
from .routers import auth

app = FastAPI(
    title="Hostaway Mock App",
    description="Hostaway mock api app",
    version="0.1.0"
)

app.include_router(reviews.router, prefix="/api/v1") 
app.include_router(auth.router, prefix="/api/v1") 

@app.get("/", include_in_schema=False)
def root():
    return {"message": "Welcome to Hostaway Mock API. Go to /docs for documentation."}