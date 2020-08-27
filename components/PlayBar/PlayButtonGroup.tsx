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
      color: ${(props) => (props.isFirst ? '#7D7D7D' : 'white')};
    }
    &:hover {
      cursor: ${(props) => (props.isFirst ? 'default' : 'pointer')};
    }
  }
  .right {
    svg {
      color: ${(props) => (props.isLast ? '#7D7D7D' : 'white')};
    }
    &:hover {
      cursor: ${(props) => (props.isLast ? 'default' : 'pointer')};
    }
  }
  .firstPage {
    svg {
      color: ${(props) => (props.pageIndex === 0 ? '#7D7D7D' : 'white')};
    }
    &:hover {
      cursor: ${(props) => (props.pageIndex === 0 ? 'default' : 'pointer')};
    }
  }
  .lastPage {
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
  const pageIndex =
    PAGE_ARRAY.findIndex((elem) => router.pathname === elem) || 0;

  return (
    <Root
      isFirst={!id || id === 1}
      isLast={!id || id === NUM_ARTISTS}
      pageIndex={pageIndex}
    >
      <IconButton
        className="firstPage"
        onClick={() => {
          if (pageIndex > 0) {
            if (pageIndex === 2) {
              router.push('/artist');
            } else {
              router.push(PAGE_ARRAY[pageIndex - 1]);
            }
          }
        }}
      >
        <FirstPage />
      </IconButton>
      <IconButton
        className="left"
        onClick={() => {
          handleLeft();
        }}
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        className="right"
        onClick={() => {
          handleRight();
        }}
      >
        <ChevronRight />
      </IconButton>
      <IconButton
        className="lastPage"
        onClick={() => {
          if (pageIndex < 4) {
            if (pageIndex === 0) {
              router.push('/artist');
            } else {
              router.push(PAGE_ARRAY[pageIndex + 1]);
            }
          }
        }}
      >
        <LastPage />
      </IconButton>
    </Root>
  );
};

export default PlayButtonGroup;
