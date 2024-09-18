import { useState, useEffect } from 'react';
import { 
  fetchStationData, 
  fetchStations, 
  fetchStationStatuses, 
  Station, 
  StationStatus, 
  StationWithAvailability, 
  uploadStations, 
  uploadStationStatuses
} from '../services/bySykkelApi';
import { Table, Skeleton, Empty } from 'antd';
import styled from 'styled-components';


export const BySykkelTable = () => {
  // Used for data flow from the backend to the frontend
  const [stationsWithAvailability, setStationsWithAvailability] = useState<StationWithAvailability[]>();

  // Used for data flow from the frontend to the backend
  const [stations, setStations] = useState<Station[]>();
  const [stationStatuses, setStationStatuses] = useState<StationStatus[]>();

  const [loading, setLoading] = useState<boolean>(true);
  const [noData, setNoData] = useState<boolean>(false);

  const itemsPerPage = 10;
  const y = 600; // Table height

  // Fetch repositories on component mount
  useEffect(() => {

    // Used for data flow from the backend to the frontend

    // const getStations = async () => {
    //   try {
    //     const data = await fetchStations();
    //     setStationsWithAvailability(data);
    //   } catch (error) {
    //     console.error('Error fetching stations:', error);
    //     setNoData(true);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    
    // Used for data flow from the frontend to the backend
    const getStationsByAPI = async () => {
      try {
        // Fetch data from the Bysykkel API
        const stationData = await fetchStationData();
        const stationStatuses = await fetchStationStatuses();

        setStations(stationData);
        setStationStatuses(stationStatuses);

        // Upload data to the backend
        await uploadStations(stationData);
        await uploadStationStatuses(stationStatuses);
      } catch (error) {
        console.error('Error fetching stations:', error);
        setNoData(true);
      } finally {
        setLoading(false);
      }
    }

    getStationsByAPI();
    //getStations();
  }, []);

  // Merge StationData and StationStatuses to fit the StationWithAvailability interface
  // so that the data can be displayed in the table
  useEffect(() => {
    if (stations && stationStatuses) {
      const mergedData = stations.map(station => {
        const status = stationStatuses.find(status => status.station_id === station.station_id);
        return {
          ...station,
          num_bikes_available: status?.num_bikes_available ?? 0,
          num_docks_available: status?.num_docks_available ?? 0,
          is_installed: status?.is_installed ?? 0,
          is_renting: status?.is_renting ?? 0,
          is_returning: status?.is_returning ?? 0,
          last_reported: status?.last_reported ?? 0,
        };
      });

      setStationsWithAvailability(mergedData);
    }
  }, [stations, stationStatuses]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
    },
    {
      title: 'Bikes Available',
      dataIndex: 'num_bikes_available',
      key: 'num_bikes_available',
    },
    {
      title: 'Docks Available',
      dataIndex: 'num_docks_available',
      key: 'num_docks_available',
    },
    {
      title: 'Last Reported',
      dataIndex: 'last_reported',
      key: 'last_reported',
      render: (timestamp: number) => new Date(timestamp * 1000).toLocaleString(), // Convert timestamp to date string 
    },
  ];
  
  // If there is no data, display an empty state
  if (noData) {
    return <Empty />;
  }

  return (
    <StyledDiv>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <Table
            dataSource={stationsWithAvailability}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: itemsPerPage, position: ['bottomCenter'] }}
            tableLayout="auto" // Allows columns to size based on content
            scroll={{ y }} // Sets the table body height to 600px
          />
        </>
      )}
    </StyledDiv>
  )
};

const StyledDiv = styled.div`
  display: flex; 
  justify-content: center;
  padding: 20px;
  flex-direction: column;
`;
