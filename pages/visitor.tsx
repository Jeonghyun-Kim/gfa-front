import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import Layout from '../components/Layout';

interface Props {}

const Root = styled.div``;

const VisitorPage: React.FC<Props> = ({}) => {
  return (
    <Layout>
      <Head>
        <title>onDisplay - 방명록</title>
      </Head>
      <Root>
        <></>
      </Root>
    </Layout>
  );
};

export default VisitorPage;
