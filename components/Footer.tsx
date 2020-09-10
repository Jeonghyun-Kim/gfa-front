import React from 'react';
import styled from 'styled-components';

import Logo from './Logo/OneLineLogo';

const Root = styled.div`
  svg {
    color: black;
  }
  .infoBlock {
    a {
      color: inherit;
    }
  }
  .socialBlock {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 30px auto;
    width: 200px;

    #insta-logo {
      height: 55px;
      object-fit: contain;
    }

    #youtube-logo {
      height: 40px;
      object-fit: contain;
    }

    @media screen and (min-width: 801px) {
      display: none;
    }
  }
`;

const Footer: React.FC = ({ ...props }) => {
  return (
    <Root {...props}>
      <div className="infoBlock">
        <Logo />
        <p>
          <b>주식회사 온디스플레이</b>
        </p>
        <p>
          <b>대표</b> 박세정
        </p>
        <p>
          <b>사업자등록번호</b> 721-86-01906
        </p>
        <p>
          <b>대표전화</b> 010-6317-1498
        </p>
        <p>
          <b>이메일</b>{' '}
          <a href="mailto:ondisplay.art@gmail.com">ondisplay.art@gmail.com</a>
        </p>
      </div>
      <div className="socialBlock">
        <a
          href="https://www.instagram.com/ondisplay.art/"
          target="_blank"
          rel="noreferrer"
        >
          <img id="insta-logo" alt="instagram" src="/icons/instagram.png" />
        </a>
        <a
          href="https://www.youtube.com/channel/UCfVS6DRcZfYZchge60qyHVQ/"
          target="_blank"
          rel="noreferrer"
        >
          <img id="youtube-logo" alt="youtube" src="/icons/youtube.png" />
        </a>
      </div>
    </Root>
  );
};

export default Footer;
