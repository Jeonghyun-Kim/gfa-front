import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import Button from '@material-ui/core/Button';

import useWindowSize from '../lib/hooks/useWindowSize';
import useWindowScroll from '../lib/hooks/useWindowScroll';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Congrat from '../components/Congrat';

import { HEADER_HEIGHT, COLORS } from '../defines';

import IndexContext from '../IndexContext';

import congrates from '../congrats.json';

interface RootProps {
  videoWidth: number;
}
const Root = styled.div<RootProps>`
  position: relative;
  width: 100%;
  margin-top: ${HEADER_HEIGHT}px;
  section {
    width: 100%;
    padding: 40px 20px;
    margin: 0 auto;
    .content {
      line-height: 1.875rem;
    }
  }
  section.videoBlock {
    padding: 0;
    width: 100%;
    top: ${HEADER_HEIGHT}px;
    left: 0;
    iframe.storyVideo {
      width: 100%;
      height: ${(props) => (props.videoWidth * 1080) / 1920}px;
    }
  }
  &.withLayout {
    width: 100%;
    height: 100%;
    margin: 0;
    section.videoBlock {
      width: 100%;
      height: 100%;
      iframe.storyVideo {
        width: 100%;
        height: 100%;
      }
    }
  }
  section.summary {
    margin-top: 0;
    min-height: calc(
      100vh - ${HEADER_HEIGHT}px -
        ${(props) => (props.videoWidth * 1080) / 1920}px
    );
    .title {
      margin-top: 0;
      font-size: 1.5rem;
      word-break: keep-all;
    }
    .content {
      text-indent: 0.5rem;
    }
    .name {
      font-size: 0.875rem;
      font-weight: bolder;
    }
  }
  /* section.welcomeGuide {
    .division {
      margin: 0;
      letter-spacing: 10px;
    }
    .title {
      margin-top: 10px;
      font-size: 1.1rem;
      font-weight: bolder;
    }
    .name {
      font-size: 0.875rem;
      font-weight: bolder;
    }
    .content {
      margin: 5px;
      text-indent: 0.5rem;
    }
  } */
  section.congratsBlock {
    padding: 10px 0;
    background-color: #dbdbdb;

    .congrat {
      background-color: white;
    }
  }
  section.footer {
    background-color: #dbdbdb;
    padding-bottom: 100px;
    .divider {
      margin-bottom: 60px;
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
  }
`;

const FixedHeader = styled(Header)`
  position: fixed;
  width: 100vw;
  z-index: 3;

  &.top {
    position: absolute;
  }
`;

const EnterButton = styled(Button)`
  position: fixed !important;
  padding: 10px !important;
  bottom: 30px;
  right: 20px;
  width: 60px;
  background-color: ${COLORS.primary} !important;
  border-radius: 10px !important;
  z-index: 0;
  span.MuiButton-label {
    color: white;
    margin: 0;
    font-weight: bolder;
  }
  z-index: 0;

  &.stickBottom {
    width: calc(100% - 40px);
  }

  &.enter-button-enter {
    width: 60px;
    transition: 500ms;
  }

  &.enter-button-enter-active {
    width: calc(100% - 40px);
  }

  &.enter-button-exit {
    width: calc(100% - 40px);
    transition: 500ms;
  }

  &.enter-button-exit-active {
    width: 60px;
  }
`;

