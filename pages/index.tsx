import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';

import Header from '../components/Header';
import Modal from '../components/Modal';

import { sendCounter } from '../lib/utils';

const Root = styled.div``;

interface Props {}
const HomePage: React.FC<Props> = ({}) => {
  const [flag, setFlag] = React.useState<boolean>(false);

  return (
    <>
      <Head>
        <title>onDisplay - 관악미술협회 15주년 기념전</title>
      </Head>
      <Header />
      <Root>
        <div>Home</div>
        <button onClick={() => setFlag(!flag)}>click me</button>
        <Modal visible={flag}>
          <div>hello World!</div>
          <button
            onClick={() => {
              setFlag(false);
              if (process.env.NODE_ENV === 'production') sendCounter();
            }}
          >
            OK
          </button>
        </Modal>
      </Root>
    </>
  );
};

export default HomePage;
