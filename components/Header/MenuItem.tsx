import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

import { COLORS } from '../../defines';

interface RootProps {
  current?: boolean;
}
const Root = styled.a<RootProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 100%;
  margin: 0 0.2rem;
  font-size: 0.8rem;
  font-weight: ${(props) => (props.current ? '500' : 'normal')};
  color: ${(props) => (props.current ? COLORS.primary : '#676F7F')};
  border-color: ${COLORS.primary} !important;
  border-bottom: ${(props) => (props.current ? '5px solid' : 'none')};

  &:hover {
    cursor: ${(props) => (props.current ? 'default' : 'pointer')};
    opacity: ${(props) => (props.current ? 1 : 0.7)};
  }
`;

interface Props {
  children: React.ReactNode;
  href: string;
}
const MenuItem: React.FC<Props> = ({ href, children, ...props }) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <Root current={router.pathname === href} {...props}>
        <p>{children}</p>
      </Root>
    </Link>
  );
};

export default MenuItem;
