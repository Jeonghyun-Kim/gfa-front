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

const OneLineLogo: React.FC = ({ ...props }) => {
  return (
    <Root {...props}>
      <Link href="/">
        <img alt="onDP" src="/logo/logo-squared-with-dot.svg" />
      </Link>
    </Root>
  );
};

export default OneLineLogo;
