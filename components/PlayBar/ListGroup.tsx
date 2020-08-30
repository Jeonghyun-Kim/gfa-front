import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import Apps from '@material-ui/icons/Apps';

import { PAGE_ARRAY, COLORS } from '../../defines';

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
  const disabled = router.pathname !== PAGE_ARRAY[1];

  return (
    <Root disabled={disabled} {...props}>
      {!iconOnly && <p>작품목록</p>}
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          console.log('hello world!');
        }}
        disabled={disabled}
      >
        <Apps />
      </IconButton>
    </Root>
  );
};

export default ListGroup;
