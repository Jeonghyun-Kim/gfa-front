import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import useSWR from 'swr';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { isIOS } from 'react-device-detect';
import Countup from 'react-countup';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Visibility from '@material-ui/icons/Visibility';
import Create from '@material-ui/icons/Create';
import GoDown from '../public/icons/mobile_go_down.svg';
import GoDownDesktop from '../public/icons/go_down.svg';

import Header from '../components/Header';
import Footer from '../components/Footer';

import fetcher from '../lib/fetcher';
import useWindowSize from '../lib/hooks/useWindowSize';
import useWindowScroll from '../lib/hooks/useWindowScroll';

import {
  API_URL,
  HEADER_HEIGHT,
  COLORS,
  ISTEST,
  PLAYBAR_HEIGHT,
} from '../defines';

import IndexContext from '../IndexContext';

const TestRoot = styled.div`
  display: grid;
  width: 100%;
  height: calc(100vh - ${HEADER_HEIGHT}px);
  place-items: center;
  text-align: center;
`;

interface RootProps {
  videoWidth: number;
}
const Root = styled.div<RootProps>`
  .desktopPoster {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url('/images/poster_bg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    z-index: 1;

    .bannerBox {
      position: absolute;
      top: 50%;
      right: calc(50% - 668px);
      transform: translate(0, -50%);
      width: calc(45vw);
      height: calc(30vw);
      max-width: 600px;
      max-height: 400px;
      display: flex;
      flex-direction: column;
      z-index: 3;

      img.bannerText {
        width: 100%;
        object-fit: contain;
      }
      .grow {
        flex-grow: 1;
      }
      .counterBox {
        width: 100%;
        display: flex;
        justify-content: center;
        p {
          margin: 10px 0;
          color: white;
          font-size: 1.5rem;
          svg.icons {
            font-size: 1.8rem;
            width: 1.8rem;
            height: 1.8rem;
            transform: translateY(5px);
            margin-right: 10px;
          }
          span {
            margin: 0 10px;
            color: white;
            font-size: 2rem;
            font-weight: bolder;
          }
          span.space {
            margin: 0 20px;
          }
        }
      }
      button {
        background-color: white !important;
        border-radius: 10px !important;
        width: 100%;
        height: 60px;
        span.MuiButton-label {
          color: ${COLORS.primary};
          font-size: 1.5rem;
          font-weight: bolder;
        }
      }
    }
    .goDownButton {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translate(-50%, 0);
      transition: 500ms ease;
      background: none !important;
      svg {
        color: white;
        font-size: 3rem;
      }
      &:hover {
        bottom: 40px;
      }
    }

    @media screen and (max-width: 1720px) {
      background-position: calc(50% + 50vw - 860px) 50%;
      .bannerBox {
        right: 80px;
      }
    }

    @media screen and (max-width: 1200px) {
      background-position: calc(50% + 50vw - 660px) 50%;
      .bannerBox {
        width: 400px;
        height: ${800 / 3}px;
        .counterBox {
          width: 100%;
          display: flex;
          justify-content: center;
          p {
            margin: 10px 0;
            color: white;
            font-size: 1.25rem;
            svg.icons {
              font-size: 1.4rem;
              width: 1.4rem;
              height: 1.4rem;
              transform: translateY(5px);
              margin-right: 10px;
            }
            span {
              margin: 0 10px;
              color: white;
              font-size: 1.5rem;
              font-weight: bolder;
            }
            span.space {
              margin: 0 15px;
            }
          }
        }
        button {
          height: 40px;
          border-radius: 5px !important;
          span.MuiButton-label {
            font-size: 1.2rem;
          }
        }
      }
    }

    @media screen and (max-width: 1000px) {
      .bannerBox {
        position: absolute;
        right: 50%;
        transform: translate(50%, -50%);
      }
    }
  }

  .mobilePoster {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    object-position: center top;
  }

  .counters {
    position: fixed;
    width: 100%;
    bottom: 90px;
    left: 50%;
    transform: translate(-50%, 0);
    color: white;
    p,
    span {
      text-align: center;
    }
    p {
      padding: 0 20px;
      margin: 8px auto;
      width: fit-content;
      color: inherit;
      background-color: rgba(95, 167, 165, 0.7);
      border-radius: 10px;
    }
    span {
      font-size: 1.2rem;
      margin: 0 2px;
      color: inherit;
    }
  }

  section {
    width: 100%;
    padding: 40px 20px;
    margin: 0 auto;

    * {
      margin: 0 auto;
      max-width: 600px;
    }
  }

  section.introVideo {
    margin: 0 auto;
    margin-top: 50px;
    padding: 0;
    width: 100%;
    top: ${HEADER_HEIGHT}px;
    left: 0;
    display: flex;
    justify-content: center;
    iframe {
      width: 100%;
      max-width: 600px;
      height: ${(props) => (props.videoWidth * 1080) / 1920}px;
      max-height: ${(600 * 1080) / 1920}px;
    }
  }

  section.summary {
    .title {
      font-size: 1.4rem;
      color: ${COLORS.primary};
      font-weight: bolder;
      margin-bottom: 40px;
      word-break: keep-all;
    }
    .quoteBlock {
      margin-bottom: 40px;
      .quote {
        margin-bottom: 10px;
        line-height: 1.875rem;
      }
      .name {
        margin-top: 10px;
        color: #686868;
      }
    }
    .instructionBlock {
      margin-bottom: 40px;
      h4 {
        font-size: 1rem;
        font-weight: bolder;
        margin-bottom: 10px;
      }
      ol {
        margin-top: 10px;
        padding-inline-start: 20px;
        line-height: 1.875rem;
        li {
          color: #686868;
        }
      }
    }
    .ps {
      font-size: 0.75rem;
      color: #686868;
    }
  }

  section.acknowledgement {
    background-color: #dbdbdb;
    .title {
      font-size: 1rem;
      font-weight: bolder;
      margin-bottom: 30px;
    }
    div,
    p {
      font-size: 0.75rem;
      word-break: keep-all;
    }
    .division {
      font-weight: bolder;
      margin-bottom: 0;
      margin-right: 5px;
    }
    img.logoGroup {
      margin: 30px 0 0 0;
      width: 100%;
    }
  }

  section.footer {
    background-color: #dbdbdb;
    padding-top: 15px;
    padding-bottom: 100px;
    .divider {
      margin-bottom: 20px;
      width: 100%;
      border-top: 1px solid #b1b1b1;
    }
    .infoBlock {
      p {
        margin: 5px 0;
        font-size: 0.75rem;
        color: #686868;
      }
      .socialBlock {
      }
    }
    div.logo {
      margin: 0;
      margin-bottom: 10px;
    }
  }

  &.withLayout {
    height: 100%;
    overflow-y: auto;
    section.summary {
      .title {
        font-size: 1.5rem;
      }
      .quoteBlock {
        p {
          font-size: 1.2rem;
        }
      }
      .instructionBlock {
        h4 {
          font-size: 1.2rem;
        }
        ol {
          font-size: 1.1rem;
        }
      }
      .ps {
        font-size: 1rem;
      }
    }

    section.acknowledgement {
      .title {
        font-size: 1.2rem;
      }
      div {
        margin: 10px auto;
        font-size: 1rem;
        .division {
          font-size: 1.1rem;
        }
      }
      img {
        margin: 30px auto 0 auto;
      }
    }
  }
`;

