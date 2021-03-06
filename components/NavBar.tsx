import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Logo from './Logo/OneLineLogo';

import { ISTEST, COLORS, PAGE_ARRAY, NAVBAR_WIDTH } from '../defines';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: ${NAVBAR_WIDTH}px;
  padding: 30px 30px;

  background-color: #121212;

  .divider {
    margin: 1rem 0;
    align-self: center;
    width: 100%;
    border-top: 1px solid #4b4b4b;
  }

  a {
    margin: 25px 0;
  }
`;

interface MenuProps {
  current: boolean;
}

const MenuItem = styled.a<MenuProps>`
  margin: 1rem 0;
  color: ${(props) => (props.current ? COLORS.primary : '#7D7D7D')};
  /* font-size: ${(props) => (props.current ? 1.1 : 1)}rem; */
  font-size: 1rem;
  font-weight: ${(props) => (props.current ? '500' : 'normal')};
  &:hover {
    cursor: pointer;
    color: ${(props) => (props.current ? COLORS.primary : 'white')};
  }
`;

const NavBar: React.FC = ({ ...props }) => {
  const router = useRouter();

  return (
    <Root {...props}>
      <Logo />
      <div className="divider" />
      <Link href={PAGE_ARRAY[0]}>
        <MenuItem current={router.pathname === PAGE_ARRAY[0]}>
          관악미술협회
          <br />
          창립15주년 기념展
          <br />
          “나의 이야기”
        </MenuItem>
      </Link>
      {!ISTEST && (
        <>
          <Link href={PAGE_ARRAY[1]}>
            <MenuItem current={router.pathname === PAGE_ARRAY[1]}>
              전시소개
            </MenuItem>
          </Link>
          <Link href={PAGE_ARRAY[2]}>
            <MenuItem current={router.pathname === PAGE_ARRAY[2]}>
              전시장
            </MenuItem>
          </Link>
          <Link href={PAGE_ARRAY[3]}>
            <MenuItem current={router.pathname === PAGE_ARRAY[3]}>
              방명록
            </MenuItem>
          </Link>
        </>
      )}
      <div className="grow" />
      <div className="divider" />
      <a href="https://home.ondisplay.co.kr/" target="_blank" rel="noreferrer">
        <MenuItem current={router.pathname === PAGE_ARRAY[4]}>
          About onDisplay
        </MenuItem>
      </a>
    </Root>
  );
};

export default NavBar;
