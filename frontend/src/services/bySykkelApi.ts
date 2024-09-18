// // Interface representing a station
// export interface Station {
//   station_id: string;
//   name: string;
//   address: string;
//   lat: number;
//   lon: number;
//   capacity: number;
// }

// export interface StationInformation {
//   last_updated: number;
//   data: {
//     stations: Station[];
//   };
// }

// // Interface representing the status of a station and bike availability
// export interface StationStatus {
//   station_id: string;
//   is_installed: number;
//   is_renting: number;
//   is_returning: number;
//   last_reported: number;
//   num_bikes_available: number;
//   num_docks_available: number;
// }

// export interface StationStatusInformation {
//   last_updated: number;
//   data: {
//     stations: StationStatus[];
//   };
// }

// export const fetchStationData = async (): Promise<StationInformation> => {
//   try {
//     // Fetch the station information from the API
//     const response = await fetch(
//       'https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json'
//     );

//     // Check if the response is OK, if not throw an error
//     if (!response.ok) {
//       throw new Error(`Failed to fetch stations: ${response.statusText}`);
//     }

//     // Parse the JSON response
//     const stationData: StationInformation = await response.json();
//     return stationData;

//   } catch (error) {
//     console.error(`Failed to fetch stations: ${error}`);

//     // Return an empty response in case
//     return {
//       last_updated: 0,
//       data: {
//         stations: []
//       }
//     };
//   }
// }


// export const fetchBikeAvailability = async (): Promise<StationStatusInformation> => {
//   try {
//     // Fetch the station status from the API
//     const response = await fetch(
//       'https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json'
//     );

//     // Check if the response is OK, if not throw an error
//     if (!response.ok) {
//       throw new Error(`Failed to fetch station status: ${response.statusText}`);
//     }

//     // Parse the JSON response
//     const stationData: StationStatusInformation = await response.json();
//     return stationData;

//   } catch (error) {
//     console.error(`Failed to fetch station status: ${error}`);

//     // Return an empty response in case
//     return {
//       last_updated: 0,
//       data: {
//         stations: []
//       }
//     };
//   }
// }

// services/bySykkelApi.ts

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

// Function to fetch station data from your own REST API
export const fetchStations = async (): Promise<StationWithAvailability[]> => {
  try {
    // Fetch the merged station data from your own REST API
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

