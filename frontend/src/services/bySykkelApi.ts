// Interface representing a station with availability
// used when the data flow goes from the backend to the frontend
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

// Interface representing a station 
export interface Station {
  station_id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  capacity: number;
}

// Interface representing the status of a station
export interface StationStatus {
  station_id: string;
  num_bikes_available: number;
  num_docks_available: number;
  is_installed: number;
  is_renting: number;
  is_returning: number;
  last_reported: number;
}

// Function to fetch station data from the Bysykkel API
export const fetchStationData = async (): Promise<Station[]> => {
  try {
    const response = await fetch('https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json');

    if (!response.ok) {
      throw new Error(`Failed to fetch stations: ${response.statusText}`);
    }

    const data = await response.json();

    // Extract the stations from the data
    const stations: Station[] = data.data.stations;

    return stations;
  } catch (error) {
    console.error(`Failed to fetch stations: ${error}`);
    return [];
  }
};

// Function to fetch station status data from the Bysykkel API
export const fetchStationStatuses = async (): Promise<StationStatus[]> => {
  try {
    const response = await fetch('https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json');

    if (!response.ok) {
      throw new Error(`Failed to fetch station statuses: ${response.statusText}`);
    }

    const data = await response.json();

    // Extract the station statuses from the data
    const statuses: StationStatus[] = data.data.stations;

    return statuses;
  } catch (error) {
    console.error(`Failed to fetch station statuses: ${error}`);
    return [];
  }
};


// Function to post station data to my own REST API
export const uploadStations = async (stations: Station[]) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/upload_stations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Set the content type to JSON
      },
      body: JSON.stringify(stations) // Convert the stations to a JSON string
    });

    if (!response.ok) {
      throw new Error(`Failed to upload stations: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error(`Error uploading stations: ${error}`);
  }
};

// Function to post station status data to my own REST API
export const uploadStationStatuses = async (statuses: StationStatus[]) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/upload_station_status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Set the content type to JSON
      },
      body: JSON.stringify(statuses) // Convert the statuses to a JSON string
    });
    if (!response.ok) {
      throw new Error(`Failed to upload station statuses: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error(`Error uploading station statuses: ${error}`);
  }
};

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

