import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styled from 'styled-components';
import Slider from 'react-slick';
import { CSSTransition } from 'react-transition-group';

import Header from '../components/Header';
import RenderedImage from '../components/RenderedImage';
import MobileFooter from '../components/MobileFooter';
import ArtistsModal from '../components/ArtistList/ArtistsModal';
import DesktopList from '../components/ArtistList/DesktopList';

import fetcher from '../lib/fetcher';
import useMobileOrientation from '../lib/hooks/useWindowSize';

// import { API_URL, BUCKET_URL, NUM_ARTISTS } from '../defines';
import { API_URL } from '../defines';

import IndexContext from '../IndexContext';

import artworks from '../artworks.json';

const Root = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;

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

  .slick-slide {
    div {
      height: 100%;
    }
  }

  .list-modal-enter {
    top: 100%;
    .modalHeader {
      /* top: 100%; */
      opacity: 0;
    }
  }
  .list-modal-enter-active {
    top: 0;
    transition: 300ms;
    .modalHeader {
      /* top: 0; */
      opacity: 1;
      transition: 300ms;
    }
  }

  .list-desktop-enter {
    opacity: 0;
  }

  .list-desktop-enter-active {
    opacity: 1;
    transition: 300ms;
  }
`;

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
  } = React.useContext(IndexContext);
  // Use screen size and orientation (hooks)
  const { isPortrait } = useMobileOrientation();
  // For detecting orientation change
  const [ori, setOri] = React.useState<boolean | null>(null);

  // React.useEffect(() => {
  //   // Set initial slide (react-slick's initialSlide property is now working properly.)
  //   if (refSlider.current) {
  //     if (router.query.id)
  //       refSlider.current.slickGoTo(Number(router.query.id) - 1);
  //     else refSlider.current.slickGoTo(index - 1);
  //   }
  // }, [index, router.query]);

  // Same as componentDidMount()
  React.useEffect(() => {
    if (refSlider.current) refSlider.current.slickGoTo(index - 1);
    // Clear all setTimeout() function, excecuting on page unmount event.
    const clearFunc = () => {
      let timeoutId = (setTimeout(() => {}, 0) as unknown) as number;
      while (timeoutId) {
        timeoutId -= 1;
        clearTimeout(timeoutId);
      }
      if (withLayout) {
        setListModalFlag(false);
      } else if (router.query.listOpen) {
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
      <Root>
        <>
          <Slider
            ref={(slider) => {
              refSlider.current = slider;
            }}
            dots={false}
            arrows={false}
            infinite={false}
            // lazyLoad={withLayout ? 'ondemand' : undefined}
            initialSlide={index - 1}
            focusOnSelect
            useCSS={!withLayout}
            swipe={!withLayout}
            beforeChange={(_, currentSlide) => {
              if (withLayout) {
                sessionStorage.setItem('@artistId', `${currentSlide + 1}`);
                setSlideChangedFlag(false);
                setIndex(currentSlide + 1);
              } else {
                setTimeout(() => {
                  sessionStorage.setItem('@artistId', `${currentSlide + 1}`);
                  setSlideChangedFlag(false);
                  setIndex(currentSlide + 1);
                  // if (router.query.id) {
                  //   router.push(`/artist?id=${currentSlide + 1}`);
                  // } else {
                  //   router.replace(`/artist?id=${currentSlide + 1}`);
                  // }
                }, 300);
              }
            }}
            onSwipe={() => setSlideChangedFlag(true)}
            onEdge={(swipeDirection) => {
              if (swipeDirection === 'left') router.push('/video');
              else router.push('/');
            }}
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
          </Slider>
          {!withLayout ? (
            <>
              <MobileFooter
                artworkData={artworks.find(
                  (artwork: ArtworkJson) => artwork.artistId === index,
                )}
                onClick={() => toggleHeader()}
              />
              <CSSTransition
                in={Boolean(router.query.listOpen)}
                timeout={300}
                unmountOnExit
                classNames="list-modal"
              >
                {router.query.listOpen ? (
                  <ArtistsModal artists={artists} />
                ) : (
                  <></>
                )}
              </CSSTransition>
            </>
          ) : (
            <CSSTransition
              in={listModalFlag}
              timeout={300}
              unmountOnExit
              classNames="list-desktop"
            >
              {listModalFlag ? <DesktopList artists={artists} /> : <></>}
            </CSSTransition>
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
