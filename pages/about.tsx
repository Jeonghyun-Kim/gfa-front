import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import Header from '../components/Header';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 600px;
  overflow: auto;
  max-width: 840px;
  margin: 0 auto;
  padding: 40px 20px;
  .grow {
    flex-grow: 1;
    max-height: 100px;
  }
  .titleBox {
    .title {
      font-size: 1rem;
      font-weight: normal;
    }
    .subTitle {
      font-size: 2rem;
      font-weight: 500;
      word-break: keep-all;
    }
  }
  .contactBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    img#insta-logo {
      width: 80px;
      height: 80px;
    }
    a {
      font-size: 1.5rem;
      color: #1e1e1e;
      &:hover {
        opacity: 0.7;
      }
    }
    .contactInfo {
      margin-top: 30px;
      dt {
        display: inline;
        font-size: 1.1rem;
        font-weight: 500;
      }
      dd {
        display: inline;
        font-size: 1.1rem;
        font-weight: normal;
      }
    }
  }
  .instruction {
    width: 100%;
    font-size: 1.2rem;
    font-weight: normal;
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
        <div className="titleBox">
          <h1 className="title">CONTACT US</h1>
          <h2 className="subTitle">
            온디스플레이는 코로나의 영향으로 침체된 미술계, 작가, 관객, 미술관,
            갤러리 모두를 응원합니다.
          </h2>
        </div>
        <div className="grow" />
        <div className="contactBox">
          <a
            href="https://www.instagram.com/ondisplay.art/"
            target="_blank"
            rel="noreferrer"
          >
            <img id="insta-logo" alt="instagram" src="/icons/instagram.png" />
          </a>
          <a
            href="https://www.instagram.com/ondisplay.art/"
            target="_blank"
            rel="noreferrer"
          >
            @ondisplay.art
          </a>
          <dl className="contactInfo">
            <dt>Phone</dt>
            <dd>010-6317-1498</dd>
            <br />
            <dt>E-mail</dt>
            <a href="mailto:ondisplay.art@gmail.com">
              <dd>ondisplay.art@gmail.com</dd>
            </a>
          </dl>
        </div>
        <div className="grow" />
        <p className="instruction">
          - 9월 25일에 예정된 다음 전시를 받아보시려면 인스타그램 채널을
          팔로우해주세요. <br />- 작품 구매, 작가 연락처, 전시 기획 문의는
          대표전화 또는 이메일로 문의해주세요.
        </p>
      </Root>
    </>
  );
};

export default AboutPage;
