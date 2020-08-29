import React from 'react';
import styled from 'styled-components';

import Status from './PlayBar/PlayBarStatus';
import ButtonGroup from './PlayBar/PlayButtonGroup';
import SimpleInfo from './PlayBar/SimpleInfo';
import ListGroup from './PlayBar/ListGroup';

import { checkLength } from '../lib/utils';

import { COLORS, NUM_ARTISTS } from '../defines';

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

interface Props {
  visible?: boolean;
}
const PlayBar: React.FC<Props> = ({ visible = true, ...props }) => {
  const { index, setIndex, refSlider } = React.useContext(IndexContext);
  const { artist, title } = ArtworkData.find((artwork) => {
    return artwork.artistId === index;
  }) || { artist: '', title: '' };

  if (!visible) return <></>;

  const handleLeft = () => {
    if (index > 1) {
      setIndex(index - 1);
      refSlider.current?.slickPrev();
      sessionStorage.setItem('@artistId', `${index - 1}`);
    }
  };

  const handleRight = () => {
    if (index < NUM_ARTISTS) {
      setIndex(index + 1);
      refSlider.current?.slickNext();
      sessionStorage.setItem('@artistId', `${index + 1}`);
    }
  };

  return (
    <Root {...props}>
      <ProgressBar index={index} />
      <Status index={index} />
      <ButtonGroup
        handleLeft={handleLeft}
        handleRight={handleRight}
        id={index}
      />
      <SimpleInfo
        artworkData={{ artist, title }}
        animation={!checkLength(title, 25)}
      />
      <ListGroup />
    </Root>
  );
};

export default PlayBar;
