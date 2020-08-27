import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import fetcher from '../../lib/fetcher';
import useMobileOrientation from '../../lib/hooks/useMobileOrientation';

import Header from '../../components/Header';

import { API_URL, BUCKET_URL } from '../../defines';

const MOBILE_BREAKPOINT = 500;

interface RootProps {
  ratio: number;
}

const Root = styled.div<RootProps>`
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  img.rendered {
    object-fit: cover;
    object-position: center bottom;
    width: 100%;
    height: 100%;

    @media screen and (max-width: ${MOBILE_BREAKPOINT}px) and (orientation: portrait) {
      object-fit: cover;
      object-position: center top;
    }

    @media screen and (max-width: ${MOBILE_BREAKPOINT}px) and (orientation: portrait) and (min-aspect-ratio: 2/3) {
      object-position: center ${(props) => (2 - props.ratio) * (50 / 3)}%;
    }
  }
`;

interface Props {
  artistData: Artist;
}

const ViewingRoomPage: React.FC<Props> = ({ artistData }) => {
  const [flag, setFlag] = React.useState<boolean>(true);
  const { ratio } = useMobileOrientation();
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <Header visible={flag} />
      <Root ratio={ratio}>
        {artistData.portraitFileName && artistData.landscapeFileName ? (
          <picture onClick={() => setFlag(!flag)} className="unselectable">
            <source
              media={`(max-width: ${MOBILE_BREAKPOINT}px) and (orientation: portrait)`}
              srcSet={`${BUCKET_URL}/rendered/${artistData.portraitFileName}`}
            />
            <img
              alt="artwork"
              src={`${BUCKET_URL}/rendered/${artistData.landscapeFileName}`}
              className="rendered"
            />
          </picture>
        ) : (
          <h3>NO DATA YET</h3>
        )}
      </Root>
    </>
  );
};

export async function getStaticPaths() {
  try {
    const { artists } = await fetcher(`${API_URL}/artist`);

    const paths = artists.map((artist: Artist) => ({
      params: {
        id: String(artist.id),
      },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (err) {
    return {
      paths: [],
      fallback: false,
    };
  }
}

export default ViewingRoomPage;

export async function getStaticProps({ params }: { params: { id: string } }) {
  try {
    const { artist } = await fetcher(`${API_URL}/artist/${params.id}`);

    return {
      props: {
        artistData: artist,
      },
    };
  } catch (err) {
    return {
      props: {
        artistData: {},
      },
    };
  }
}
