import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import ScrollLock from 'react-scrolllock';

const Root = styled.div`
  .modal-enter {
    opacity: 0;
  }
  .modal-enter-active {
    opacity: 1;
    transition: opacity 300ms;
  }
  .modal-exit {
    opacity: 1;
  }
  .modal-exit-active {
    opacity: 0;
    transition: opacity 300ms;
  }
`;

const Dialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 80vw;
  padding: 1.5rem;
  background: #eee;
  border-radius: 10px;
  border: 1px solid #aaa;
  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
  p {
    margin: 0;
    font-size: 1.125rem;
  }
  button {
    margin-left: 10px;
  }
  z-index: 999;
`;

interface Props {
  children: React.ReactNode;
  visible?: boolean;
}

const Modal: React.FC<Props> = ({ children, visible = false, ...props }) => {
  return (
    <Root>
      <ScrollLock isActive={visible} />
      <CSSTransition
        in={visible}
        timeout={300}
        unmountOnExit
        classNames="modal"
      >
        <Dialog {...props}>{children}</Dialog>
      </CSSTransition>
    </Root>
  );
};

export default Modal;
