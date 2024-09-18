import { BySykkelTable } from '../components/Table';
import { Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

export const LandingPage = () => {
  return (
    <PageWrapper>
      <StyledTitle>Oslo Bysykkel Bike Availability</StyledTitle>
      <ContentWrapper>
        <BySykkelTable />
      </ContentWrapper>
    </PageWrapper>
  );
}; 

const StyledTitle = styled(Title)`
  text-align: center;
  font-size: 36px;
  letter-spacing: 1.5px;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  border-radius: 12px;
`;