const VideoPage: React.FC = () => {
  const { innerWidth } = useWindowSize();
  const { y } = useWindowScroll();
  // const [open, setOpen] = React.useState<boolean>(false);

  const { withLayout } = React.useContext(IndexContext);

  return (
    <>
      <Head>
        <title>onDisplay - 관악미술협회 이야기</title>
      </Head>
      <FixedHeader className={`${y <= 0 && 'top'}`} />
      <Root className={`${withLayout && 'withLayout'}`} videoWidth={innerWidth}>
        <section className="videoBlock">
          <iframe
            className="storyVideo"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="관악미술협회 15주년 기념전"
            src={`https://www.youtube.com/embed/EyQU-4BTf4o?enablejsapi=1&${
              withLayout && 'autoplay=1'
            }`}
          />
        </section>
        <section className="summary">
          <h2 className="title">
            관악미술협회 창립 15주년 기념전에 오신 것을 환영합니다!
          </h2>
          <p className="content">
            어느덧 저희 관악미술협회가 출범한 지 15년이 되었습니다. 그동안
            관악미술협회는 ‘관악깃발전’, ‘관악미술협회전’ 그리고 ‘행복나눔전’을
            통해 수준 높은 전시회를 개최하였습니다. 이를 통해 관악구민들과
            문화예술을 공유하며 관악구의 대표적인 예술단체로 자리매김하게
            되었습니다.
          </p>
          <p className="content">
            이번 15주년 기념전 ‘나의 이야기’는 기존과 달리 ‘온라인 전시회’로
            개최하게 되었습니다. 비록 코로나-19로 인하여 여러분을 한 자리에
            초대하지는 못하지만 컴퓨터와 스마트폰을 통해 작품을 감상하며
            관악미술협회 창립 15주년을 마음으로 축하해주시기 바랍니다.
            감사합니다.
          </p>
          <p className="name">사단법인 관악미술협회 회장 김철성</p>
        </section>
        {/* <section className="welcomeGuide">
          <p className="division">인사말</p>
          <h2 className="title">
            관악미술협회 창립15주년 기념 &ldquo;나의 이야기&rdquo;
            <br /> &ldquo;제16회 관악미술협회전&rdquo;을 개최하며
          </h2>
          <p className="name">사단법인 관악미술협회 회장 김철성</p>
          <p className="content">
            긴 장마와 무더위를 견딘 후, 산과 들은 다양하고 깊이 있는 아름다운
            색으로 물들어가고 있습니다. 세계가 코로나-19로 미래의 불확실성 속에
            빠졌을 때, 우리는 자유의 소중함과 그동안 누렸던 일상이 행복이었다는
            걸 깨닫게 되었습니다. 이제 코로나-19 이전으로는 돌아갈 수 없다고
            하지만 한결같은 자연의 섭리는 현재를 살아내고 있는 우리에게 쉼과
            새로운 힘을 주고 있습니다. 사람을 만나는 일에 거리를 두어야 하는
            이러한 시절에 관악미술협회는 창립15주년 기념전이 되는 “제16회
            관악미술협회전”을 특별히 ‘지상전’ 및 ‘온라인 전시’로 개최합니다.
            대면접촉을 최소화하면서 많은 시민들과 예술로 소통할 수 있는 새로운
            방법이 될 것입니다.
          </p>
          {open && (
            <>
              <p className="content">
                어느덧 (사)관악미술협회가 출범한 지 15년이 되었습니다. 그동안
                관악미술협회는 관악구청의 적극적인 후 원에 힘입어 ‘관악깃발전’,
                ‘관악미술협회전’ 그리고 ‘행복나눔전’을 통해 수준 높은 전시회를
                개최하였습니다. 이를 통해 관악구민들과 시민들에게 문화예술을
                통한 소통과 예술적 감수성 증진에 크게 기여해왔을 뿐만 아니라
                관악구의 대표적인 예술단체로 자리매김하게 되었습니다.
              </p>
              <p className="content">
                오늘의 관악미술협회가 활발한 전시활동을 통해 지역문화의 수준을
                향상시키는 데 중추적인 역할을 할 수 있기까지는 본 협회 고문이신
                홍사구, 두시영, 김영순, 이희자, 지성곤, (고)이파은 역대 회장님을
                비롯하여 자문위원님과 임원들의 수고가 있었기 때문입니다. 그리고
                모든 회원님들의 창작에 대한 열정과 협회에 대한 사랑 덕분이라고
                생각합니다.
              </p>
              <p className="content">
                금번 15주년 기념전은 기존과 달리 ‘온라인 전시회’로 관악미술협회
                개개인의 작품세계를 좀 더 깊이 있게 감상할 수 있도록 지면을
                늘리고, 컴퓨터나 스마트폰을 통해 언제 어디서나 편하게 감상할 수
                있도록 하였습니다. 새로운 방식의 ‘온라인 관악미술협회전’을 통해
                그동안 열과 성을 다해 창작해온 주옥같은 관악미술협회 회원들의
                작품을 향유하시길 기원합니다. 비록 코로나-19로 인하여 여러분을
                한 자리에 초대하지는 못하지만 작품을 감상하며 관악미술협회 창립
                15주년을 마음으로 축하해주시기 바랍니다.
              </p>
              <br />
              <p className="content">
                끝으로 항상 지역 구민을 위한 전시회가 될 수 있도록 지원을 아끼지
                않으신 박준희 관악구청장님과 국회의원님들, 그리고 구의장님을
                비롯한 의원님들, 전시 관계자 여러분께 깊이 감사드립니다. 귀한
                작품을 출품해주신 회원님들과 언제나 한결같은 애정을 기울여주시는
                본 협회의 고문, 자문위원님들, 수고하신 임원들께도 다시 한 번
                깊이 머리 숙여 경의를 표합니다. 대단히 감사합니다.
              </p>
            </>
          )}
          <Button onClick={() => setOpen(!open)}>
            {open ? '줄이기' : '더보기'}
          </Button>
        </section> */}
        <section className="congratsBlock">
          {congrates.map((congrat) => (
            <Congrat key={congrat.id} className="congrat" {...congrat} />
          ))}
        </section>
        <section className="footer">
          <div className="divider" />
          <Footer />
        </section>
        <CSSTransition in={y <= 50} timeout={500} classNames="enter-button">
          <Link href="/artist">
            <EnterButton className={y > 50 ? '' : 'stickBottom'}>
              전시장
            </EnterButton>
          </Link>
        </CSSTransition>
      </Root>
    </>
  );
};

export default VideoPage;
