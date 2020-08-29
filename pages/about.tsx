import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import Header from '../components/Header';

const Root = styled.div``;

const AboutPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>onDisplay - About</title>
      </Head>
      <Header />
      <Root>
        <></>
      </Root>
    </>
  );
};

export default AboutPage;
