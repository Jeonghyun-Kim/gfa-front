import React from 'react';
import styled from 'styled-components';

import { MOBILE_BREAKPOINT } from '../defines';

const Root = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  display: flex;
  flex-direction: column;

  background-color: #121212;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    display: none;
  }
`;

interface Props {}

const NavBar: React.FC<Props> = ({ ...props }) => {
  return <Root {...props}>helloWorld</Root>;
};

export default NavBar;
