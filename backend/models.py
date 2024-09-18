from pydantic import BaseModel


class Station(BaseModel):
    station_id: str
    name: str
    address: str
    lat: float
    lon: float
    capacity: int


class StationStatus(BaseModel):
    # no need for station_id as it is already present in the Station model
    num_bikes_available: int
    num_docks_available: int
    is_installed: int
    is_renting: int
    is_returning: int
    last_reported: int

# Combine Station and StationStatus models
class StationWithStatus(Station, StationStatus):
    pass
