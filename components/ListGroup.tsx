import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { isIOS } from 'react-device-detect';

import IconButton from '@material-ui/core/IconButton';
import Apps from '@material-ui/icons/Apps';

import { PAGE_ARRAY, COLORS } from '../defines';

import IndexContext from '../IndexContext';

interface RootProps {
  active: boolean;
  disabled: boolean;
}
const Root = styled.div<RootProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  right: 1rem;
  color: ${(props) => {
    if (props.disabled) return COLORS.disabled;
    if (props.active) return COLORS.primary;
    return 'white';
  }};

  &.withLayout {
    flex-direction: row;
  }

  button {
    transition: none;
  }
  svg {
    color: ${(props) => {
      if (props.disabled) return COLORS.disabled;
      if (props.active) return COLORS.primary;
      return 'white';
    }};
    font-size: 1.8rem;
    transition: none;
  }
  &:hover {
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  }
`;

interface Props {
  iconOnly?: boolean;
}
const ListGroup: React.FC<Props> = ({ ...props }) => {
  const router = useRouter();
  const {
    withLayout,
    detailModalFlag,
    setDetailModalFlag,
    listModalFlag,
    setListModalFlag,
  } = React.useContext(IndexContext);
  const disabled = router.pathname !== PAGE_ARRAY[1];

  return (
    <Root
      onClick={() => {
        if (withLayout || isIOS) {
          if (detailModalFlag) setDetailModalFlag(false);
          setListModalFlag(!listModalFlag);
        } else if (router.query.listOpen) {
          // router.push(router.pathname.split('?')[0], undefined, {
          //   shallow: true,
          // });
          router.back();
        } else {
          router.push('?listOpen=1', undefined, { shallow: true });
        }
      }}
      active={listModalFlag}
      disabled={disabled}
      className={withLayout ? 'withLayout' : ''}
      {...props}
    >
      {withLayout && <p className="listText">작품목록</p>}
      <IconButton>
        <Apps />
      </IconButton>
      {!withLayout && <p className="listText">작품목록</p>}
    </Root>
  );
};

export default ListGroup;
