import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import Header from '../components/Header';

const Root = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;

  .dateBlock {
    text-align: center;
  }
`;

const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>onDisplay - 관악미술협회 15주년 기념전</title>
      </Head>
      <Header />
      <Root>
        <h1>관악미술협회 15주년 기념전</h1>
        <h2>전시회 준비중입니다.</h2>
        <div className="dateBlock">
          <h3>2020년 09월 11일 (금)</h3>
          <h3>~</h3>
          <h3>2020년 09월 24일 (금)</h3>
        </div>
      </Root>
    </>
  );
};

export default HomePage;
