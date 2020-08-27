import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Status from './PlayBar/PlayBarStatus';
import ButtonGroup from './PlayBar/PlayButtonGroup';
import SimpleInfo from './PlayBar/SimpleInfo';
import ListGroup from './PlayBar/ListGroup';

import { COLORS, MOBILE_BREAKPOINT, NUM_ARTISTS } from '../defines';

import ArtworkData from '../artworks.json';

const Root = styled.div`
  position: relative;
  grid-column: 1 / 3;
  grid-row: 2 / 3;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #222222f7;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    display: none;
  }
`;

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
      <Status />
      <ButtonGroup
        handleLeft={handleLeft}
        handleRight={handleRight}
        id={numId}
      />
      <SimpleInfo artworkData={{ artistName, title }} />
      <ListGroup />
    </Root>
  );
};

export default PlayBar;
