import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styled from 'styled-components';
import Slider from 'react-slick';
import { CSSTransition } from 'react-transition-group';
import { useSwipeable } from 'react-swipeable';
import { usePinch } from 'react-use-gesture';
import { isIOS } from 'react-device-detect';

import IconButton from '@material-ui/core/IconButton';
import ZoomIn from '@material-ui/icons/ZoomIn';
import SvgIcon from '@material-ui/core/SvgIcon';
import ZoomInShadow from '../public/icons/zoom_in.svg';
// import LeftArrow from '../public/icons/left_arrow.svg';
// import RightArrow from '../public/icons/right_arrow.svg';

import Header from '../components/Header';
import RenderedImage from '../components/RenderedImage';
import MobileFooter from '../components/MobileFooter';
import ArtistsModal from '../components/ArtistList/ArtistsModal';
import DesktopList from '../components/ArtistList/DesktopList';
import MobileDetailModal from '../components/Modal/MobileDetailModal';
import ZoomInModal from '../components/Modal/ZoomInModal';
import DesktopDetail from '../components/DesktopDetail';
import DetailGroup from '../components/DetailGroup';
import ManualModal from '../components/Modal/ManualModal';
import EdgeModal from '../components/Modal/EdgeModal';
import InvitedModal from '../components/Modal/InvitedModal';

import { artistHit } from '../lib/utils';
import fetcher from '../lib/fetcher';
import useMobileOrientation from '../lib/hooks/useWindowSize';

// import { API_URL, BUCKET_URL, NUM_ARTISTS } from '../defines';
import { API_URL, HEADER_HEIGHT, NUM_ARTISTS } from '../defines';

import IndexContext from '../IndexContext';

const ZoomInButton = styled(IconButton)`
  position: absolute !important;
  padding: 5px !important;
  z-index: 2;

  &:hover {
    opacity: 0.7;
  }

  svg {
    font-size: 40px;
    color: white;
  }

  &.desktop {
    top: initial;
    right: 30px;
    bottom: 30px;
    background-color: black !important;

    svg {
      font-size: 30px;
    }
  }

  &.mobile {
    top: 5px;
    right: 5px;

    &.headerFlag {
      top: calc(${HEADER_HEIGHT}px + 5px);
    }
  }
`;

const MyDetailGroup = styled(DetailGroup)`
  bottom: 30px;
  transition: 300ms ease;
  z-index: 2;

  button {
    width: 60px;
    height: 25px;
    &:hover {
      background: none;
    }

    svg {
      font-size: 60px;
    }
  }

  .detailText {
    margin-bottom: 10px;
    font-size: 1.2rem;
  }

  &:hover {
    cursor: pointer;
    transform: translate(-50%, -10px);
  }
`;

