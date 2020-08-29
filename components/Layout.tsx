import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';

import NavBar from './NavBar';
import PlayBar from './PlayBar';
import Loading from './Loading';

// import { logPageView } from '../utils/analytics';
// import { sendCounter } from '../lib/utils';
import useWindowSize from '../lib/hooks/useWindowSize';

import { PLAYBAR_HEIGHT, NAVBAR_WIDTH } from '../defines';

import IndexContext from '../IndexContext';

interface RootProps {
  grid?: boolean;
}
const Root = styled.div<RootProps>`
  position: fixed;
  width: 100%;
  height: 100%;

  ${(props) => props.grid && 'display: grid'};
  ${(props) =>
    props.grid &&
    `grid-template: 1fr ${PLAYBAR_HEIGHT}px / ${NAVBAR_WIDTH}px 1fr`};

  .main {
    position: relative;
    overflow-y: auto;
    height: 100%;
    width: 100%;
    ${(props) => props.grid && 'grid-column: 2 / 3'};
    ${(props) => props.grid && 'grid-row: 1 / 2'};
  }
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isMobile, isTablet, isPortrait } = useWindowSize();
  const [index, setIndex] = React.useState<number>(0);
  const refSlider = React.createRef<Slider | null>();
  React.useEffect(() => {
    const item = sessionStorage.getItem('@artistId');
    if (item) setIndex(JSON.parse(item));
    else setIndex(1);
    // logPageView();
    // if (process.env.NODE_ENV === 'production') sendCounter();
  }, []);
  const grid = !isMobile && (!isTablet || !isPortrait);
  return (
    <Root grid={grid}>
      {index > 0 ? (
        <IndexContext.Provider value={{ index, setIndex, refSlider }}>
          <NavBar visible={grid} />
          <div className="main">{children}</div>
          <PlayBar visible={grid} />
        </IndexContext.Provider>
      ) : (
        <Loading full />
      )}
    </Root>
  );
};

export default Layout;
