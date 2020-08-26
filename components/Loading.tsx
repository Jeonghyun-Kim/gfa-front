import React from 'react';
import styled from 'styled-components';

const LoadingRoot = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;

interface Props {}

const Loading: React.FC<Props> = ({ ...props }) => {
  return (
    <LoadingRoot {...props}>
      <div>loading...</div>
    </LoadingRoot>
  );
};

export default Loading;
