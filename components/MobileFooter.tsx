import React from 'react';
import styled from 'styled-components';

import SimpleInfo from './PlayBar/SimpleInfo';
import ProgressBar from './ProgressBar';
import ListGroup from './ListGroup';

import { checkLength } from '../lib/utils';

import IndexContext from '../IndexContext';

const Root = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 7rem;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const ArtworkInfo = styled(SimpleInfo)`
  position: absolute;
  bottom: 3rem;
  left: 0rem;
  transform: translate(0, 50%);
  width: 300px;

  p.title {
    font-size: 1.2rem;
  }
`;

const MyProgressBar = styled(ProgressBar)`
  top: initial;
  bottom: 0;
`;

const MyListGroup = styled(ListGroup)`
  right: 0rem;
  bottom: 0.5rem;
  svg {
    font-size: 2.1rem;
  }
`;

interface Props {
  artworkData: Artwork;
  onClick?: () => void;
}
const MobileFooter: React.FC<Props> = ({
  artworkData,
  onClick = () => {},
  ...props
}) => {
  const { index } = React.useContext(IndexContext);

  return (
    <>
      <Root onClick={() => onClick()} {...props}>
        <ArtworkInfo
          artworkData={artworkData}
          animation={!checkLength(artworkData.title, 30)}
        />
      </Root>
      <MyProgressBar index={index} />
      <MyListGroup iconOnly />
    </>
  );
};

export default MobileFooter;
