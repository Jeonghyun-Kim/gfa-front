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
  isFirst: boolean;
  isLast: boolean;
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
      color: ${(props) =>
        props.isFirst || props.pageIndex !== 1 ? COLORS.disabled : 'white'};
    }
    &:hover {
      cursor: ${(props) => (props.isFirst ? 'default' : 'pointer')};
    }
  }
  .right {
    svg {
      color: ${(props) =>
        props.isLast || props.pageIndex !== 1 ? COLORS.disabled : 'white'};
    }
    &:hover {
      cursor: ${(props) => (props.isLast ? 'default' : 'pointer')};
    }
  }
  .prevPage {
    svg {
      color: ${(props) => (props.pageIndex === 0 ? COLORS.disabled : 'white')};
    }
    &:hover {
      cursor: ${(props) => (props.pageIndex === 0 ? 'default' : 'pointer')};
    }
  }
  .nextPage {
    svg {
      color: ${(props) => (props.pageIndex === 4 ? COLORS.disabled : 'white')};
    }
    &:hover {
      cursor: ${(props) => (props.pageIndex === 4 ? 'default' : 'pointer')};
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

  const { setDetailModalFlag } = React.useContext(IndexContext);

  return (
    <Root isFirst={id === 1} isLast={id === NUM_ARTISTS} pageIndex={pageIndex}>
      <IconButton
        className="prevPage"
        onClick={() => {
          setDetailModalFlag(false);
          if (!ISTEST) router.push(PAGE_ARRAY[pageIndex - 1]);
        }}
        disabled={ISTEST || pageIndex === 0}
      >
        <FirstPage />
      </IconButton>
      <IconButton
        className="left"
        onClick={() => {
          if (!blocker) {
            setDetailModalFlag(false);
            setBlocker(true);
            handleLeft();
            setTimeout(() => setBlocker(false), 100);
          }
        }}
        disabled={pageIndex !== 1 || id === 1}
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        className="right"
        onClick={() => {
          if (!blocker) {
            setDetailModalFlag(false);
            setBlocker(true);
            handleRight();
            setTimeout(() => setBlocker(false), 100);
          }
        }}
        disabled={pageIndex !== 1 || id === NUM_ARTISTS}
      >
        <ChevronRight />
      </IconButton>
      <IconButton
        className="nextPage"
        onClick={() => {
          setDetailModalFlag(false);
          if (!ISTEST) router.push(PAGE_ARRAY[pageIndex + 1]);
        }}
        disabled={ISTEST || pageIndex === PAGE_ARRAY.length - 1}
      >
        <LastPage />
      </IconButton>
    </Root>
  );
};

export default PlayButtonGroup;
