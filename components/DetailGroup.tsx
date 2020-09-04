import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { isIOS } from 'react-device-detect';

import IconButton from '@material-ui/core/IconButton';
import ExpandLess from '@material-ui/icons/ExpandLess';

import IndexContext from '../IndexContext';

const Root = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 1rem;
  color: 'white';

  p.listText {
    @media screen and (max-width: 1000px) {
      display: none;
    }
  }

  button {
    transition: none;
  }
  svg {
    color: 'white';
    font-size: 1.8rem;
    transition: none;
  }
  &:hover {
    cursor: 'pointer';
  }
`;

interface Props {
  iconOnly?: boolean;
}
const ListGroup: React.FC<Props> = ({ iconOnly = false, ...props }) => {
  const router = useRouter();
  const { withLayout, listModalFlag, setListModalFlag } = React.useContext(
    IndexContext,
  );

  return (
    <Root
      onClick={() => {
        if (withLayout || isIOS) setListModalFlag(!listModalFlag);
        else if (router.query.listOpen) {
          router.back();
        } else {
          router.push('?listOpen=1', undefined, { shallow: true });
        }
      }}
      {...props}
    >
      {!iconOnly && <p className="listText">작품목록</p>}
      <IconButton>
        <ExpandLess />
      </IconButton>
    </Root>
  );
};

export default ListGroup;
