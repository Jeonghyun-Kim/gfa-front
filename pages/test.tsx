import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import DesktopDetailModal from '../components/DesktopDetailModal';
import MobileDetailmodal from '../components/MobileDetailModal';

import fetcher from '../lib/fetcher';

import { API_URL } from '../defines';

import IndexContext from '../IndexContext';

const Root = styled.div`
  width: 100%;
`;

interface Props {
  artists: Artist[];
}
const TemplatePage: React.FC<Props> = ({ artists }) => {
  const { withLayout } = React.useContext(IndexContext);
  const id = 49;

  return (
    <>
      <Head>
        <title>title</title>
      </Head>
      <Root>
        {withLayout ? (
          <DesktopDetailModal artist={artists[id - 1]} />
        ) : (
          <MobileDetailmodal artist={artists[id - 1]} />
        )}
      </Root>
    </>
  );
};

export default TemplatePage;

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
