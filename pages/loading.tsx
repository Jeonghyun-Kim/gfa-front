import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import Loading from '../components/Loading';

const Root = styled.div`
  height: 100%;
`;

const TemplatePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>onDisplay - Loading...</title>
      </Head>
      <Root>
        <Loading />
      </Root>
    </>
  );
};

export default TemplatePage;
