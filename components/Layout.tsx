import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Slider from 'react-slick';

import NavBar from './NavBar';
import PlayBar from './PlayBar';
import Loading from './Loading';

// import { logPageView } from '../lib/analytics';
// import { sendCounter } from '../lib/utils';
import useWindowSize from '../lib/hooks/useWindowSize';

import {
  PLAYBAR_HEIGHT,
  NAVBAR_WIDTH,
  NUM_ARTISTS,
  TABLET_BREAKPOINT,
} from '../defines';

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

    @media screen and (max-width: ${TABLET_BREAKPOINT}px) {
      /* Hide scrollbar for IE, Edge and Firefox */
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */

      /* Hide scrollbar for Chrome, Safari and Opera */
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { isMobile, isTablet, isPortrait } = useWindowSize();
  const withLayout = !isMobile && (!isTablet || !isPortrait);
  const [index, setIndex] = React.useState<number>(0);
  const refSlider = React.createRef<Slider | null>();
  const refMain = React.createRef<HTMLDivElement>();
  // For listModal toggle
  const [listModalFlag, setListModalFlag] = React.useState<boolean>(false);

  // Set initial index with router.query.id if exists.
  React.useEffect(() => {
    if (router.query) {
      const { id } = router.query;
      if (id) {
        setIndex(Number(id));
        sessionStorage.setItem('@artistId', `${id}`);
        if (refSlider.current) refSlider.current.slickGoTo(Number(id) - 1);
        // if (process.env.NODE_ENV === 'production') sendCounter();
        router.replace(router.pathname.split('?')[0], undefined, {
          shallow: true,
        });
      } else {
        const item = sessionStorage.getItem('@artistId');
        if (item && JSON.parse(item) >= 1 && JSON.parse(item) <= NUM_ARTISTS)
          setIndex(JSON.parse(item));
        else setIndex(1);
        // TODO: Prefetch initial slide's image. (useContext or fetch to server to get links)
        // or at the index page..?
      }
    }
  }, [router, refSlider]);

  React.useEffect(() => {
    // logPageView();
    // if (process.env.NODE_ENV === 'production') sendCounter();
  }, []);

  return (
    <Root grid={withLayout}>
      {index > 0 ? (
        <IndexContext.Provider
          value={{
            index,
            setIndex,
            refSlider,
            withLayout,
            listModalFlag,
            setListModalFlag,
            refMain,
          }}
        >
          {withLayout && <NavBar />}
          <div className="main" ref={refMain}>
            {children}
          </div>
          {withLayout && <PlayBar />}
        </IndexContext.Provider>
      ) : (
        <Loading full />
      )}
    </Root>
  );
};

export default Layout;
