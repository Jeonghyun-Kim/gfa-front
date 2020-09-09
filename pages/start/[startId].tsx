import React from 'react';
import { useRouter } from 'next/router';

import Loading from '../../components/Loading';

import IndexContext from '../../IndexContext';

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
  paths: { params: { startId: string } }[];
  fallback: boolean;
}> {
  return {
    paths: Array.from(new Array(64), (_, idx) => ({
      params: {
        startId: `${idx + 1}`,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { startId: string };
}): Promise<{
  props: {
    startId: string | null;
  };
}> {
  try {
    return {
      props: {
        startId: params.startId,
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
