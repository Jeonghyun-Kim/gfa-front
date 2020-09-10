import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';

import { ISTEST, NUM_ARTISTS, PAGE_ARRAY, COLORS } from '../../defines';

import IndexContext from '../../IndexContext';

interface RootProps {
  artistId: number;
  pageIndex: number;
}
const Root = styled.div<RootProps>`
  button {
    padding: 6px;
    transition: none;
  }
  svg {
    font-size: 2rem;
    color: white;
    transition: none;
  }
  .left {
    svg {
      color: ${(props) => (props.pageIndex === 0 ? COLORS.disabled : 'white')};
    }
    &:hover {
      cursor: ${(props) => (props.pageIndex === 0 ? 'default' : 'pointer')};
    }
  }
  .right {
    svg {
      color: ${(props) =>
        props.pageIndex === PAGE_ARRAY.length - 1 ? COLORS.disabled : 'white'};
    }
    &:hover {
      cursor: ${(props) =>
        props.pageIndex === PAGE_ARRAY.length - 1 ? 'default' : 'pointer'};
    }
  }
  .prevPage {
    svg {
      color: ${(props) =>
        props.pageIndex === 2 && props.artistId !== 1
          ? 'white'
          : COLORS.disabled};
    }
    &:hover {
      cursor: ${(props) =>
        props.pageIndex === 2 && props.artistId !== 1 ? 'pointer' : 'default'};
    }
  }
  .nextPage {
    svg {
      color: ${(props) =>
        props.pageIndex === 2 && props.artistId !== NUM_ARTISTS
          ? 'white'
          : COLORS.disabled};
    }
    &:hover {
      cursor: ${(props) =>
        props.pageIndex === 2 && props.artistId !== NUM_ARTISTS
          ? 'pointer'
          : 'default'};
    }
  }
`;

interface Props {
  handleLeft: () => void;
  handleRight: () => void;
  id: number;
}
const PlayButtonGroup: React.FC<Props> = ({ handleLeft, handleRight, id }) => {
  const router = useRouter();
  const [blocker, setBlocker] = React.useState<boolean>(false);
  const pageIndex =
    PAGE_ARRAY.findIndex((elem) => router.pathname === elem) || 0;

  const {
    setDetailModalFlag,
    setListModalFlag,
    refSlider,
    setIndex,
    lastModal,
    setLastModal,
  } = React.useContext(IndexContext);

  return (
    <Root artistId={id} pageIndex={pageIndex}>
      <IconButton
        className="prevPage"
        onClick={() => {
          if (ISTEST) return;
          if (pageIndex === 2) {
            setDetailModalFlag(false);
            setListModalFlag(false);
            setIndex(1);
            sessionStorage.setItem('@artistId', '1');
            refSlider.current?.slickGoTo(0);
          }
        }}
        disabled={ISTEST || pageIndex !== 2 || id === 1}
      >
        <FirstPage />
      </IconButton>
      <IconButton
        className="left"
        onClick={() => {
          if (!blocker) {
            if (pageIndex === 2 && id !== 1) {
              setDetailModalFlag(false);
              setBlocker(true);
              handleLeft();
              setTimeout(() => setBlocker(false), 100);
            } else if (pageIndex !== 0) {
              router.push(PAGE_ARRAY[pageIndex - 1]);
            }
          }
        }}
        disabled={ISTEST || pageIndex === 0}
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        className="right"
        onClick={() => {
          if (!blocker) {
            if (pageIndex === 2 && id !== NUM_ARTISTS) {
              setDetailModalFlag(false);
              setBlocker(true);
              handleRight();
              setTimeout(() => setBlocker(false), 100);
            } else if (lastModal) {
              setLastModal(false);
              router.push(PAGE_ARRAY[pageIndex + 1]);
            } else if (pageIndex === 2 && id === NUM_ARTISTS) {
              setDetailModalFlag(false);
              setBlocker(true);
              setLastModal(true);
              refSlider.current?.slickNext();
              setTimeout(() => setBlocker(false), 100);
            } else if (pageIndex !== PAGE_ARRAY.length - 1) {
              router.push(PAGE_ARRAY[pageIndex + 1]);
            }
          }
        }}
        disabled={ISTEST || pageIndex === PAGE_ARRAY.length - 1}
      >
        <ChevronRight />
      </IconButton>
      <IconButton
        className="nextPage"
        onClick={() => {
          if (ISTEST) return;
          if (pageIndex === 2) {
            setDetailModalFlag(false);
            setListModalFlag(false);
            setIndex(NUM_ARTISTS);
            sessionStorage.setItem('@artistId', `${NUM_ARTISTS}`);
            refSlider.current?.slickGoTo(NUM_ARTISTS - 1);
          }
        }}
        disabled={ISTEST || pageIndex !== 2 || id === NUM_ARTISTS}
      >
        <LastPage />
      </IconButton>
    </Root>
  );
};

export default PlayButtonGroup;
