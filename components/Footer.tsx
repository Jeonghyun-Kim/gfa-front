import React from 'react';
import styled from 'styled-components';

import Logo from './Logo/OneLineLogo';

const Root = styled.div`
  svg {
    color: black;
  }
`;

const Footer: React.FC = ({ ...props }) => {
  return (
    <Root {...props}>
      <Logo />
      <div className="infoBlock">
        <p>주식회사 온디스플레이</p>
        <p>대표 박세정</p>
        <p>사업자등록번호 721-86-01906</p>
        <p>대표전화 010-6317-1498</p>
        <p>이메일 ondisplay.art@gmail.com</p>
      </div>
      <div className="socialBlock" />
    </Root>
  );
};

export default Footer;
