import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import Logo from './Logo/TwoLineLogo';

import { MOBILE_BREAKPOINT } from '../defines';

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

  @media screen and (min-width: ${MOBILE_BREAKPOINT + 1}px) {
    display: none;
  }
`;

const FixedHeader = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.117647) 0 1px 3px;
  padding-left: 2rem;
  padding-right: 2rem;
  z-index: 2;
`;

interface Props {
  visible?: boolean;
}

const Header: React.FC<Props> = ({ visible = true, ...props }) => {
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
        </FixedHeader>
      </CSSTransition>
    </Root>
  );
};

export default Header;
