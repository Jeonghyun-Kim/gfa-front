import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import ScrollLock from 'react-scrolllock';
import { CSSTransition } from 'react-transition-group';

import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import Curator from '../../public/icons/curator.svg';

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
      position: relative;
      height: 80px;
      background-color: #ededed;
      border-radius: 10px 10px 0 0;
      svg {
        position: absolute;
        width: 95px;
        height: 95px;
        bottom: -3px;
        left: 50%;
        transform: translate(-50%, 0);
      }
    }
    .bottom {
      height: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .grow {
        flex-grow: 1;
      }
      & > p {
        margin: 0;
      }
      .situation {
        color: #686868;
        font-size: 0.75rem;
        font-weight: 500;
        margin-bottom: 5px;
      }
      .question {
        font-weight: 500;
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
            font-weight: 500;
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
        svg {
          bottom: -5px;
          width: 150px;
          height: 150px;
        }
      }
      .bottom {
        height: 310px;
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
          <div className="top">
            <SvgIcon component={Curator} viewBox="0 0 300 300" />
          </div>
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
