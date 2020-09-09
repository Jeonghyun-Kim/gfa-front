import React from 'react';
import { useRouter } from 'next/router';

import Loading from '../../components/Loading';

import { API_URL } from '../../defines';

import IndexContext from '../../IndexContext';
import fetcher from '../../lib/fetcher';

interface Props {
  startId: string;
}
const StartRouter: React.FC<Props> = ({ startId }) => {
  const router = useRouter();
  const { setIndex } = React.useContext(IndexContext);

  React.useEffect(() => {
    sessionStorage.setItem('@artistId', startId);
    setIndex(Number(startId));
    setTimeout(() => router.push('/'), 1000);
  }, [router, setIndex, startId]);

  return <Loading />;
};

export default StartRouter;

export async function getStaticPaths(): Promise<{
  paths: { params: { artistName: string } }[];
  fallback: boolean;
}> {
  try {
    const { artists } = await fetcher(`${API_URL}/artist`);
    return {
      paths: artists.map((artist: Artist) => ({
        params: {
          artistName: encodeURIComponent(artist.artistName),
        },
      })),
      fallback: false,
    };
  } catch (err) {
    return {
      paths: [],
      fallback: true,
    };
  }
}

export async function getStaticProps({
  params,
}: {
  params: { artistName: string };
}): Promise<{
  props: {
    startId: string | null;
  };
}> {
  try {
    const { artists } = await fetcher(`${API_URL}/artist`);
    return {
      props: {
        startId: artists.find((artist: Artist) => {
          return artist.artistName === params.artistName;
        }).id,
      },
    };
  } catch (err) {
    return {
      props: {
        startId: null,
      },
    };
  }
}
