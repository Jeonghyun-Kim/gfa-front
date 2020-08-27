import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import Layout from '../components/Layout';

interface Props {}

const Root = styled.div``;

const AboutPage: React.FC<Props> = ({}) => {
  return (
    <Layout>
      <Head>
        <title>onDisplay - About</title>
      </Head>
      <Root>
        <></>
      </Root>
    </Layout>
  );
};

export default AboutPage;
