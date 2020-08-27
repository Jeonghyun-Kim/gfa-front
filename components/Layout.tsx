import React from 'react';
import styled from 'styled-components';

import NavBar from './NavBar';
import PlayBar from './PlayBar';

// import { logPageView } from '../utils/analytics';

import { sendCounter } from '../lib/utils';
import { MOBILE_BREAKPOINT, PLAYBAR_HEIGHT, NAVBAR_WIDTH } from '../defines';

const Root = styled.div`
  position: fixed;
  display: grid;
  width: 100vw;
  height: 100%;
  grid-template: 1fr ${PLAYBAR_HEIGHT}px / ${NAVBAR_WIDTH}px 1fr;

  .root {
    position: relative;
    grid-column: 2 / 3;
    grid-row: 1 / 2;

    @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
      grid-column: 1 / 3;
      grid-row: 1 / 3;
    }
  }
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  React.useEffect(() => {
    // logPageView();
    if (process.env.NODE_ENV === 'production') sendCounter();
  }, []);
  return (
    <Root>
      <NavBar />
      <div className="root">{children}</div>
      <PlayBar />
    </Root>
  );
};

export default Layout;
