import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Logo from '../../public/logo/logo-one-line.svg';

const Root = styled.div`
  margin: 1rem 0;
  width: 150px;
  align-self: center;
  &:hover {
    cursor: pointer;
  }

  button {
    padding: 0;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
    -khtml-border-radius: 0;
  }

  svg {
    width: 143px;
    height: 30px;
    color: white;
    font-size: 100px;
  }
`;

interface Props {
  href?: string;
}
const OneLineLogo: React.FC<Props> = ({ href, ...props }) => {
  if (href)
    return (
      <Root className="logo" {...props}>
        <a href={href} target="_blank" rel="noreferrer">
          <IconButton>
            <SvgIcon component={Logo} viewBox="0 0 1175.09 255.33" />
          </IconButton>
        </a>
      </Root>
    );

  return (
    <Root className="logo" {...props}>
      <Link href={href ?? '/'}>
        <IconButton>
          <SvgIcon component={Logo} viewBox="0 0 1175.09 255.33" />
        </IconButton>
      </Link>
    </Root>
  );
};

export default OneLineLogo;