const FixedHeader = styled(Header)`
  position: fixed;
  width: 100vw;
  z-index: 3;
  p {
    color: ${COLORS.disabled};
  }

  &.top {
    position: absolute;
    div.header {
      background: none;
      box-shadow: none;
    }
    svg {
      color: white;
    }
    p {
      color: white;
    }
  }

  &.header-mobile-enter {
    position: absolute;
    div.header {
      transition: 1s;
      background: none;
      box-shadow: none;
    }
    svg {
      transition: 1s;
      color: white;
    }
    p {
      transition: 1s;
      color: white;
    }
  }

  &.header-mobile-enter-active {
    position: fixed;
    div.header {
      background-color: white;
      box-shadow: rgba(0, 0, 0, 0.16) 0 3px 6px;
    }
    svg {
      color: ${COLORS.primary};
    }
    p {
      color: ${COLORS.disabled};
    }
  }

  &.header-mobile-exit {
    position: fixed;
    div.header {
      transition: 1s;
      background-color: white;
      box-shadow: rgba(0, 0, 0, 0.16) 0 3px 6px;
    }
    svg {
      transition: 1s;
      color: ${COLORS.primary};
    }
    p {
      transition: 1s;
      color: ${COLORS.disabled};
    }
  }

  &.header-mobile-exit-active {
    position: absolute;
    div.header {
      background: none;
      box-shadow: none;
    }
    svg {
      color: white;
    }
    p {
      color: white;
    }
  }
`;

