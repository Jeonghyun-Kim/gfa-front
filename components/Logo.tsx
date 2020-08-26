import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Root = styled.div`
  img {
    width: 6rem;
    object-fit: contain;
  }
`;

interface Props {}

const Logo: React.FC<Props> = ({ ...props }) => {
  return (
    <Root {...props}>
      <Link href="/">
        <a>
          <img className="logo" src="/images/logo.png" alt="logo" />
        </a>
      </Link>
    </Root>
  );
};

export default Logo;
