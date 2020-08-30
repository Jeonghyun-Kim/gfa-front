import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import Logo from './Logo/SquaredLogo';
import MenuItem from './Header/MenuItem';

import { PAGE_ARRAY } from '../defines';

import IndexContext from '../IndexContext';

const HEADER_HEIGHT = 56;
const TRANSITION = 300;

const Root = styled.div`
  .header-enter {
    top: -${HEADER_HEIGHT}px;
  }
  .header-enter-active {
    top: 0;
    transition: ${TRANSITION}ms;
  }
  .header-exit {
    top: 0;
  }
  .header-exit-active {
    top: -${HEADER_HEIGHT}px;
    transition: ${TRANSITION * 1.5}ms;
  }
`;

const FixedHeader = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0 3px 6px;
  padding-left: 1rem;
  padding-right: 1rem;
  z-index: 2;
`;

interface Props {
  visible?: boolean;
}
const Header: React.FC<Props> = ({ visible = true, ...props }) => {
  const { withLayout } = React.useContext(IndexContext);
  if (withLayout) return <></>;

  return (
    <Root>
      <CSSTransition
        in={visible}
        timeout={TRANSITION}
        unmountOnExit
        classNames="header"
      >
        <FixedHeader {...props}>
          <Logo />
          <div className="grow" />
          <MenuItem href={PAGE_ARRAY[1]}>전시장</MenuItem>
          <MenuItem href={PAGE_ARRAY[2]}>협회</MenuItem>
          <MenuItem href={PAGE_ARRAY[3]}>방명록</MenuItem>
        </FixedHeader>
      </CSSTransition>
    </Root>
  );
};

export default Header;
