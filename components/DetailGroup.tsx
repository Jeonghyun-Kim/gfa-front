import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useSwipeable } from 'react-swipeable';
import { isIOS } from 'react-device-detect';

import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import DesktopDetailIcon from '../public/icons/go_down.svg';
import MobileDetailIcon from '../public/icons/mobile_detail.svg';

import useWindowSize from '../lib/hooks/useWindowSize';

import { PLAYBAR_HEIGHT } from '../defines';

import IndexContext from '../IndexContext';

const Root = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);

  .detailText {
    color: white;
    font-size: 0.9rem;
    margin: 0;
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  }

  button {
    padding: 3px;
    z-index: 5;

    svg {
      color: white;
      font-size: 2rem;
      height: 20px;
    }
  }
  &:hover {
    cursor: 'pointer';
  }
`;

const DetailGroup: React.FC = ({ ...props }) => {
  const router = useRouter();
  const { innerHeight } = useWindowSize();
  const {
    withLayout,
    refMain,
    setDetailModalFlag,
    lastModal,
  } = React.useContext(IndexContext);

  const handleDetailOpen = () => {
    if (withLayout || isIOS) {
      setDetailModalFlag(true);
    } else if (!router.query.detailOpen) {
      router.push(`?detailOpen=1`, undefined, {
        shallow: true,
      });
    }
  };

  const handleSwipe = useSwipeable({
    onSwiped: (e) => {
      if (e.dir === 'Up') {
        handleDetailOpen();
      }
    },
  });

  if (lastModal) return <Root />;

  return (
    <Root
      className="unselectable"
      onClick={() => {
        if (!lastModal) {
          if (withLayout || isIOS) setDetailModalFlag(true);
          else if (!router.query.listOpen) {
            router.push('?detailOpen=1', undefined, { shallow: true });
          }
          refMain.current?.scroll({
            behavior: 'smooth',
            top: innerHeight - PLAYBAR_HEIGHT,
            left: 0,
          });
        }
      }}
      {...handleSwipe}
      {...props}
    >
      {!withLayout && (
        <IconButton>
          <SvgIcon component={MobileDetailIcon} viewBox="0 0 32.2 13.3" />
        </IconButton>
      )}
      <p className={`detailText ${withLayout && 'withLayout'}`}>
        작가 작품 더보기
      </p>
      {withLayout && (
        <IconButton>
          <SvgIcon component={DesktopDetailIcon} viewBox="0 0 56.9 22.1" />
        </IconButton>
      )}
    </Root>
  );
};

export default DetailGroup;
