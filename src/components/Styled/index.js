import styled from 'react-emotion';

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
  background-color: #4285F4;
  border: none;
  color: #fff;
  margin-bottom: 16px;
  margin-top: 16px;
`;
