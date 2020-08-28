import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Slider from 'react-slick';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

// import Header from '../components/Header';
import RenderedImage from '../components/RenderedImage';

import fetcher from '../lib/fetcher';
import useMobileOrientation from '../lib/hooks/useMobileOrientation';

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

  /* button {
    position: absolute;
    top: 20px;
    z-index: 999;

    &.left {
      left: 20px;
    }

    &.right {
      right: 20px;
    }
  }

  .index {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 999;
  } */
`;

interface Props {
  artists: Artist[];
}
const ArtistPage: React.FC<Props> = ({ artists }) => {
  // const [headerFlag, setHeaderFlag] = React.useState<boolean>(true);
  const { index, setIndex, refSlider } = React.useContext(IndexContext);
  const { isMobile, isPortrait } = useMobileOrientation();

  React.useEffect(() => {
    refSlider.current?.slickGoTo(index - 1);
  }, []);

  React.useEffect(() => {
    const prevImg = new Image();
    const nextImg = new Image();
    if (isMobile && isPortrait) {
      prevImg.src = `${BUCKET_URL}/rendered/${
        artists[index - 1 >= 0 ? index - 1 : 0].portraitFileName
      }`;
      nextImg.src = `${BUCKET_URL}/rendered/${
        artists[index + 1 < NUM_ARTISTS ? index + 1 : NUM_ARTISTS - 1]
          .portraitFileName
      }`;
    } else {
      prevImg.src = `${BUCKET_URL}/rendered/${
        artists[index - 1 >= 0 ? index - 1 : 0].landscapeFileName
      }`;
      nextImg.src = `${BUCKET_URL}/rendered/${
        artists[index + 1 < NUM_ARTISTS ? index + 1 : NUM_ARTISTS - 1]
          .landscapeFileName
      }`;
    }
  }, [index]);

  // const handleLeft = () => {
  //   if (index > 1) {
  //     setIndex(index - 1);
  //     refSlider.current?.slickPrev();
  //     sessionStorage.setItem('@artistId', `${index - 1}`);
  //   }
  // };

  // const handleRight = () => {
  //   if (index < NUM_ARTISTS) {
  //     setIndex(index + 1);
  //     refSlider.current?.slickNext();
  //     sessionStorage.setItem('@artistId', `${index + 1}`);
  //   }
  // };

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
      {/* <Header visible={headerFlag} /> */}
      <Root>
        {/* <>
          <button className="left" type="button" onClick={() => handleLeft()}>
            left
          </button>
          <button className="right" type="button" onClick={() => handleRight()}>
            right
          </button>
        </>
        <h3 className="index">{index}</h3> */}
        {index && index > 0 && (
          <Slider
            ref={(slider) => (refSlider.current = slider)}
            dots={false}
            arrows={false}
            infinite={false}
            lazyLoad="ondemand"
            focusOnSelect={false}
            useCSS={isMobile}
            // initialSlide={index - 1}
            swipe={isMobile}
            beforeChange={(_, newIndex) => {
              sessionStorage.setItem('@artistId', `${newIndex + 1}`);
              setIndex(newIndex + 1);
            }}
          >
            {artists.map((artist) => {
              if (artist.portraitFileName)
                return <RenderedImage key={artist.id} artistData={artist} />;
              return <h3 key={artist.id}>NO DATA YET</h3>;
            })}
          </Slider>
        )}
        {/* {index && artists[index].portraitFileName ? (
          <RenderedImage
            artistData={artists[index]}
            onClick={() => setHeaderFlag(!headerFlag)}
          />
        ) : (
          <h3>Loading...</h3>
        )} */}
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
