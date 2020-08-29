import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

import Header from '../components/Header';
import Modal from '../components/Modal';

import { sendCounter } from '../lib/utils';

const Root = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
`;

const HomePage: React.FC = () => {
  const [flag, setFlag] = React.useState<boolean>(false);

  return (
    <>
      <Head>
        <title>onDisplay - 관악미술협회 15주년 기념전</title>
      </Head>
      <Header />
      <Root>
        <div>
          <div>Home</div>
          <Link href="/artist">
            <a>artist</a>
          </Link>
          <button type="button" onClick={() => setFlag(!flag)}>
            click me
          </button>
          <Modal visible={flag}>
            <div>hello World!</div>
            <button
              type="button"
              onClick={() => {
                setFlag(false);
                if (process.env.NODE_ENV === 'production') sendCounter();
              }}
            >
              OK
            </button>
          </Modal>
        </div>
      </Root>
    </>
  );
};

export default HomePage;
