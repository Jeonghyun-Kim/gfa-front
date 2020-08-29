import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Root = styled.div`
  width: 250px;
  margin-left: 1rem;
  text-align: left;
  p {
    font-size: 1rem;
    line-height: 1.5;
    margin: 0;
  }
  .name {
    color: white;
  }
  .title {
    color: #b1b1b1;
  }

  @media screen and (max-width: 1000px) {
    width: 150px;
    p {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
`;

interface Props {
  artworkData: { artistName: string; title: string };
}
const SimpleInfo: React.FC<Props> = ({ artworkData, ...props }) => {
  const router = useRouter();
  const { artistName, title } = artworkData;
  return (
    <Root {...props}>
      {router.pathname === '/artist' && (
        <>
          <p className="name">{artistName}</p>
          <p className="title">{title}</p>
        </>
      )}
    </Root>
  );
};

export default SimpleInfo;
