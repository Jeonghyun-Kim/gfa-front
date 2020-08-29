import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Slider from 'react-slick';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Header from '../components/Header';
import RenderedImage from '../components/RenderedImage';

import fetcher from '../lib/fetcher';
import useMobileOrientation from '../lib/hooks/useWindowSize';

import { API_URL, BUCKET_URL, NUM_ARTISTS } from '../defines';

import IndexContext from '../IndexContext';

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

  .slick-slide {
    div {
      height: 100%;
    }
  }
`;

interface Props {
  artists: Artist[];
}
const ArtistPage: React.FC<Props> = ({ artists }) => {
  const [headerFlag, setHeaderFlag] = React.useState<boolean>(true);
  const [slideChangedFlag, setSlideChangedFlag] = React.useState<boolean>(
    false,
  );
  const { index, setIndex, refSlider } = React.useContext(IndexContext);
  const { isMobile, isTablet, isPortrait } = useMobileOrientation();

  React.useEffect(() => {
    refSlider.current?.slickGoTo(index - 1);
  }, []);

  React.useEffect(() => {
    const prevImg = new Image();
    const nextImg = new Image();
    const prevIndex = index !== 1 ? index - 1 - 1 : null;
    const nextIndex = index !== NUM_ARTISTS ? index + 1 - 1 : null;
    if ((isMobile || isTablet) && isPortrait) {
      if (prevIndex && artists[prevIndex].portraitFileName)
        prevImg.src = `${BUCKET_URL}/rendered/${artists[prevIndex].portraitFileName}`;
      if (nextIndex && artists[nextIndex].portraitFileName)
        nextImg.src = `${BUCKET_URL}/rendered/${artists[nextIndex].portraitFileName}`;
    } else {
      if (prevIndex && artists[prevIndex].landscapeFileName)
        prevImg.src = `${BUCKET_URL}/rendered/${artists[prevIndex].landscapeFileName}`;
      if (nextIndex && artists[nextIndex].landscapeFileName)
        nextImg.src = `${BUCKET_URL}/rendered/${artists[nextIndex].landscapeFileName}`;
    }
  }, [index]);

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
        {index && index > 0 && (
          <Slider
            ref={(slider) => (refSlider.current = slider)}
            dots={false}
            arrows={false}
            infinite={false}
            lazyLoad="ondemand"
            focusOnSelect
            useCSS={isMobile || (isTablet && isPortrait)}
            swipe={isMobile || (isTablet && isPortrait)}
            beforeChange={(_, newIndex) => {
              sessionStorage.setItem('@artistId', `${newIndex + 1}`);
              setIndex(newIndex + 1);
              setSlideChangedFlag(false);
            }}
            onSwipe={() => setSlideChangedFlag(true)}
          >
            {artists.map((artist) => {
              return (
                <RenderedImage
                  key={artist.id}
                  artistData={artist}
                  onClick={() => {
                    if (
                      (isMobile || (isTablet && isPortrait)) &&
                      !slideChangedFlag
                    )
                      setHeaderFlag(!headerFlag);
                  }}
                />
              );
            })}
          </Slider>
        )}
      </Root>
    </>
  );
};

export default ArtistPage;

export async function getStaticProps() {
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
