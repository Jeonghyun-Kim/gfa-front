import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { PAGE_ARRAY, NUM_ARTISTS } from '../../defines';

const Root = styled.div`
  width: 250px;
  margin-right: 1rem;
  text-align: right;

  p {
    display: inline;
    font-size: 1rem;
    color: white;
    margin-left: 1rem;
  }

  @media screen and (max-width: 1000px) {
    width: 150px;
  }
`;

interface Props {}

const Status: React.FC<Props> = ({ ...props }) => {
  const router = useRouter();
  const { pathname } = router;
  let content: React.ReactNode = <></>;
  switch (pathname) {
    case PAGE_ARRAY[1]:
      content = (
        <>
          <p>전시장</p>
          <p>
            {router.query.id ?? ''} / {NUM_ARTISTS}
          </p>
        </>
      );
      break;
    case PAGE_ARRAY[2]:
      content = <p>관악미술협회 이야기</p>;
      break;
    case PAGE_ARRAY[3]:
      content = <p>방명록</p>;
      break;
    default:
      content = <></>;
      break;
  }
  return <Root {...props}>{content}</Root>;
};

export default Status;
