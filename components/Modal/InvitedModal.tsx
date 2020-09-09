import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import ScrollLock from 'react-scrolllock';
import { CSSTransition } from 'react-transition-group';

import Button from '@material-ui/core/Button';

import { COLORS } from '../../defines';

import IndexContext from '../../IndexContext';

const Root = styled.div`
  position: absolute;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  z-index: 10;

  .blurBackground {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5) no-repeat padding-box;
    -webkit-backdrop--filter: blur(5px);
    backdrop-filter: blur(5px);
    z-index: 1;
  }

  &.invited-modal-enter {
    opacity: 0;
    transition: 300ms ease;
  }

  &.invited-modal-enter-active {
    opacity: 1;
  }

  &.invited-modal-exit {
    opacity: 1;
    transition: 300ms ease;
  }

  &.invited-modal-exit-active {
    opacity: 0;
  }

  .modalBox {
    width: 280px;
    height: 280px;
    border-radius: 10px;
    background-color: white;
    z-index: 10;
    .top {
      height: 80px;
      background-color: #d7dede;
      border-radius: 10px 10px 0 0;
    }
    .bottom {
      height: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 0 0 0;
      .grow {
        flex-grow: 1;
      }
      & > p {
        margin: 0;
      }
      .situation {
        color: #686868;
        font-size: 0.75rem;
        font-weight: bolder;
        margin-bottom: 5px;
      }
      .question {
        font-weight: bolder;
      }
      .buttonGroup {
        width: 100%;
        height: 43px;
        border-top: 1px solid #f0f0f0;
        button {
          width: 50%;
          height: 100%;
          span {
            font-size: 0.9rem;
            font-weight: bolder;
          }
          &.goFirst {
            border-right: 1px solid #f0f0f0;
          }
          &.close {
            span {
              color: ${COLORS.primary};
            }
          }
        }
      }
    }
    &.withLayout {
      width: 440px;
      height: 440px;
      .top {
        height: 130px;
      }
      .bottom {
        height: 310px;
        padding: 40px 0 0 0;
        .situation {
          font-size: 1.2rem;
          margin-bottom: 15px;
        }
        .question {
          font-size: 1.4rem;
        }
        .buttonGroup {
          height: 66px;
        }
      }
    }
  }
`;

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  artistName?: string;
}
const InvitedModal: React.FC<Props> = ({
  open,
  setOpen,
  artistName,
  ...props
}) => {
  const router = useRouter();
  const { refSlider, setIndex, withLayout } = React.useContext(IndexContext);

  return (
    <CSSTransition
      in={open}
      timeout={300}
      unmountOnExit
      className="invited-modal"
    >
      <Root {...props}>
        <ScrollLock />
        <div className="blurBackground" />
        <div className={`modalBox ${withLayout && 'withLayout'}`}>
          <div className="top" />
          <div className="bottom">
            <div className="grow" />
            <p className="situation">
              {artistName} 작가님의 초대를 받으셨군요?
            </p>
            <p className="question">작가님의 작품 먼저 보시겠어요?</p>
            <div className="grow" />
            <div className="buttonGroup">
              <Button
                className="goFirst"
                onClick={() => {
                  setOpen(false);
                  sessionStorage.removeItem('@artistName');
                  setIndex(1);
                  sessionStorage.setItem('@artistId', '1');
                  refSlider.current?.slickGoTo(0);
                  if (!withLayout) {
                    setTimeout(() => router.reload(), 10);
                  }
                }}
              >
                1번 작품부터
              </Button>
              <Button
                className="close"
                onClick={() => {
                  setOpen(false);
                  sessionStorage.removeItem('@artistName');
                  sessionStorage.setItem('@skip', 'me');
                }}
              >
                작가님 작품부터
              </Button>
            </div>
          </div>
        </div>
      </Root>
    </CSSTransition>
  );
};

export default InvitedModal;
