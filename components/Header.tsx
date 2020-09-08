import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import Logo from './Logo/SquaredLogo';
import MenuItem from './Header/MenuItem';

import { ISTEST, PAGE_ARRAY, HEADER_HEIGHT, TRANSITION } from '../defines';

import IndexContext from '../IndexContext';

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

interface HeaderProps {
  fixed: boolean;
}
const FixedHeader = styled.div<HeaderProps>`
  position: ${(props) => (props.fixed ? 'relative' : 'fixed')};
  display: flex;
  align-items: center;
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0 3px 6px;
  padding-left: 15px;
  padding-right: 15px;
  z-index: 2;
`;

interface Props {
  className?: string | undefined;
  fixed?: boolean;
  visible?: boolean;
}
const Header: React.FC<Props> = ({
  className = undefined,
  fixed = true,
  visible = true,
  ...props
}) => {
  const { withLayout } = React.useContext(IndexContext);
  if (withLayout) return <></>;

  return (
    <Root className={`unselectable ${className}`}>
      <CSSTransition
        in={visible}
        timeout={TRANSITION}
        unmountOnExit
        classNames="header"
      >
        <FixedHeader className="header" fixed={fixed} {...props}>
          <Logo />
          <div className="grow" />
          {!ISTEST && (
            <>
              <MenuItem href={PAGE_ARRAY[1]}>전시소개</MenuItem>
              <MenuItem href={PAGE_ARRAY[2]}>전시장</MenuItem>
              <MenuItem href={PAGE_ARRAY[3]}>방명록</MenuItem>
            </>
          )}
        </FixedHeader>
      </CSSTransition>
    </Root>
  );
};

export default Header;
