import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Slider from 'react-slick';
import { isIE } from 'react-device-detect';
import smoothscroll from 'smoothscroll-polyfill';

import NavBar from './NavBar';
import PlayBar from './PlayBar';
import Loading from './Loading';

import { logPageView } from '../lib/analytics';
import { sendCounter } from '../lib/utils';
import useWindowSize from '../lib/hooks/useWindowSize';

import { PLAYBAR_HEIGHT, NAVBAR_WIDTH, NUM_ARTISTS } from '../defines';

import IndexContext from '../IndexContext';

interface RootProps {
  grid?: boolean;
}
const Root = styled.div<RootProps>`
  position: fixed;
  width: 100%;
  height: 100%;

  display: ${(props) => (props.grid ? 'grid' : 'block')};
  grid-template: 1fr ${PLAYBAR_HEIGHT}px / ${NAVBAR_WIDTH}px 1fr;

  .main {
    position: relative;
    overflow-y: hidden;
    scroll-behavior: smooth;
    width: 100%;
    height: 100%;
    ${(props) => props.grid && 'grid-column: 2 / 3'};
    ${(props) => props.grid && 'grid-row: 1 / 2'};

    &.withLayout {
      height: calc(100vh - ${PLAYBAR_HEIGHT}px);
    }

    &.overflowAuto {
      overflow-y: auto;
    }
  }

  &.rootScroll {
    position: initial;
    height: auto;
    min-height: 100%;
    .main {
      height: auto;
      min-height: 100%;
    }
  }
`;

const ForIE = styled.div`
  * {
    text-align: center;
  }
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { isMobile, isTablet, isPortrait } = useWindowSize();
  const withLayout = !isMobile && (!isTablet || !isPortrait);
  const [index, setIndex] = React.useState<number>(0);
  const refSlider = React.useRef<Slider | null>(null);
  // For listModal toggle
  const [listModalFlag, setListModalFlag] = React.useState<boolean>(false);
  // For detailModal toggle
  const [detailModalFlag, setDetailModalFlag] = React.useState<boolean>(false);
  // For zoomIn Modal Open
  const [zoomInModal, setZoomInModal] = React.useState<number>(0);
  // MainRef
  const refMain = React.createRef<HTMLDivElement>();

  // Set initial index with router.query.id if exists.
  React.useEffect(() => {
    // if (process.env.NODE_ENV === 'production') sendCounter();
    if (router.query) {
      const { id } = router.query;
      if (id) {
        setIndex(Number(id));
        sessionStorage.setItem('@artistId', `${id}`);

        // if (withLayout) {
        router.replace(router.pathname, undefined, {
          shallow: true,
        });
        // }
      } else {
        const item = sessionStorage.getItem('@artistId');
        if (item && JSON.parse(item) >= 1 && JSON.parse(item) <= NUM_ARTISTS)
          setIndex(JSON.parse(item));
        else setIndex(1);
        // TODO: Prefetch initial slide's image. (useContext or fetch to server to get links)
        // or at the index page..?
      }
    }
  }, [router, withLayout]);

  React.useEffect(() => {
    smoothscroll.polyfill();
    sendCounter();
    if (process.env.NODE_ENV === 'production') {
      logPageView();
    }
  }, []);

  if (isIE) {
    return (
      <ForIE>
        <h2>인터넷 익스플로러에서는 전시를 감상할 수 없어요ㅜ.ㅜ</h2>
        <h2>보다 원활한 전시 감상을 위해 크롬 브라우저 사용을 권장합니다.</h2>
        <a
          href="https://www.google.com/chrome/"
          target="_blank"
          rel="noreferrer"
        >
          <h4>크롬 다운받기</h4>
        </a>
      </ForIE>
    );
  }

  return (
    <Root
      className={`${!withLayout && router.pathname === '/' && 'rootScroll'}`}
      grid={withLayout}
    >
      {index > 0 ? (
        <IndexContext.Provider
          value={{
            index,
            setIndex,
            refSlider,
            withLayout,
            listModalFlag,
            setListModalFlag,
            detailModalFlag,
            setDetailModalFlag,
            zoomInModal,
            setZoomInModal,
            refMain,
          }}
        >
          {withLayout && <NavBar />}
          <div
            ref={refMain}
            className={`main ${withLayout && 'withLayout'} ${
              withLayout && detailModalFlag && 'overflowAuto'
            }`}
          >
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
