import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import ExitToApp from '@material-ui/icons/ExitToApp';

import SimpleInfo from './PlayBar/SimpleInfo';
import ProgressBar from './ProgressBar';
import ListGroup from './ListGroup';
import DetailGroup from './DetailGroup';

import { checkLength } from '../lib/utils';

import IndexContext from '../IndexContext';

const Root = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 105px;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const ArtworkInfo = styled(SimpleInfo)`
  position: absolute;
  bottom: 15px;
  left: 45px;
  width: fit-content;

  p.title {
    color: white;
    font-size: 1rem;
  }
`;

const MyProgressBar = styled(ProgressBar)`
  top: initial;
  bottom: 0;
`;

const MyListGroup = styled(ListGroup)`
  left: 0;
  bottom: 13px;
  width: fit-content;

  .listText {
    margin: 0;
    margin-top: -13px;
    font-size: 0.7rem;
  }

  svg {
    font-size: 34px;
  }
`;

const MyDetailGroup = styled(DetailGroup)``;

const NextGroup = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  right: 0;
  bottom: 13px;
  color: white;

  svg {
    color: white;
    font-size: 34px;
  }

  .nextText {
    margin: 0;
    margin-top: -13px;
    font-size: 0.7rem;
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
  const router = useRouter();
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
      <MyDetailGroup />
      <NextGroup onClick={() => router.push('/video')}>
        <IconButton>
          <ExitToApp />
        </IconButton>
        <p className="nextText">소개영상</p>
      </NextGroup>
    </>
  );
};

export default MobileFooter;
