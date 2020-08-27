import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

const Root = styled.div``;

interface Props {}
const VisitorPage: React.FC<Props> = ({}) => {
  return (
    <>
      <Head>
        <title>onDisplay - 방명록</title>
      </Head>
      <Root>
        <></>
      </Root>
    </>
  );
};

export default VisitorPage;
