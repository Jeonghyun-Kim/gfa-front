import React from 'react';
import styled from 'styled-components';

import Status from './PlayBar/PlayBarStatus';
import ButtonGroup from './PlayBar/PlayButtonGroup';
import SimpleInfo from './PlayBar/SimpleInfo';
import ListGroup from './ListGroup';
import ProgressBar from './ProgressBar';

import { checkLength } from '../lib/utils';

import { NUM_ARTISTS } from '../defines';

import IndexContext from '../IndexContext';

import ArtworkData from '../artworks.json';

const Root = styled.div`
  position: relative;
  grid-column: 1 / 3;
  grid-row: 2 / 3;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #222222f7;
  z-index: 9;
`;

interface Props {
  className?: string | undefined;
}
const PlayBar: React.FC<Props> = ({ className = undefined, ...props }) => {
  const { index, setIndex, refSlider } = React.useContext(IndexContext);
  const { artist, title } = ArtworkData.find((artwork) => {
    return artwork.artistId === index;
  }) || { artist: '', title: '' };

  const handleLeft = () => {
    if (index > 1) {
      if (refSlider.current) refSlider.current.slickPrev();
      else console.error('No refSlider');
      sessionStorage.setItem('@artistId', `${index - 1}`);
      setIndex(index - 1);
    }
  };

  const handleRight = () => {
    if (index < NUM_ARTISTS) {
      if (refSlider.current) refSlider.current.slickNext();
      else console.error('No refSlider');
      sessionStorage.setItem('@artistId', `${index + 1}`);
      setIndex(index + 1);
    }
  };

  return (
    <Root {...props} className={`unselectable ${className}`}>
      <ProgressBar index={index} />
      <Status index={index} />
      <ButtonGroup
        handleLeft={handleLeft}
        handleRight={handleRight}
        id={index}
      />
      <SimpleInfo
        artworkData={{ artist, title }}
        animation={!checkLength(title, 35)}
      />
      <ListGroup />
    </Root>
  );
};

export default PlayBar;