const EnterButton = styled(Button)`
  position: fixed !important;
  bottom: 40px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 300px;
  height: 50px;
  background-color: white !important;
  transition: 300ms ease;
  border-radius: 10px !important;
  z-index: 2;
  span {
    color: ${COLORS.primary};
    font-weight: bolder;
  }

  &.stickBottom {
    position: fixed !important;
    bottom: 0;
    width: 100%;
    height: calc(50px + env(safe-area-inset-bottom) / 2);
    padding-bottom: calc(8px + env(safe-area-inset-bottom) / 4);
    background-color: ${COLORS.primary} !important;
    border-radius: 0 !important;
    span {
      color: white;
    }
  }

  &.enter-button-enter {
    bottom: 40px;
    width: 300px;
    height: 50px;
    padding-bottom: 8px;
    transition: 1s;
    border-radius: 10px !important;
    span {
      color: ${COLORS.primary};
      transition: 1s;
    }
  }

  &.enter-button-enter-active {
    bottom: 0px;
    width: 100%;
    height: calc(50px + env(safe-area-inset-bottom) / 2);
    padding-bottom: calc(8px + env(safe-area-inset-bottom) / 4);
    border-radius: 0 !important;
    span {
      color: white;
    }
  }

  &.enter-button-exit {
    bottom: 0px;
    width: 100%;
    height: calc(50px + env(safe-area-inset-bottom) / 2);
    padding-bottom: calc(8px + env(safe-area-inset-bottom) / 4);
    transition: 1s;
    border-radius: 0 !important;
    span {
      color: white;
      transition: 1s;
    }
  }

  &.enter-button-exit-active {
    bottom: 40px;
    width: 300px;
    height: 50px;
    padding-bottom: 8px;
    border-radius: 10px !important;
    span {
      color: ${COLORS.primary};
    }
  }
`;

const EnterButtonDesktop = styled(Button)``;

const GoDownIconButton = styled(IconButton)`
  position: fixed !important;
  bottom: 3px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 1;

  svg {
    width: 32px;
    height: 13px;
    color: white;
  }
`;

const GoTopButton = styled(Button)`
  position: absolute !important;
  bottom: 120px;
  right: 20px;
  width: 64px;
  height: 64px;
  background-color: white !important;
  border-radius: 50% !important;
  z-index: 0;
  padding: 0 !important;
  span.MuiButton-label {
    width: 64px;
    margin: 0;
    color: ${COLORS.primary};
  }

  &.withLayout {
    position: fixed !important;
    right: 60px;
    bottom: calc(60px + ${PLAYBAR_HEIGHT}px);
  }
`;

