import React from 'react';
import styled from 'styled-components';

import SimpleInfo from './PlayBar/SimpleInfo';
import ListGroup from './PlayBar/ListGroup';
import ProgressBar from './ProgressBar';

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
  bottom: 3.5rem;
  left: 0.5rem;
  transform: translate(0, 50%);
  width: 100px;

  p.title {
    font-size: 1.2rem;
  }
`;

const MyListGroup = styled(ListGroup)`
  right: 0.5rem;
  bottom: 0.5rem;
  svg {
    font-size: 2.1rem;
  }
`;

const MyProgressBar = styled(ProgressBar)`
  top: initial;
  bottom: 0;
`;

interface Props {
  artworkData?: ArtworkJson;
  visible?: boolean;
  onClick?: () => void;
}
const MobileFooter: React.FC<Props> = ({
  artworkData = { artist: '', title: '' },
  visible = false,
  onClick = () => {},
  ...props
}) => {
  const { index } = React.useContext(IndexContext);
  if (!visible) return <></>;
  return (
    <>
      <Root onClick={() => onClick()} {...props}>
        <ArtworkInfo
          artworkData={artworkData as ArtworkData}
          animation={!checkLength(artworkData.title, 10)}
        />
      </Root>
      <MyProgressBar index={index} />
      <MyListGroup iconOnly />
    </>
  );
};

export default MobileFooter;
