import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { isIOS } from 'react-device-detect';

import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import DesktopDetailIcon from '../public/icons/go_down.svg';
import MobileDetailIcon from '../public/icons/mobile_detail.svg';

import IndexContext from '../IndexContext';

const Root = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: 'white';
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);

  .detailText {
    color: white;
    font-size: 0.9rem;
    margin: 0;
    margin-top: -5px;
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  }

  button {
    padding: 3px;
  }

  svg {
    color: white;
    font-size: 2rem;
  }
  &:hover {
    cursor: 'pointer';
  }
`;

const DetailGroup: React.FC = ({ ...props }) => {
  const router = useRouter();
  const { withLayout, detailModalFlag, setDetailModalFlag } = React.useContext(
    IndexContext,
  );

  return (
    <Root
      onClick={() => {
        if (withLayout || isIOS) setDetailModalFlag(!detailModalFlag);
        else if (router.query.listOpen) {
          router.back();
        } else {
          router.push('?detailOpen=1', undefined, { shallow: true });
        }
      }}
      {...props}
    >
      {!withLayout && (
        <IconButton>
          <SvgIcon component={MobileDetailIcon} viewBox="0 0 32.2 13.3" />
        </IconButton>
      )}
      <p className={`detailText ${withLayout && 'withLayout'}`}>자세히 보기</p>
      {withLayout && (
        <IconButton>
          <SvgIcon component={DesktopDetailIcon} viewBox="0 0 56.9 22.1" />
        </IconButton>
      )}
    </Root>
  );
};

export default DetailGroup;
