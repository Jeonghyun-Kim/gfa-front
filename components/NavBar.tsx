import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Logo from './Logo/OneLineLogo';

import { COLORS, MOBILE_BREAKPOINT, PAGE_ARRAY } from '../defines';

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
`;

interface MenuProps {
  current: boolean;
}

const MenuItem = styled.a<MenuProps>`
  margin: 1rem 0;
  color: ${(props) => (props.current ? COLORS.primary : '#7D7D7D')};
  font-size: ${(props) => (props.current ? 1 : 0.8)}rem;
  font-weight: ${(props) => (props.current ? 'bolder' : 'normal')};
  &:hover {
    cursor: pointer;
    color: ${(props) => (props.current ? COLORS.primary : 'white')};
  }
`;

interface Props {
  visible?: boolean;
}

const NavBar: React.FC<Props> = ({ visible = true, ...props }) => {
  const router = useRouter();
  if (!visible) return <></>;
  return (
    <Root {...props}>
      <Logo />
      <div className="divider" />
      <Link href={PAGE_ARRAY[0]}>
        <MenuItem current={router.pathname === PAGE_ARRAY[0]}>
          관악미술협회
          <br />
          창립 15주년 기념전:
          <br />
          나의 이야기
        </MenuItem>
      </Link>
      <Link href={PAGE_ARRAY[1]}>
        <MenuItem current={router.pathname === PAGE_ARRAY[1]}>전시장</MenuItem>
      </Link>
      <Link href={PAGE_ARRAY[2]}>
        <MenuItem current={router.pathname === PAGE_ARRAY[2]}>
          관악미술협회 이야기
        </MenuItem>
      </Link>
      <Link href={PAGE_ARRAY[3]}>
        <MenuItem current={router.pathname === PAGE_ARRAY[3]}>방명록</MenuItem>
      </Link>
      <div className="grow" />
      <div className="divider" />
      <Link href={PAGE_ARRAY[4]}>
        <MenuItem current={router.pathname === PAGE_ARRAY[4]}>
          About onDisplay
        </MenuItem>
      </Link>
    </Root>
  );
};

export default NavBar;
