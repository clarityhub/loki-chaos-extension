import styled from 'react-emotion';

import colors from './colors';

export const Heading = styled.h1`
  color: ${props => props.theme.fontColor};
  font-weight: normal;
  font-size: 18px;
  margin-bottom: 12px;
`;

export const Text = styled.p`
  color: ${props => props.theme.fontColorLight};
`;

export const Button = styled.button`
  background-color: ${colors.primary};
  border: none;
  color: #fff;
  margin-bottom: 16px;
  margin-top: 16px;
  padding: 7px 14px;
`;
