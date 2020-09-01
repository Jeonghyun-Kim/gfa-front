import React from 'react';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';

import ArtistLists from './ArtistLists';

import useWindowSize from '../../lib/hooks/useWindowSize';

import IndexContext from '../../IndexContext';

const GAP = 3;

const Root = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 99;

  .container {
    position: relative;
  }

  .modalHeader {
    position: fixed;
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
  position: absolute;
  top: 46px;
  overflow-y: hidden;
`;

interface Props {
  artists: Artist[];
}
const AristsModal: React.FC<Props> = ({ artists, ...props }) => {
  const { innerWidth } = useWindowSize();
  const { index, setListModalFlag, refMain } = React.useContext(IndexContext);
  const [flag, setFlag] = React.useState<boolean>(true);
  const baseSize = Math.floor((innerWidth - 2 * GAP) / 3);

  React.useEffect(() => {
    if (flag && refMain.current) {
      refMain.current.scroll(
        0,
        Math.floor((index - 1) / 3 - 1) * (baseSize + GAP),
      );
      // make autoscroll active only once (first mounted)
      setTimeout(() => setFlag(false), 0);
    }
  }, [refMain.current]);

  return (
    <Root {...props}>
      <div className="container unselectable">
        <div className="modalHeader">
          <IconButton
            onClick={() => {
              setListModalFlag(false);
            }}
          >
            <Close />
          </IconButton>
          <h4>작품 목록</h4>
        </div>
        <MyArtistLists artists={artists} size={baseSize} gap={`${GAP}px`} />
      </div>
    </Root>
  );
};

export default AristsModal;
