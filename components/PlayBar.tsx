import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Apps from '@material-ui/icons/Apps';

import { COLORS, MOBILE_BREAKPOINT, NUM_ARTISTS } from '../defines';

import ArtworkData from '../artworks.json';

const PAGE_ARRAY = ['/', '/artist/[id]', '/video', '/visitor', '/about'];

const Root = styled.div`
  position: relative;
  grid-column: 1 / 3;
  grid-row: 2 / 3;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #222222f7;

  .nameAndTitle {
    width: 200px;
    margin-left: 1rem;
    text-align: left;
    p {
      display: inline;
      font-size: 1rem;
    }
    .name {
      color: white;
    }
    .title {
      color: #b1b1b1;
    }
  }

  .status {
    width: 200px;
    margin-right: 1rem;
    text-align: right;

    p {
      display: inline;
      font-size: 1rem;
      color: white;
      margin-left: 1rem;
    }
  }

  .listGroup {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 1rem;

    color: white;

    svg {
      color: white;
      font-size: 1.8rem;
    }

    &:hover {
      cursor: pointer;
    }
  }

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    display: none;
  }
`;

interface ButtonGroupProps {
  isFirst: boolean;
  isLast: boolean;
  pageIndex: number;
}
const ButtonGroup = styled.div<ButtonGroupProps>`
  button {
    padding: 6px;
  }
  svg {
    font-size: 2rem;
    color: white;
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

interface PlayBarButtonGroputProps {
  handleLeft: () => void;
  handleRight: () => void;
  id?: number;
}
const PlayBarButtonGroup: React.FC<PlayBarButtonGroputProps> = ({
  handleLeft,
  handleRight,
  id = 0,
}) => {
  const router = useRouter();
  const pageIndex =
    PAGE_ARRAY.findIndex((elem) => router.pathname === elem) || 0;

  return (
    <ButtonGroup
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
    </ButtonGroup>
  );
};

interface ProgressBarProps {
  index: number;
}
const ProgressBar = styled.div<ProgressBarProps>`
  position: absolute;
  top: 0;
  left: 0;
  height: 5px;
  border-radius: 10px;
  background-color: ${COLORS.primary};
  transition: width 300ms ease;
  width: ${(props) => (100 * props.index) / NUM_ARTISTS}%;
`;

interface Props {}
const PlayBar: React.FC<Props> = ({ ...props }) => {
  const router = useRouter();
  const [index, setIndex] = React.useState<number | null>(null);
  React.useEffect(() => {
    const item = sessionStorage.getItem('@artistId');
    setIndex(item ? Number(item) : null);
  }, []);

  const { id } = router.query;
  const numId = id ? Number(id) : 0;
  const { artist: artistName, title } = ArtworkData.find((artwork) => {
    return artwork.artistId === numId;
  }) || { artist: '', title: '' };

  const handleLeft = () => {
    if (numId > 1) {
      router.push(`/artist/${numId - 1}`);
      sessionStorage.setItem('@artistId', `${numId - 1}`);
    }
  };

  const handleRight = () => {
    if (numId < NUM_ARTISTS) {
      router.push(`/artist/${numId + 1}`);
      sessionStorage.setItem('@artistId', `${numId + 1}`);
    }
  };

  return (
    <Root {...props}>
      <ProgressBar index={numId} />
      <div className="status">
        <p>전시장</p>
        <p>
          {index} / {NUM_ARTISTS}
        </p>
      </div>
      <PlayBarButtonGroup
        handleLeft={handleLeft}
        handleRight={handleRight}
        id={numId}
      />
      <div className="nameAndTitle">
        <p className="name">{artistName}</p>
        <br />
        <p className="title">{title}</p>
      </div>
      <div className="listGroup">
        작품목록
        <IconButton>
          <Apps />
        </IconButton>
      </div>
    </Root>
  );
};

export default PlayBar;
