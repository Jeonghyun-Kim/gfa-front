import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import ScrollLock from 'react-scrolllock';

const Root = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  display: grid;
  place-items: center;

  img.manualImage {
    /* margin: 150px auto; */
    width: 250px;
    height: 250px;
  }

  &.manual-modal-enter {
    transition: 300ms;
  }

  &.manual-modal-enter-active {
  }

  &.manual-modal-exit {
    transition: 300ms;
  }

  &.manual-modal-exit-active {
  }
`;

interface Props {
  className?: string | undefined;
}
const ManualMModal: React.FC<Props> = ({ className, ...props }) => {
  const item = sessionStorage.getItem('@manual');
  const [open, setOpen] = React.useState<boolean>(!item);

  return (
    <CSSTransition
      in={open}
      timeout={300}
      unmountOnExit
      className="manual-modal"
    >
      <Root
        className={className}
        onClick={() => {
          sessionStorage.setItem('@manual', 'seen');
          setOpen(false);
        }}
        {...props}
      >
        <ScrollLock isActive={open} />
        <img
          className="manualImage"
          alt="스와이프! 넘겨보는 전시장"
          src="/images/manual.png"
        />
      </Root>
    </CSSTransition>
  );
};

export default ManualMModal;
