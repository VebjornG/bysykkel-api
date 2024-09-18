// Interface representing a station with availability
export interface StationWithAvailability {
  station_id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  capacity: number;
  num_bikes_available: number;
  num_docks_available: number;
  is_installed: number;
  is_renting: number;
  is_returning: number;
  last_reported: number;
}

// Function to fetch station data from my own REST API
export const fetchStations = async (): Promise<StationWithAvailability[]> => {
  try {
    // Fetch the merged station data
    const response = await fetch('http://127.0.0.1:8000/stations');

    // Check if the response is OK; if not, throw an error
    if (!response.ok) {
      throw new Error(`Failed to fetch stations: ${response.statusText}`);
    }

    // Parse the JSON response
    const stations: StationWithAvailability[] = await response.json();
    return stations;

  } catch (error) {
    console.error(`Failed to fetch stations: ${error}`);
    // Return an empty array in case of error
    return [];
  }
}

