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
  }

  svg {
    width: 143px;
    height: 30px;
    color: white;
    font-size: 100px;
  }
`;

const OneLineLogo: React.FC = ({ ...props }) => {
  return (
    <Root {...props}>
      <Link href="/">
        <IconButton>
          <SvgIcon component={Logo} viewBox="0 0 1175.09 255.33" />
        </IconButton>
      </Link>
    </Root>
  );
};

export default OneLineLogo;
