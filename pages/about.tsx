import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import Header from '../components/Header';

const Root = styled.div``;

interface Props {}
const AboutPage: React.FC<Props> = ({}) => {
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
