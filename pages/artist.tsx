import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styled from 'styled-components';
import Slider from 'react-slick';

import Header from '../components/Header';
import RenderedImage from '../components/RenderedImage';
import Loading from '../components/Loading';
import MobileFooter from '../components/MobileFooter';

import fetcher from '../lib/fetcher';
import useMobileOrientation from '../lib/hooks/useWindowSize';

import { API_URL, BUCKET_URL, NUM_ARTISTS } from '../defines';

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
    position: absolute;
  }

  .slick-slide {
    div {
      height: 100%;
    }
  }

  h2 {
    position: absolute;
    top: 50px;
    left: 50px;
    z-index: 100;
  }
`;

interface Props {
  artists: Artist[];
}
const ArtistPage: React.FC<Props> = ({ artists }) => {
  const router = useRouter();
  const [headerFlag, setHeaderFlag] = React.useState<boolean>(true);
  const [timer, setTimer] = React.useState<NodeJS.Timeout | null>(null);
  const [slideChangedFlag, setSlideChangedFlag] = React.useState<boolean>(
    false,
  );
  const { index, setIndex, refSlider } = React.useContext(IndexContext);
  const { isMobile, isTablet, isPortrait } = useMobileOrientation();
  const [ori, setOri] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    refSlider.current?.slickGoTo(index - 1);
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      if (ori === null) {
        setOri(isPortrait);
      } else if (ori !== isPortrait) {
        setOri(isPortrait);
        router.reload();
      }
    }, 0);
  }, [router, isPortrait]);

  React.useEffect(() => {
    if (headerFlag) {
      if (timer) clearTimeout(timer);
      setTimer(setTimeout(() => setHeaderFlag(false), 3000));
    }
  }, [headerFlag]);

  React.useEffect(() => {
    const prevImg = new Image();
    const nextImg = new Image();
    const prevIndex = index !== 1 ? index - 1 - 1 : null;
    const nextIndex = index !== NUM_ARTISTS ? index + 1 - 1 : null;
    if ((isMobile || isTablet) && isPortrait) {
      if (prevIndex && artists[prevIndex].portraitFileName) {
        prevImg.src = `${BUCKET_URL}/rendered/${artists[prevIndex].portraitFileName}`;
      }
      if (nextIndex && artists[nextIndex].portraitFileName) {
        nextImg.src = `${BUCKET_URL}/rendered/${artists[nextIndex].portraitFileName}`;
      }
    } else {
      if (prevIndex && artists[prevIndex].landscapeFileName) {
        prevImg.src = `${BUCKET_URL}/rendered/${artists[prevIndex].landscapeFileName}`;
      }
      if (nextIndex && artists[nextIndex].landscapeFileName) {
        nextImg.src = `${BUCKET_URL}/rendered/${artists[nextIndex].landscapeFileName}`;
      }
    }
  }, [index, artists, isMobile, isTablet, isPortrait]);

  const toggleHeader = () => {
    if ((isMobile || (isTablet && isPortrait)) && !slideChangedFlag)
      setHeaderFlag(!headerFlag);
  };

  return (
    <>
      <Head>
        <title>onDisplay - 전시장</title>
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
      <Header visible={headerFlag} />
      <Root>
        {index ? (
          <>
            <Slider
              ref={(slider) => {
                refSlider.current = slider;
              }}
              dots={false}
              arrows={false}
              infinite={false}
              lazyLoad="ondemand"
              initialSlide={index - 1}
              focusOnSelect
              useCSS={isMobile || (isTablet && isPortrait)}
              swipe={isMobile || (isTablet && isPortrait)}
              beforeChange={(_, newIndex) => {
                setTimeout(() => {
                  sessionStorage.setItem('@artistId', `${newIndex + 1}`);
                  setSlideChangedFlag(false);
                  setIndex(newIndex + 1);
                }, 500);
              }}
              onSwipe={() => setSlideChangedFlag(true)}
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
            <MobileFooter
              artworkData={artworks.find(
                (artwork: ArtworkJson) => artwork.artistId === index,
              )}
              visible={isMobile || (isTablet && isPortrait)}
              onClick={() => toggleHeader()}
            />
          </>
        ) : (
          <Loading />
        )}
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
