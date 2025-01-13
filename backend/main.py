from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/route")
def calculate_route(start: str, end: str):
    try:
        # Fetch coordinates for start location
        start_response = requests.get(
            f"https://nominatim.openstreetmap.org/search?format=json&q={start}"
        ).json()
        if not start_response:
            raise HTTPException(status_code=404, detail="Start location not found")
        start_coords = start_response[0]

        # Fetch coordinates for end location
        end_response = requests.get(
            f"https://nominatim.openstreetmap.org/search?format=json&q={end}"
        ).json()
        if not end_response:
            raise HTTPException(status_code=404, detail="End location not found")
        end_coords = end_response[0]

        return {
            "start": {"lat": start_coords["lat"], "lon": start_coords["lon"]},
            "end": {"lat": end_coords["lat"], "lon": end_coords["lon"]},
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
