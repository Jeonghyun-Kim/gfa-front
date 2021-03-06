import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { PAGE_ARRAY, NUM_ARTISTS } from '../../defines';

import IndexContext from '../../IndexContext';

const Root = styled.div`
  width: 250px;
  margin-right: 1rem;
  text-align: right;

  p {
    display: inline-block;
    font-size: 1rem;
    color: white;
    margin-left: 1rem;
  }
`;

interface Props {
  index?: number;
}

const Status: React.FC<Props> = ({ index, ...props }) => {
  const router = useRouter();
  const { pathname } = router;
  const { lastModal } = React.useContext(IndexContext);
  let content: React.ReactNode = <></>;
  switch (pathname) {
    case PAGE_ARRAY[1]:
      content = <p>전시소개</p>;
      break;
    case PAGE_ARRAY[2]:
      content = !lastModal ? (
        <>
          <p style={{ width: 70 }}>전시장</p>
          <p style={{ width: 70 }}>
            {index} / {NUM_ARTISTS}
          </p>
        </>
      ) : (
        <></>
      );
      break;
    case PAGE_ARRAY[3]:
      content = <p>방명록</p>;
      break;
    case PAGE_ARRAY[4]:
      content = <p>onDisplay</p>;
      break;
    default:
      content = <></>;
      break;
  }
  return <Root {...props}>{content}</Root>;
};

export default Status;
