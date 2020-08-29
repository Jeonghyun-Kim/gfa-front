import React from 'react';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import Apps from '@material-ui/icons/Apps';

const Root = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 1rem;
  color: white;
  button {
    transition: none;
  }
  svg {
    color: white;
    font-size: 1.8rem;
    transition: none;
  }
  &:hover {
    cursor: pointer;
  }
`;

interface Props {
  iconOnly?: boolean;
}

const ListGroup: React.FC<Props> = ({ iconOnly = false, ...props }) => {
  return (
    <Root {...props}>
      {!iconOnly && <p>작품목록</p>}
      <IconButton
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <Apps />
      </IconButton>
    </Root>
  );
};

export default ListGroup;
