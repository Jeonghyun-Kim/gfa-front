import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import ScrollLock from 'react-scrolllock';

import { NAVBAR_WIDTH, PLAYBAR_HEIGHT } from '../../defines';

import IndexContext from '../../IndexContext';

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

interface DialogProps {
  full: boolean;
  withLayout: boolean;
}
const Dialog = styled.div<DialogProps>`
  position: fixed;
  ${(props) =>
    !props.full
      ? `
  top: calc(50% - ${props.withLayout ? PLAYBAR_HEIGHT / 2 : 0}px);
  left: calc(50% - ${props.withLayout ? NAVBAR_WIDTH / 2 : 0} px);
  transform: translate(-50%, -50%);
  max-width: 80vw;
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid #aaa;
  `
      : `
    top: 0;
    left: ${props.withLayout ? NAVBAR_WIDTH : 0}px;
    width: 100%;
    height: calc(100% - ${props.withLayout ? PLAYBAR_HEIGHT : 0}px);

    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  `}
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
  full?: boolean;
  visible?: boolean;
}

const Modal: React.FC<Props> = ({
  children,
  full = false,
  visible = false,
  ...props
}) => {
  const { withLayout } = React.useContext(IndexContext);

  return (
    <Root {...props}>
      <ScrollLock isActive={visible} />
      <CSSTransition
        in={visible}
        timeout={300}
        unmountOnExit
        classNames="modal"
      >
        <Dialog className="modalRoot" full={full} withLayout={withLayout}>
          {children}
        </Dialog>
      </CSSTransition>
    </Root>
  );
};

export default Modal;
