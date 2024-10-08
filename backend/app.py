from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict
import requests
from models import Station, StationStatus, StationWithStatus

app = FastAPI()

# allow requests from http://localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

STATION_INFO_URL = (
    "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json"
)
STATION_STATUS_URL = "https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json"

# store the stations data in memory 
def fetch_station_info() -> List[Station]:
    response = requests.get(STATION_INFO_URL)

    if response.status_code == 200:
        data = response.json()
        # get the list of stations
        stations = data["data"]["stations"]
        # return a list Pydantic Station objects
        # The ** operator is used to unpack the dictionary and pass it as keyword arguments
        return [Station(**station) for station in stations]
    else:
        raise HTTPException(
            status_code=500, detail="Failed to fetch station information"
        )

# this returns a dictionary with station_id as key and StationStatus as value 
# because we need to look up the status of a station by its id
def fetch_station_status() -> Dict[str, StationStatus]:
    response = requests.get(STATION_STATUS_URL)

    if response.status_code == 200:
        data = response.json()
        # get the list of stations
        statuses = data["data"]["stations"]
        # return a dictionary with station_id as key and StationStatus as value
        return {status["station_id"]: StationStatus(**status) for status in statuses}
    else:
        raise HTTPException(
            status_code=500, detail="Failed to fetch station information"
        )

stations_data: List[Station] = []
station_status_data: List[StationStatus] = []

# store the stations data in memory
@app.post("/upload_stations")
def upload_stations(stations: List[Station]):
    try:
        global stations_data
        # store the stations data in memory
        stations_data = stations
        return {"stations_data": stations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# store the station status data in memory
@app.post("/upload_station_status")
def upload_station_status(statuses: List[StationStatus]):
    try:
        global station_status_data
        # store the station status data in memory
        station_status_data = statuses
        print(station_status_data)
        return {"station_status_data": statuses}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# endpoint to get all the stations with status
@app.get("/stations", response_model=List[StationWithStatus])
def get_stations():
    try:
        stations = fetch_station_info()
        statuses = fetch_station_status()

        stations_with_status = []
        for station in stations:
            # get the status for the station
            status = statuses.get(station.station_id)
            if status:
                # combine the station and status
                station_with_status = StationWithStatus(
                    **station.model_dump(), **status.model_dump()
                )
                stations_with_status.append(station_with_status)
            else:
                raise HTTPException(status_code=404, detail="Station status not found")
        return stations_with_status
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    
# endpoint to get a station with status by name
@app.get("/stations/{name}", response_model=StationWithStatus)
def get_station_name(name: str):
    try:
        stations = fetch_station_info()
        statuses = fetch_station_status()

        # find the station with a given name
        station = None
        for s in stations:
            if s.name == name:
                station = s
                break
        
        # combine the station and status
        if station:
            status = statuses.get(station.station_id)
            if status:
                station_with_status = StationWithStatus(
                    **station.model_dump(), **status.model_dump()
                )
                return station_with_status
            else:
                raise HTTPException(status_code=404, detail=f"Station status with name '{name}' not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
