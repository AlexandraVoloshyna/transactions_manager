import { Theme } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
`;

export const PageNumber = styled.span<{ isActive?: boolean; theme?: Theme }>`
  margin: 0 5px;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  background-color: ${props =>
    props.isActive ? props.theme.colors.black : 'transparent'};
  color: ${props =>
    props.isActive ? props.theme.colors.white : props.theme.colors.black};
  font-weight: ${props => (props.isActive ? 'bold' : '')};
`;

export const Arrow = styled.span`
  cursor: pointer;
  margin: 0 10px;
`;
