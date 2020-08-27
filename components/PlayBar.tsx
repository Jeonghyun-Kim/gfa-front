import React from 'react';
import styled from 'styled-components';

import { MOBILE_BREAKPOINT } from '../defines';

const Root = styled.div`
  grid-column: 1 / 3;
  grid-row: 2 / 3;
  display: flex;

  background-color: #222222f7;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    display: none;
  }
`;

interface Props {}

const PlayBar: React.FC<Props> = ({ ...props }) => {
  return <Root {...props}>I'm palybar.</Root>;
};

export default PlayBar;
