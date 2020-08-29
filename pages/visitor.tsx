import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import Header from '../components/Header';

const Root = styled.div``;

const VisitorPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>onDisplay - 방명록</title>
      </Head>
      <Header />
      <Root>
        <></>
      </Root>
    </>
  );
};

export default VisitorPage;
