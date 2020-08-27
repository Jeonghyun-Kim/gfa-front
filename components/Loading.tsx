import React from 'react';
import styled from 'styled-components';

const LoadingRoot = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;

interface Props {
  children?: React.ReactNode;
}

const Loading: React.FC<Props> = ({ children, ...props }) => {
  return (
    <LoadingRoot {...props}>
      <div>{children ?? 'loading...'}</div>
    </LoadingRoot>
  );
};

export default Loading;
