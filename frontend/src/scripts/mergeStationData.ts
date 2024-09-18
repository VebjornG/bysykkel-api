// import { Station, StationInformation, StationStatusInformation } from "../services/bySykkelApi";

// // Define a new interface that combines Station and StationStatus
// export interface StationWithAvailability extends Station {
//   num_bikes_available: number;
//   num_docks_available: number;
//   last_reported: number;
// }

// // Function to merge station information and status
// export const mergeStationData = (
//   stationInfo: StationInformation,
//   stationStatus: StationStatusInformation
// ): StationWithAvailability[] => {

//   // Create an array of station status data using station_id as key returning the status object
//   // I.e., for each status object it creates a key, value pair [status.station_id, status]
//   const statusMap = new Map(
//     stationStatus.data.stations.map((status) => [status.station_id, status])
//   );

//   // Map over the station information and add the status information
//   // to the station object
//   return stationInfo.data.stations.map((station) => {
//     // Get the values from the statusMap using the station_id as key
//     const status = statusMap.get(station.station_id);
//     return {
//       ...station,
//       num_bikes_available: status?.num_bikes_available || 0,
//       num_docks_available: status?.num_docks_available || 0,
//       last_reported: status?.last_reported || 0,
//     };
//   });
// };
export const SomeFunction = () => {
  // Some code
}