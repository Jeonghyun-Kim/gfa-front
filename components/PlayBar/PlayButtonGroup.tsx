import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';

import { NUM_ARTISTS, PAGE_ARRAY } from '../../defines';

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
        props.isFirst || props.pageIndex !== 1 ? '#7D7D7D' : 'white'};
    }
    &:hover {
      cursor: ${(props) => (props.isFirst ? 'default' : 'pointer')};
    }
  }
  .right {
    svg {
      color: ${(props) =>
        props.isLast || props.pageIndex !== 1 ? '#7D7D7D' : 'white'};
    }
    &:hover {
      cursor: ${(props) => (props.isLast ? 'default' : 'pointer')};
    }
  }
  .prevPage {
    svg {
      color: ${(props) => (props.pageIndex === 0 ? '#7D7D7D' : 'white')};
    }
    &:hover {
      cursor: ${(props) => (props.pageIndex === 0 ? 'default' : 'pointer')};
    }
  }
  .nextPage {
    svg {
      color: ${(props) => (props.pageIndex === 4 ? '#7D7D7D' : 'white')};
    }
    &:hover {
      cursor: ${(props) => (props.pageIndex === 4 ? 'default' : 'pointer')};
    }
  }
`;

interface Props {
  handleLeft: () => void;
  handleRight: () => void;
  id?: number;
}
const PlayButtonGroup: React.FC<Props> = ({
  handleLeft,
  handleRight,
  id = 0,
}) => {
  const router = useRouter();
  const [blocker, setBlocker] = React.useState<boolean>(false);
  const pageIndex =
    PAGE_ARRAY.findIndex((elem) => router.pathname === elem) || 0;

  return (
    <Root
      isFirst={!id || id === 1}
      isLast={!id || id === NUM_ARTISTS}
      pageIndex={pageIndex}
    >
      <IconButton
        className="prevPage"
        onClick={() => {
          router.push(PAGE_ARRAY[pageIndex - 1]);
        }}
        disabled={pageIndex === 0}
      >
        <FirstPage />
      </IconButton>
      <IconButton
        className="left"
        onClick={() => {
          if (!blocker) {
            setBlocker(true);
            handleLeft();
            setTimeout(() => setBlocker(false), 100);
          }
        }}
        disabled={pageIndex !== 1}
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        className="right"
        onClick={() => {
          if (!blocker) {
            setBlocker(true);
            handleRight();
            setTimeout(() => setBlocker(false), 100);
          }
        }}
        disabled={pageIndex !== 1}
      >
        <ChevronRight />
      </IconButton>
      <IconButton
        className="nextPage"
        onClick={() => {
          router.push(PAGE_ARRAY[pageIndex + 1]);
        }}
        disabled={pageIndex === PAGE_ARRAY.length - 1}
      >
        <LastPage />
      </IconButton>
    </Root>
  );
};

export default PlayButtonGroup;
