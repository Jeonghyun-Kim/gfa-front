import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import Header from '../components/Header';

const Root = styled.div``;

interface Props {}
const VideoPage: React.FC<Props> = ({}) => {
  return (
    <>
      <Head>
        <title>onDisplay - 관악미술협회 이야기</title>
      </Head>
      <Header />
      <Root>
        <></>
      </Root>
    </>
  );
};

export default VideoPage;
