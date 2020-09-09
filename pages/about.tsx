import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import Header from '../components/Header';
import Logo from '../components/Logo/OneLineLogo';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  height: 100%;

  .grow {
    flex-grow: 1;
  }
`;

const AboutPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>onDisplay - About</title>
      </Head>
      <Header />
      <Root>
        <h1 className="title">CONTACT US</h1>
        <div className="instruction">
          <p>
            온라인 전시 기획 온디스플레이의 전시는 계속됩니다.
            <br />
            9월 25일 예정된 다음 전시를 받아보시려면 하단의 ...
          </p>
          <p>
            소식 받아보기, 작가 컨택하기, 전시 기획 문의는 연락 부탁드립니다.
          </p>
          <div className="grow" />
          <div className="logoBox">
            <Logo />
            <span>
              온라인 전시 기획 <b>온디스플레이</b>
            </span>
          </div>
          <dl className="contact">
            <dt>
              <span className="division">Email</span>
              <span className="content">ondisplay.art@gmail.com</span>
            </dt>
            <dt>
              <span className="division">Instagram</span>
              <span className="content">@ondisplay.art</span>
            </dt>
            <dt>
              <span className="division">Tel</span>
              <span className="content">010-6317-1498</span>
            </dt>
          </dl>
        </div>
      </Root>
    </>
  );
};

export default AboutPage;
