import { useState, useEffect } from 'react';
import { fetchStations, StationWithAvailability } from '../services/bySykkelApi';
import { Table, Skeleton, Empty } from 'antd';
import styled from 'styled-components';


export const BySykkelTable = () => {
  const [stations, setStations] = useState<StationWithAvailability[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [noData, setNoData] = useState<boolean>(false);

  const itemsPerPage = 10;
  const y = 600; // Table height

  // Fetch repositories on component mount
  useEffect(() => {
    const getStations = async () => {
      try {
        const data = await fetchStations();
        setStations(data);
      } catch (error) {
        console.error('Error fetching stations:', error);
        setNoData(true);
      } finally {
        setLoading(false);
      }
    };

    getStations();
  }, []);

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
            dataSource={stations}
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
