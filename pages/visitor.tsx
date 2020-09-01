import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import useSWR from 'swr';
import Countup from 'react-countup';
import { CSSTransition } from 'react-transition-group';

import Loading from '../components/Loading';
import Header from '../components/Header';
import VisitorForm from '../components/Visitor/VisitorForm';
import VisitorSignPad from '../components/Visitor/VisitorSignPad';

import { API_URL } from '../defines';

import IndexContext from '../IndexContext';

interface RootProps {
  up: boolean;
}
const Root = styled.div<RootProps>`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${(props) => (props.up ? '60px' : '0px')};

  .signPad-enter {
    bottom: -300px;
  }
  .signPad-enter-active {
    bottom: 0;
    transition: 300ms;
  }
  .signPad-exit {
    bottom: 0;
  }
  .signPad-exit-active {
    bottom: -300px;
    transition: 300ms;
  }

  .exitHeader-enter {
    top: -40px;
  }
  .exitHeader-enter-active {
    top: 0;
    transition: 300ms;
  }
  .exitHeader-exit {
    top: 0;
  }
  .exitHeader-exit-active {
    top: -40px;
    transition: 300ms;
  }
`;

interface MyInputProps {
  name: boolean;
  content: boolean;
}

const VisitorPage: React.FC = () => {
  const { withLayout } = React.useContext(IndexContext);
  const { data, mutate, error } = useSWR(`${API_URL}/signature/count`);
  const [counter, setCounter] = React.useState<number>(0);
  const [open, setOpen] = React.useState<boolean>(false);

  const [inputFocuses, setInputFocuses] = React.useState<MyInputProps>({
    name: false,
    content: false,
  });

  const handleClose = () => {
    setOpen(false);
    setInputFocuses({ name: false, content: false });
  };

  // React.useLayoutEffect(() => {
  //   if (withLayout && !inputFocuses.name && !inputFocuses.content && open)
  //     setTimeout(() => {
  //       handleClose();
  //     }, 100);
  // }, [withLayout, inputFocuses]);

  if (!data && !error) return <Loading />;
  if (error)
    return (
      <h3>
        에러가 발생하였습니다. <br />
        잠시후에 다시 시도해주세요.
      </h3>
    );

  const { counts } = data;

  return (
    <>
      <Head>
        <title>onDisplay - 방명록</title>
      </Head>
      {!withLayout && !open && <Header />}
      <Root up={!withLayout && open}>
        {(withLayout || !open) && (
          <>
            <p>이번 전시 어떠셨나요?</p>
            <p>
              지금까지{' '}
              <Countup
                className="counter"
                start={counter}
                end={counts + 50253}
                duration={3}
                delay={0.2}
                separator=","
                // onStart={() => {}}
                onEnd={() => {
                  setCounter(counts + 50253);
                }}
              />
              명이 방명록을 남겨주셨어요!
            </p>
          </>
        )}
        <VisitorForm
          mutateData={mutate}
          open={open}
          setOpen={setOpen}
          inputFocuses={inputFocuses}
          setInputFocuses={setInputFocuses}
          handleClose={handleClose}
        />
        {!withLayout && (
          <CSSTransition
            in={open}
            timeout={300}
            unmountOnExit
            classNames="signPad"
          >
            <VisitorSignPad />
          </CSSTransition>
        )}
      </Root>
    </>
  );
};

export default VisitorPage;