const Root = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  .lastModal {
    width: 100%;
    height: 100%;
  }

  .withLayoutBox {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .sliderContainer {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .slick-slider,
  .slick-list,
  .slick-track,
  .slick-slide {
    height: 100%;
    outline: none;
  }

  .slick-track {
    /* macOS safari */
    position: absolute;
  }

  .slick-slide > div {
    height: 100%;
  }

  .mobile-modal-enter {
    top: 100%;
    .modalHeader {
      /* top: 100%; */
      opacity: 0;
    }
  }
  .mobile-modal-enter-active {
    top: 0;
    transition: 100ms ease;
    .modalHeader {
      /* top: 0; */
      opacity: 1;
      transition: 100ms ease;
    }
  }

  .list-desktop-enter {
    opacity: 0;
  }

  .list-desktop-enter-active {
    opacity: 1;
    transition: 300ms;
  }

  .header-toggle-enter {
    top: 5px;
    transition: 300ms;
  }

  .header-toggle-enter-active {
    top: calc(${HEADER_HEIGHT}px + 5px);
    transition: 300ms;
  }

  .header-toggle-exit {
    top: calc(${HEADER_HEIGHT}px + 5px);
    transition: 300ms;
  }

  .header-toggle-exit-active {
    top: 5px;
    transition: 300ms;
  }
`;

// const ArrowButton = styled(IconButton)`
//   position: absolute !important;
//   top: 50%;
//   transform: translateY(-50%);
//   padding: 0 !important;
//   &.left {
//     left: 16px;
//   }
//   &.right {
//     right: 16px;
//   }
//   svg {
//     color: white;
//     font-size: 40px;
//   }
// `;

interface Props {
  artists: Artist[];
}
const ArtistPage: React.FC<Props> = ({ artists }) => {
  const router = useRouter();
  // For Header toggle
  const [headerFlag, setHeaderFlag] = React.useState<boolean>(true);
  const [headerTimer, setHeaderTimer] = React.useState<NodeJS.Timeout | null>(
    null,
  );
  // Don't toggle Header when swiping sliders
  const [slideChangedFlag, setSlideChangedFlag] = React.useState<boolean>(
    false,
  );
  // Artist Index from sessionStorage, IndexContext from Layout.tsx
  const {
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
  } = React.useContext(IndexContext);
  // Use screen size and orientation (hooks)
  const { isPortrait } = useMobileOrientation();
  // For detecting orientation change
  const [ori, setOri] = React.useState<boolean | null>(null);
  const [firstDist, setFirstDist] = React.useState<number | null>(null);
  const invitedArtistName = sessionStorage.getItem('@artistName');
  const [firstModal, setFirstModal] = React.useState<boolean>(
    Boolean(invitedArtistName),
  );
  const [lastModal, setLastModal] = React.useState<boolean>(false);
  const refBox = React.useRef<HTMLDivElement>(null);

  const artwork = artists[index - 1].artworks[0];

  const handlePinch = usePinch(({ first, active, da: [d], vdva: [vd] }) => {
    if (first) setFirstDist(d);
    else if (!active) setFirstDist(null);
    if (active && firstDist && (d > firstDist + 200 || vd > 1)) {
      if (withLayout || isIOS) {
        setZoomInModal(artwork.id);
      } else if (!router.query.zoomIn) {
        router.push(`?zoomIn=${artwork.id}`, undefined, { shallow: true });
      }
    }
  });

  const handleDetailOpen = () => {
    if (withLayout || isIOS) {
      setDetailModalFlag(true);
    } else if (!router.query.detailOpen) {
      router.push(`?detailOpen=1`, undefined, {
        shallow: true,
      });
    }
  };

  // const handleDetailClose = () => {
  //   if (withLayout || isIOS) {
  //     if (isIOS) setDetailModalFlag(false);
  //   } else if (router.query.detailOpen && !router.query.zoomIn) {
  //     router.back();
  //   }
  // };

  const handleSwipe = useSwipeable({
    onSwiped: (e) => {
      if (e.dir === 'Up') {
        handleDetailOpen();
      }
    },
  });

  // React.useEffect(() => {
  //   if (sessionStorage.getItem('@manual')) {
  //     setManualOpen(false);
  //   }
  // }, []);

  React.useEffect(() => {
    // Set initial slide (react-slick's initialSlide property is now working properly.)
    if (refSlider.current) {
      refSlider.current.slickGoTo(index - 1);
    }
  }, []);

  React.useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      const { keyCode } = e;

      switch (keyCode) {
        case 9:
          if (withLayout || isIOS) {
            setListModalFlag(!listModalFlag);
          } else if (router.query.listOpen) router.back();
          else
            router.push('?listOpen=1', undefined, {
              shallow: true,
            });
          break;
        case 27:
          if (withLayout || isIOS) {
            if (zoomInModal) setZoomInModal(0);
            else if (detailModalFlag) {
              if (isIOS) setDetailModalFlag(false);
            } else if (listModalFlag) setListModalFlag(false);
          } else if (
            router.query.zoomIn ||
            router.query.detailOpen ||
            router.query.listOpen
          )
            router.back();
          break;
        case 32:
          if (withLayout || isIOS) {
            setZoomInModal(zoomInModal ? 0 : artwork.id);
          } else if (router.query.zoomIn) router.back();
          else
            router.push(`?zoomIn=${artwork.id}`, undefined, {
              shallow: true,
            });
          break;
        // case 38:
        //   handleDetailOpen();
        //   break;
        case 40:
          handleDetailOpen();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [
    index,
    withLayout,
    zoomInModal,
    detailModalFlag,
    listModalFlag,
    router.query,
  ]);

  // Same as componentDidMount()
  React.useEffect(() => {
    // if (refSlider.current) refSlider.current.slickGoTo(index - 1);
    // Clear all setTimeout() function, excecuting on page unmount event.

    const clearFunc = () => {
      let timeoutId = (setTimeout(() => {}, 0) as unknown) as number;
      while (timeoutId) {
        timeoutId -= 1;
        clearTimeout(timeoutId);
      }
      if (listModalFlag) {
        setListModalFlag(false);
      }
      if (detailModalFlag) {
        setDetailModalFlag(false);
      }
      if (zoomInModal) {
        setZoomInModal(0);
      }
      if (
        router.query.listOpen ||
        router.query.detailOpen ||
        router.query.zoomIn
      ) {
        // TODO: back twice needed???
        router.back();
      }
    };

    return clearFunc;
  }, []);

  // Reload page on orientation change event
  React.useEffect(() => {
    setTimeout(() => {
      // useWindowSize hook's default setting is mobile portrait, so set ori's initial value manually.
      if (ori === null) {
        setOri(isPortrait);
      } else if (ori !== isPortrait) {
        setOri(isPortrait);
        router.reload();
      }
    }, 0);
  }, [router, isPortrait]);

  // Auto-hide Header 3 seconds later.
  React.useEffect(() => {
    if (headerFlag) {
      if (headerTimer) clearTimeout(headerTimer);
      const newTimer = setTimeout(() => setHeaderFlag(false), 3000);
      setHeaderTimer(newTimer);
    }
  }, [headerFlag]);

  // Prefetching images for enhancement of speed.
  // React.useEffect(() => {
  //   if (withLayout) {
  //     const prevImg = new Image();
  //     const nextImg = new Image();
  //     // Artist's index starts from 1, javascript array index starts from 0.
  //     const prevIndex = index !== 1 ? index - 1 - 1 : null;
  //     const nextIndex = index !== NUM_ARTISTS ? index + 1 - 1 : null;
  //     if ((isMobile || isTablet) && isPortrait) {
  //       if (prevIndex && artists[prevIndex].portraitFileName) {
  //         prevImg.src = `${BUCKET_URL}/rendered/${artists[prevIndex].portraitFileName}`;
  //       }
  //       if (nextIndex && artists[nextIndex].portraitFileName) {
  //         nextImg.src = `${BUCKET_URL}/rendered/${artists[nextIndex].portraitFileName}`;
  //       }
  //     } else {
  //       if (prevIndex && artists[prevIndex].landscapeFileName) {
  //         prevImg.src = `${BUCKET_URL}/rendered/${artists[prevIndex].landscapeFileName}`;
  //       }
  //       if (nextIndex && artists[nextIndex].landscapeFileName) {
  //         nextImg.src = `${BUCKET_URL}/rendered/${artists[nextIndex].landscapeFileName}`;
  //       }
  //     }
  //   }
  // }, [withLayout, index, artists, isMobile, isTablet, isPortrait]);

  // Toggle Header on custom conditions.
  const toggleHeader = () => {
    if (!withLayout && !slideChangedFlag) setHeaderFlag(!headerFlag);
  };

  const handleModalOpen = () => {
    if (withLayout || isIOS) {
      setZoomInModal(artwork.id);
    } else {
      router.push(`?zoomIn=${artwork.id}`, undefined, {
        shallow: true,
      });
    }
  };

  return (
    <>
      <Head>
        <title>온라인 전시 - {artists[index - 1].artistName}</title>
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <Header fixed={false} visible={headerFlag} />
      <ZoomInModal
        modalOpen={zoomInModal}
        setModalOpen={setZoomInModal}
        artworks={artists[index - 1].artworks}
      />
      <Root>
        <>
          {withLayout && !firstModal && !lastModal && (
            <div ref={refBox} className="withLayoutBox" />
          )}
          <InvitedModal
            open={firstModal}
            setOpen={setFirstModal}
            artistName={invitedArtistName || ''}
          />
          <div className="sliderContainer" {...handleSwipe} {...handlePinch()}>
            <Slider
              ref={refSlider}
              dots={false}
              arrows={false}
              infinite={false}
              lazyLoad={withLayout ? undefined : 'progressive'}
              initialSlide={index - 1}
              focusOnSelect
              useCSS={!withLayout}
              swipe={!withLayout}
              touchMove={!firstDist}
              speed={180}
              waitForAnimate
              beforeChange={(_, afterSlide) => {
                if (afterSlide < NUM_ARTISTS) {
                  setLastModal(false);
                  artistHit(afterSlide + 1);
                  if (withLayout) {
                    sessionStorage.setItem('@artistId', `${afterSlide + 1}`);
                    setSlideChangedFlag(false);
                    setIndex(afterSlide + 1);
                  } else {
                    setTimeout(() => {
                      sessionStorage.setItem('@artistId', `${afterSlide + 1}`);
                      setSlideChangedFlag(false);
                      setIndex(afterSlide + 1);
                    }, 180);
                  }
                } else {
                  setLastModal(true);
                }
              }}
              onSwipe={() => setSlideChangedFlag(true)}
              onEdge={(swipeDirection) => {
                if (swipeDirection === 'left') router.push('/visitor');
              }}
              accessibility={!detailModalFlag && !zoomInModal}
            >
              {artists.map((artist) => {
                return (
                  <RenderedImage
                    key={artist.id}
                    artistData={artist}
                    onClick={() => toggleHeader()}
                  />
                );
              })}
              <div className="lastModal">
                <EdgeModal />
              </div>
            </Slider>
          </div>
          {withLayout ? (
            <>
              <ZoomInButton
                className="desktop"
                onClick={() => {
                  handleModalOpen();
                }}
              >
                <ZoomIn />
              </ZoomInButton>
              <MyDetailGroup />
            </>
          ) : (
            <>
              <CSSTransition
                in={headerFlag}
                timeout={300}
                // unmountOnExit
                classNames="header-toggle"
              >
                <ZoomInButton
                  className={headerFlag ? 'headerFlag mobile' : 'mobile'}
                  onClick={() => {
                    handleModalOpen();
                  }}
                >
                  <SvgIcon component={ZoomInShadow} viewBox="0 0 24 24" />
                </ZoomInButton>
              </CSSTransition>
              {/* <CSSTransition
                in={headerFlag}
                timeout={300}
                unmountOnExit
                classNames="header-toggle"
              >
                <ArrowButton
                  className="left"
                  onClick={() => {
                    // setIndex(index - 1);
                    // sessionStorage.setItem('@artistId', `${index - 1}`);
                    // setTimeout(() => router.reload(), 10);
                    refSlider.current?.slickPrev();
                  }}
                >
                  <SvgIcon component={LeftArrow} viewBox="0 0 24 24" />
                </ArrowButton>
              </CSSTransition> */}
              {/* <CSSTransition
                in={headerFlag}
                timeout={300}
                unmountOnExit
                classNames="header-toggle"
              >
                <ArrowButton
                  className="right"
                  onClick={() => {
                    // setIndex(index + 1);
                    // sessionStorage.setItem('@artistId', `${index + 1}`);
                    // setTimeout(() => router.reload(), 10);
                    refSlider.current?.slickNext();
                  }}
                >
                  <SvgIcon component={RightArrow} viewBox="0 0 24 24" />
                </ArrowButton>
              </CSSTransition> */}
            </>
          )}
          {!withLayout ? (
            <>
              <ManualModal />
              <MobileFooter
                artworkData={artwork}
                onClick={() => toggleHeader()}
              />
              <CSSTransition
                in={!isIOS ? Boolean(router.query.listOpen) : listModalFlag}
                timeout={100}
                unmountOnExit
                classNames="mobile-modal"
              >
                {(!isIOS ? Boolean(router.query.listOpen) : listModalFlag) ? (
                  <ArtistsModal artists={artists} />
                ) : (
                  <></>
                )}
              </CSSTransition>
              <CSSTransition
                in={!isIOS ? Boolean(router.query.detailOpen) : detailModalFlag}
                timeout={100}
                unmountOnExit
                classNames="mobile-modal"
              >
                {(
                  !isIOS ? Boolean(router.query.detailOpen) : detailModalFlag
                ) ? (
                  <MobileDetailModal artist={artists[index - 1]} />
                ) : (
                  <></>
                )}
              </CSSTransition>
            </>
          ) : (
            <>
              {detailModalFlag && <DesktopDetail artist={artists[index - 1]} />}
              <CSSTransition
                in={listModalFlag}
                timeout={300}
                unmountOnExit
                classNames="list-desktop"
              >
                {listModalFlag ? <DesktopList artists={artists} /> : <></>}
              </CSSTransition>
            </>
          )}
        </>
      </Root>
    </>
  );
};

export default ArtistPage;

export async function getStaticProps(): Promise<{
  props: {
    artists: Artist[];
  };
}> {
  try {
    const { artists } = await fetcher(`${API_URL}/artist`);

    return {
      props: {
        artists,
      },
    };
  } catch (err) {
    return {
      props: {
        artists: [],
      },
    };
  }
}
