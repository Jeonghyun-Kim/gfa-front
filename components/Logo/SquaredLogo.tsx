import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Root = styled.div`
  margin: 1rem 0;
  width: 40px;
  align-self: center;
  &:hover {
    cursor: pointer;
  }

  img {
    width: 100%;
  }
`;

interface Props {}

const OneLineLogo: React.FC<Props> = ({ ...props }) => {
  return (
    <Root {...props}>
      <Link href="/">
        <img alt="onDisplay" src="/logo/logo-squared.svg" />
      </Link>
    </Root>
  );
};

export default OneLineLogo;