interface Props {
  artists: Artist[];
}
const HomePage: React.FC<Props> = ({ artists }) => {
  const router = useRouter();
  const { y } = useWindowScroll();
  const { innerWidth, innerHeight } = useWindowSize();
  const { withLayout, setIndex } = React.useContext(IndexContext);
  const { data: visitor } = useSWR(`${API_URL}/counter`);
  const { data: signature } = useSWR(`${API_URL}/signature/count`);
  const [counters, setCounters] = React.useState<{
    visitor: number;
    signature: number;
  }>({ visitor: 0, signature: 0 });

  const refRoot = React.useRef<HTMLDivElement>(null);

  const handleScrollDown = () => {
    window.scroll({
      behavior: 'smooth',
      top: isIOS ? innerHeight + HEADER_HEIGHT : innerHeight,
      left: 0,
    });
  };

  React.useEffect(() => {
    if (router.query.start) {
      const startArtist = artists.find(
        (artist) => artist.artistName === (router.query.start as string),
      );
      if (startArtist) {
        sessionStorage.setItem('@artistId', `${startArtist.id}`);
        sessionStorage.setItem('@artistName', startArtist.artistName);
        setIndex(startArtist.id);
        router.replace('/', undefined, { shallow: true });
      }
    }
  }, [artists, router, setIndex]);

  React.useEffect(() => {
    if (!visitor || !signature) return;
    const { counts: numVisitor } = visitor;
    const { counts: numSignature } = signature;
    setCounters({ visitor: numVisitor, signature: numSignature });
  }, [visitor, signature]);

  return (
    <>
      <Head>
        <title>onDisplay - 관악미술협회 15주년 기념전</title>
      </Head>
      <CSSTransition in={y > 10} timeout={1000} classNames="header-mobile">
        <FixedHeader className={`${y <= 10 && 'top'}`} />
      </CSSTransition>
      {ISTEST ? (
        <TestRoot>
          <h1>관악미술협회 15주년 기념전</h1>
          <h2>전시회 준비중입니다.</h2>
          <div className="dateBlock">
            <h3>2020년 09월 11일 (금)</h3>
            <h3>~</h3>
            <h3>2020년 09월 24일 (금)</h3>
          </div>
        </TestRoot>
      ) : (
        <Root
          className={`${withLayout && 'withLayout'}`}
          videoWidth={innerWidth}
          ref={refRoot}
        >
          {!withLayout ? (
            <>
              <img
                className="mobilePoster unselectable"
                alt="나의 이야기"
                src="images/mobile_poster.jpg"
                height={innerHeight}
              />
              {y <= 120 && (
                <div className="counters">
                  <p>
                    방문자{' '}
                    <Countup
                      start={0}
                      end={counters.visitor}
                      duration={2}
                      separator=","
                    />
                    명 &middot; 방명록{' '}
                    <Countup
                      start={0}
                      end={counters.signature}
                      duration={2}
                      separator=","
                    />
                    개
                  </p>
                </div>
              )}
              <CSSTransition
                in={y > 10}
                timeout={1000}
                classNames="enter-button"
              >
                <Link href="/video">
                  <EnterButton className={y > 10 ? 'stickBottom' : ''}>
                    전시 입장
                  </EnterButton>
                </Link>
              </CSSTransition>
              {y <= 10 && (
                <GoDownIconButton onClick={handleScrollDown}>
                  <SvgIcon component={GoDown} viewBox="0 0 32.2 13.3" />
                </GoDownIconButton>
              )}
            </>
          ) : (
            <>
              <div className="desktopPoster unselectable">
                <div className="bannerBox">
                  <img
                    className="bannerText"
                    alt="관악미술협회 창립15주년 기념전 09.11 ~ 09.24 2020"
                    src="/images/banner.png"
                  />
                  <div className="grow" />
                  <div className="counterBox">
                    <p>
                      <Visibility className="icons" />
                      방문자{' '}
                      <Countup
                        className="count"
                        start={0}
                        end={counters.visitor}
                        duration={2}
                        separator=","
                      />
                      명
                      <span className="space" />
                      <Create className="icons" />
                      방명록{' '}
                      <Countup
                        className="count"
                        start={0}
                        end={counters.signature}
                        duration={2}
                        separator=","
                      />
                      개
                    </p>
                  </div>
                  <Link href="/video">
                    <EnterButtonDesktop variant="contained">
                      전시 입장
                    </EnterButtonDesktop>
                  </Link>
                </div>
                <IconButton
                  className="goDownButton"
                  onClick={() => {
                    refRoot.current?.scroll({
                      behavior: 'smooth',
                      top: innerHeight - PLAYBAR_HEIGHT,
                      left: 0,
                    });
                  }}
                >
                  <SvgIcon component={GoDownDesktop} viewBox="0 0 56.9 22.1" />
                </IconButton>
              </div>
            </>
          )}
          <section className="introVideo">
            <iframe
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="관악미술협회 15주년 기념전"
              src="https://www.youtube.com/embed/xXf40_TTVHw?enablejsapi=1"
            />
          </section>
          <section className="summary">
            <h2 className="title">
              이번 전시는 온라인으로만 진행되는 비대면 전시회입니다.
            </h2>
            <div className="quoteBlock">
              <p className="quote">
                “사람을 만나는 일에 거리를 두어야 하는 이러한 시절에
                관악미술협회는 창립 15주년 기념전이 되는 &lsquo;제16회
                관악미술협회전&rsquo;을 특별히 온라인으로 개최합니다.”
              </p>
              <p className="name">- 관악미술협회 회장 김철성</p>
            </div>
            <div className="instructionBlock">
              <h4>전시 즐기는 법</h4>
              <ol>
                <li>
                  전시소개에서 15주년을 맞은 관악미술협회의 이야기를 동영상으로
                  만나보세요.
                </li>
                <li>
                  전시장에서 노련하고 개성 넘치는 64인 작가의 작품을 감상하세요.
                </li>
                <li>마지막 방명록에서 여러분의 흔적을 남겨주세요.</li>
              </ol>
            </div>
            <p className="ps">
              작품을 실제로 감상하거나 작가와 연락하고 싶으신 분, 온라인 전시
              개최에 관심이 있으신 분들은 본 페이지 하단의 onDisplay 대표전화
              또는 이메일로 연락 주시기 바랍니다.
            </p>
          </section>
          <section className="acknowledgement">
            <h2 className="title">
              관악미술협회 창립15주년 기념展 “나의 이야기”
              <br />제 16회 관악미술협회 展
            </h2>
            <div>
              <p className="division">장소</p>
              gfaa.ondisplay.co.kr
            </div>
            <div>
              <p className="division">기간</p>
              2020년 9월 11일 - 24일
            </div>
            <div>
              <p className="division">참여작가</p>
              전뢰진 송진세 홍사구 두시영 김영순 이희자 지성곤 서홍원 성낙주
              임옥수 김철성 강명숙 강미숙 강미영 강의숙 권기순 권효진 금광복
              김경순 김만수 김성옥 김정숙 김정임 김현숙 남행연 노혜경 도해심
              민경숙 민병문 박경순 박귀수 박장식 박정화 박창수 서정화 선문순
              선학균 양혜언 엄길자 엄순복 오용남 오학연 원영례 윤건섭 윤옥희
              이길자 이명희 이석민 이영희 이치순 임인성 전경애 전인애 정귀조
              정수복 정옥련 최영남 최영순 최영심 한광수 현연희 홍화표 황미경
              황정숙
            </div>
            <div>
              <p className="division">주최</p>
              사단법인 관악미술협회
            </div>
            <div>
              <p className="division">후원</p>
              관악구 관악문화재단 관악문화원
            </div>
            <img
              className="logoGroup"
              alt="주최 관악미술협회 후원 관악구 관악문화재단 관악문화원"
              src="/images/ack_logo.png"
            />
          </section>
          <section className="footer">
            <div className="divider" />
            <Footer />
            <GoTopButton
              className={`${withLayout && 'withLayout'}`}
              variant="contained"
              color="primary"
              onClick={() => {
                window.scroll({ behavior: 'smooth', top: 0, left: 0 });
                refRoot.current?.scroll({
                  behavior: 'smooth',
                  top: 0,
                  left: 0,
                });
              }}
            >
              Top
            </GoTopButton>
          </section>
        </Root>
      )}
    </>
  );
};

export default HomePage;

export async function getStaticProps(): Promise<{
  props: {
    artists: Artist[];
  };
}> {
  try {
    const { artists } = await fetcher(`${API_URL}/artist`);

    return {
      props: {
        artists,
      },
    };
  } catch (err) {
    return {
      props: {
        artists: [],
      },
    };
  }
}
