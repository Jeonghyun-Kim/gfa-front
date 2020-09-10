import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import useSWR from 'swr';
import Countup from 'react-countup';

import Loading from '../components/Loading';
import Header from '../components/Header';
import VisitorForm from '../components/Visitor/VisitorForm';
import Footer from '../components/Footer';
// import VisitorSignPad from '../components/Visitor/VisitorSignPad';

import { API_URL } from '../defines';

import IndexContext from '../IndexContext';

interface RootProps {
  up: boolean;
}
const Root = styled.div<RootProps>`
  position: relative;
  width: 100%;
  /* height: 100%; */
  height: ${(props) => (props.up ? `calc(100% - ${60}px)` : 'auto')};
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${(props) => (props.up ? '60px' : '0px')};

  .thankMessage {
    margin-top: 20px;
    margin-bottom: 0;
    font-size: 1.25rem;
    font-weight: 500;
  }
  .requestMessage {
    font-size: 1rem;
    font-weight: normal;
    color: #707070;
    text-align: center;
    margin-bottom: 20px;
  }
  .helpText {
    margin-top: 10px;
    font-size: 0.9rem;
    font-weight: normal;
  }
  .counterText {
    font-size: 0.9rem;
    font-weight: normal;
    .counter {
      margin: 0 5px;
      font-size: 1.1rem;
      font-weight: normal;
    }
  }
  .spacer {
    height: 300px;
  }
  .mobileAbout {
    margin-top: 50px;
    background-color: #dbdbdb;
    padding: 50px 15px 20px 15px;
    .subTitle {
      font-size: 1.2rem;
      font-weight: 500;
    }
    .instruction {
      margin: 50px 0 50px 0;
      font-size: 1rem;
      font-weight: normal;
      line-height: 1.8rem;
    }
    .infoBlock {
      p {
        margin: 5px 0;
      }
    }
  }

  &.withLayout {
    position: initial;
    padding: 50px 0;
    overflow-y: auto;
    .grow {
      flex-grow: 1;
    }
    .touchableBackground {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }
    .thankMessage {
      margin-top: 30px;
      margin-bottom: 0;
      font-size: 1.5rem;
      font-weight: 500;
    }
    .requestMessage {
      font-size: 1.2rem;
      font-weight: normal;
      color: #707070;
      text-align: center;
      margin-bottom: 30px;
    }
    .helpText {
      margin-top: 10px;
      font-size: 1.1rem;
      font-weight: normal;
    }
    .counterText {
      font-size: 1.1rem;
      font-weight: normal;
      .counter {
        margin: 0 5px;
        font-size: 1.3rem;
        font-weight: normal;
      }
    }
  }

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
  const refName = React.useRef<HTMLInputElement>(null);

  const [inputFocuses, setInputFocuses] = React.useState<MyInputProps>({
    name: false,
    content: false,
  });

  const handleClose = () => {
    setOpen(false);
    // setInputFocuses({ name: false, content: false });
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
      <Root
        className={`${withLayout && 'withLayout'}`}
        up={!withLayout && open}
      >
        {withLayout && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <div
            className="touchableBackground"
            onClick={() => {
              setOpen(false);
            }}
            role="button"
            tabIndex={-1}
            onKeyDown={() => {}}
          />
        )}
        {(withLayout || !open) && (
          <>
            <h2 className="thankMessage">끝까지 감상해주셔서 감사합니다.</h2>
            <p className="requestMessage">
              고생하신 작가님들을 위해
              <br />
              방명록을 남겨주세요.
            </p>
          </>
        )}
        {withLayout && <div className="grow" />}
        <VisitorForm
          mutateData={mutate}
          refName={refName}
          open={open}
          setOpen={setOpen}
          inputFocuses={inputFocuses}
          setInputFocuses={setInputFocuses}
          handleClose={handleClose}
        />
        {withLayout && <div className="grow" />}
        <p className="helpText">보내주신 방명록은 작가님들께 전달됩니다.</p>
        {!withLayout && open && <div className="spacer" />}
        {(withLayout || !open) && counts && (
          <p className="counterText">
            지금까지{' '}
            <Countup
              className="counter"
              start={counter}
              end={counts}
              duration={3}
              delay={0.2}
              separator=","
              // onStart={() => {}}
              onEnd={() => {
                setCounter(counts);
              }}
            />
            명 참여
          </p>
        )}
        {!withLayout && (
          <section className="mobileAbout">
            <h2 className="subTitle">
              온디스플레이는 코로나의 영향으로 침체된 미술계, 작가, 관객,
              미술관, 갤러리 모두를 응원합니다.
            </h2>
            <p className="instruction">
              - 9월 25일에 예정된 다음 전시를 받아보시려면 인스타그램 채널을
              팔로우해주세요. <br />- 작품 구매, 작가 연락처, 전시 기획 문의는
              대표전화 또는 이메일로 문의해주세요.
            </p>
            <Footer />
          </section>
        )}
        {/* {!withLayout && open && <VisitorSignPad refName={refName} />} */}
      </Root>
    </>
  );
};

export default VisitorPage;
