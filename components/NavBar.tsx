import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Logo from './Logo/OneLineLogo';

import { MOBILE_BREAKPOINT } from '../defines';

const Root = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  display: flex;
  flex-direction: column;
  padding: 2rem 2rem;

  background-color: #121212;

  .divider {
    margin: 1rem 0;
    align-self: center;
    width: 100%;
    border-top: 1px solid #4b4b4b;
  }

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    display: none;
  }
`;

interface MenuProps {
  current: boolean;
}

const MenuItem = styled.a<MenuProps>`
  margin: 1rem 0;
  color: ${(props) => (props.current ? '#17BABC' : '#7D7D7D')};
  font-size: ${(props) => (props.current ? 1 : 0.8)}rem;
  font-weight: ${(props) => (props.current ? 'bolder' : 'normal')};
  &:hover {
    cursor: pointer;
    color: ${(props) => (props.current ? '#17BABC' : 'white')};
  }
`;

interface Props {}

const NavBar: React.FC<Props> = ({ ...props }) => {
  const router = useRouter();
  return (
    <Root {...props}>
      <Logo />
      <div className="divider" />
      <Link href="/">
        <MenuItem current={router.pathname === '/'}>
          관악미술협회
          <br />
          창립 15주년 기념전:
          <br />
          나의 이야기
        </MenuItem>
      </Link>
      <Link href="/artist/11">
        <MenuItem current={router.pathname === '/artist/[id]'}>전시장</MenuItem>
      </Link>
      <Link href="/video">
        <MenuItem current={router.pathname === '/video'}>
          관악미술협회 이야기
        </MenuItem>
      </Link>
      <Link href="/visitor">
        <MenuItem current={router.pathname === '/visitor'}>방명록</MenuItem>
      </Link>
      <div className="grow" />
      <div className="divider" />
      <Link href="/about">
        <MenuItem current={router.pathname === '/about'}>
          About onDisplay
        </MenuItem>
      </Link>
    </Root>
  );
};

export default NavBar;
