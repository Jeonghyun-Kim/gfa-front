import React from 'react';
import styled from 'styled-components';

import Logo from './Logo';

import useWindowScroll from '../lib/hooks/useWindowScroll';

interface HeaderProps {
  height?: number;
  isOnTop: boolean;
}

interface AutoHidingHeaderProps {
  visible?: boolean;
}

interface FixedHeaderProps {
  height?: number;
}

const FixedHeader = styled.div<FixedHeaderProps>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.117647) 0 1px 3px;
  padding-left: 2rem;
  padding-right: 2rem;
  z-index: 2;
`;

const AutoHidingHeader = styled.div<AutoHidingHeaderProps>`
  position: fixed;
  top: -80px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.117647) 0 1px 3px;
  padding-left: 2rem;
  padding-right: 2rem;
  z-index: 2;
  transition: ${(props) => (props.visible ? '0.5' : '1.5')}s ease;
  transform: translateY(${(props) => (props.visible ? '80px' : '0px')});
`;

const StyledStickyHeader = styled.div<HeaderProps>`
  position: ${(props) => (props.isOnTop ? 'relative' : 'fixed')};
  top: 0px;
  display: flex;
  align-items: center;
  width: 100%;
  height: ${(props) => props.height ?? 80}px;
  background-color: white;
  /* background-color: ${(props) => (props.isOnTop ? 'white' : 'orange')}; */
  box-shadow: rgba(0, 0, 0, 0.117647) 0 1px 3px;
  padding-left: 2rem;
  padding-right: 2rem;
  z-index: 99;
`;

const EmptyDiv = styled.div<HeaderProps>`
  display: ${(props) => props.isOnTop && 'none'};
  width: 100%;
  height: ${(props) => props.height ?? 80}px;
`;

const Grow = styled.div`
  flex-grow: 1;
`;

interface Props {
  height?: number;
  sticky?: boolean;
  fixed?: boolean;
}

const Header: React.FC<Props> = ({
  height = 80,
  sticky = false,
  fixed = false,
  ...props
}) => {
  const [visible, setVisible] = React.useState<boolean>(sticky ?? false);
  const { y } = useWindowScroll();

  if (fixed) {
    return (
      <FixedHeader height={height} {...props}>
        <Logo />
        <Grow />
      </FixedHeader>
    );
  }

  if (sticky) {
    return (
      <>
        <StyledStickyHeader height={height} isOnTop={y <= 0} {...props}>
          <Logo />
          <Grow />
        </StyledStickyHeader>
        <EmptyDiv height={height} isOnTop={y <= 0} />
      </>
    );
  }

  const handleMouseEvent = {
    Enter: () => {
      setVisible(true);
    },
    Over: () => {
      setVisible(true);
    },
    Leave: () => {
      setVisible(false);
    },
  };

  return (
    <>
      <div
        className="fixedTransparent"
        onMouseEnter={() => handleMouseEvent.Enter()}
        onMouseLeave={() => handleMouseEvent.Leave()}
      />
      <div
        onMouseOver={() => handleMouseEvent.Over()}
        onMouseLeave={() => handleMouseEvent.Leave()}
        onFocus={() => {}}
      >
        <AutoHidingHeader visible={visible}>
          <Logo />
          <Grow />
        </AutoHidingHeader>
      </div>
    </>
  );
};

export default Header;
