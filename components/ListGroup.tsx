import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import Apps from '@material-ui/icons/Apps';

import { PAGE_ARRAY, COLORS } from '../defines';

import IndexContext from '../IndexContext';

interface RootProps {
  disabled: boolean;
}
const Root = styled.div<RootProps>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 1rem;
  color: ${(props) => (props.disabled ? COLORS.disabled : 'white')};

  p.listText {
    @media screen and (max-width: 1000px) {
      display: none;
    }
  }

  button {
    transition: none;
  }
  svg {
    color: ${(props) => (props.disabled ? COLORS.disabled : 'white')};
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
const ListGroup: React.FC<Props> = ({ iconOnly = false, ...props }) => {
  const router = useRouter();
  const { listModalFlag, setListModalFlag } = React.useContext(IndexContext);
  const disabled = router.pathname !== PAGE_ARRAY[1];

  return (
    <Root
      onClick={() => {
        setListModalFlag(!listModalFlag);
      }}
      disabled={disabled}
      {...props}
    >
      {!iconOnly && <p className="listText">작품목록</p>}
      <IconButton>
        <Apps />
      </IconButton>
    </Root>
  );
};

export default ListGroup;
