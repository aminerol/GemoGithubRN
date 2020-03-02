import styled from 'styled-components/native';

export default Card = styled.View`
  flex: 1 auto;
  flexDirection: row;
  marginHorizontal: 16px;
  marginVertical: 4px;
  padding: 8px;
  backgroundColor: ${props => props.theme.secondary};
  borderRadius: 5px;
  elevation: 4;
`;