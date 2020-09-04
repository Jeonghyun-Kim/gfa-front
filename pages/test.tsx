import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import DesktopDetail from '../components/DesktopDetail';
import MobileDetailModal from '../components/Modal/MobileDetailModal';

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
  const id = 2;

  return (
    <>
      <Head>
        <title>title</title>
      </Head>
      <Root>
        {withLayout ? (
          <DesktopDetail artist={artists[id - 1]} />
        ) : (
          <MobileDetailModal artist={artists[id - 1]} />
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
