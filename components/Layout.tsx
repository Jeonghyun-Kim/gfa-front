import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';

import NavBar from './NavBar';
import PlayBar from './PlayBar';
import Loading from './Loading';

// import { logPageView } from '../utils/analytics';

// import { sendCounter } from '../lib/utils';
import { MOBILE_BREAKPOINT, PLAYBAR_HEIGHT, NAVBAR_WIDTH } from '../defines';

import IndexContext from '../IndexContext';

const Root = styled.div`
  position: fixed;
  width: 100vw;
  height: 100%;

  .main {
    position: relative;
    overflow-y: auto;
  }

  @media screen and (min-width: ${MOBILE_BREAKPOINT + 1}px) {
    display: grid;
    grid-template: 1fr ${PLAYBAR_HEIGHT}px / ${NAVBAR_WIDTH}px 1fr;

    .main {
      grid-column: 2 / 3;
      grid-row: 1 / 2;
    }
  }
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [index, setIndex] = React.useState<number>(0);
  const refSlider = React.createRef<Slider | null>();
  React.useEffect(() => {
    const item = sessionStorage.getItem('@artistId');
    if (item) setIndex(JSON.parse(item));
    else setIndex(1);
    // logPageView();
    // if (process.env.NODE_ENV === 'production') sendCounter();
  }, []);
  return (
    <Root>
      {index > 0 ? (
        <IndexContext.Provider value={{ index, setIndex, refSlider }}>
          <NavBar />
          <div className="main">{children}</div>
          <PlayBar />
        </IndexContext.Provider>
      ) : (
        <Loading full />
      )}
    </Root>
  );
};

export default Layout;
