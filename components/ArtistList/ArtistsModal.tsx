import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';

import ArtistLists from './ArtistLists';

import useWindowSize from '../../lib/hooks/useWindowSize';

import { MOBILE_GAP } from '../../defines';

import IndexContext from '../../IndexContext';

const Root = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 99;

  .container {
    /* position: absolute; */
    /* width: 100%; */
    position: relative;
    height: 100%;
    background-color: white;
    overflow: auto;
    scroll-behavior: smooth;

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none;
    scrollbar-width: none;

    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
      /* display: none; */
      scrollbar-width: auto;
    }
  }

  .modalHeader {
    /* position: fixed; */
    position: absolute;
    top: 0px;
    width: 100%;
    height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ededed;
    box-shadow: rgba(0, 0, 0, 0.16) 0 3px 6px;
    z-index: 999;

    svg {
      font-size: 1.8rem;
    }

    button {
      position: absolute;
      left: 0;
    }
  }
`;

const MyArtistLists = styled(ArtistLists)`
  /* position: relative; */
  position: absolute;
  top: 46px;
  overflow: hidden;
`;

interface Props {
  artists: Artist[];
}
const AristsModal: React.FC<Props> = ({ artists, ...props }) => {
  const router = useRouter();
  const { innerWidth } = useWindowSize();
  const { index } = React.useContext(IndexContext);
  const [flag, setFlag] = React.useState<boolean>(true);
  const baseSize = Math.floor((innerWidth - 2 * MOBILE_GAP) / 3);

  const refContainer = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (flag && refContainer.current) {
      refContainer.current.scroll(
        0,
        Math.floor((index - 1) / 3 - 1) * (baseSize + MOBILE_GAP),
      );
      // make autoscroll active only once (first mounted)
      setTimeout(() => setFlag(false), 0);
    }
  }, [refContainer.current]);

  return (
    <Root {...props}>
      <div className="modalHeader">
        <IconButton
          onClick={() => {
            // setListModalFlag(false);
            // router.replace(router.pathname.split('?')[0], undefined, {
            //   shallow: true,
            // });
            router.back();
          }}
        >
          <Close />
        </IconButton>
        <h4>작품 목록</h4>
      </div>
      <div ref={refContainer} className="container unselectable">
        <MyArtistLists
          artists={artists}
          size={baseSize}
          gap={`${MOBILE_GAP}px`}
        />
      </div>
    </Root>
  );
};

export default AristsModal;
