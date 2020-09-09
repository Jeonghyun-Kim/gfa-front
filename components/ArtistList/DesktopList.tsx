import React from 'react';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';

import ArtistLists from './ArtistLists';

import useWindowSize from '../../lib/hooks/useWindowSize';

import { PLAYBAR_HEIGHT, DESKTOP_GAP, CONTAINER_WIDTH } from '../../defines';

import IndexContext from '../../IndexContext';

interface RootProps {
  width: number;
}
const Root = styled.div<RootProps>`
  position: absolute;
  top: 100px;
  width: ${(props) => props.width}px;
  height: calc(100% - 100px);
  right: calc((100% - ${(props) => props.width}px) / 2);
  z-index: 5;

  .modalHeader {
    position: absolute;
    top: -60px;
    display: flex;
    width: ${(props) => props.width}px;
    height: 60px;
    border-bottom: 2px solid #686868;
    z-index: 99;

    .title {
      transform: translateY(5px);
      margin: 0;
      margin-right: 1rem;
      color: white;
      font-size: 1.5rem;
      vertical-align: bottom;
    }

    .order {
      margin-top: 16px;
      display: flex;
      align-items: center;
      height: 25px;
      background-color: white;
      border-radius: 100px;
      padding: 0 10px;
      font-size: 0.8rem;
    }

    .closeButton {
      position: absolute;
      right: 0;
      padding-right: 0;
      svg {
        font-size: 1.8rem;
        color: #b1b1b1;
      }
    }
  }

  .container {
    position: relative;
    overflow-y: auto;
    height: 100%;
    scroll-behavior: smooth;

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const DarkBackground = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: calc(100% - ${PLAYBAR_HEIGHT}px);
  background-color: #000;
  opacity: 0.85;
  z-index: 3;
`;

const MyArtistLists = styled(ArtistLists)`
  position: absolute;
  overflow: hidden;
  margin-top: 20px;
  margin-bottom: 50px;
`;

interface Props {
  artists: Artist[];
}
const DesktopList: React.FC<Props> = ({ artists, ...props }) => {
  const { innerWidth } = useWindowSize();
  const containerWidth =
    innerWidth > CONTAINER_WIDTH + 300 ? CONTAINER_WIDTH : innerWidth - 300;
  const { index, setListModalFlag } = React.useContext(IndexContext);
  const [flag, setFlag] = React.useState<boolean>(true);
  const baseSize = Math.floor((containerWidth - 2 * DESKTOP_GAP) / 3);

  const refContainer = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (flag && refContainer.current) {
      refContainer.current.scroll({
        behavior: 'smooth',
        left: 0,
        top: Math.floor((index - 1) / 3) * (baseSize + DESKTOP_GAP) - 100,
      });
      // make autoscroll active only once (first mounted)
      setTimeout(() => setFlag(false), 0);
    }
  }, [baseSize, flag, index]);

  return (
    <>
      <Root width={containerWidth} {...props}>
        <div className="modalHeader unselectable">
          <h4 className="title">작품 목록</h4>
          <div className="order">
            <p>전시순</p>
          </div>
          <IconButton
            className="closeButton"
            onClick={() => {
              setListModalFlag(false);
            }}
          >
            <Close />
          </IconButton>
        </div>
        <div ref={refContainer} className="container unselectable">
          <MyArtistLists
            artists={artists}
            size={baseSize}
            gap={`${DESKTOP_GAP}px`}
            withName
            hoverEffect
          />
        </div>
      </Root>
      <DarkBackground />
    </>
  );
};

export default DesktopList;
