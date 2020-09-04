import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Logo from '../../public/logo/logo-squared-with-dot.svg';

import { COLORS } from '../../defines';

const Root = styled.div`
  margin: 1rem 0;
  width: 40px;
  align-self: center;
  &:hover {
    cursor: pointer;
  }

  button: {
    padding: 0;
  }

  svg {
    font-size: 40px;
    color: ${COLORS.primary};
  }
`;

const OneLineLogo: React.FC = ({ ...props }) => {
  return (
    <Root {...props}>
      <Link href="/">
        <IconButton>
          <SvgIcon component={Logo} viewBox="0 0 2048 2048" />
        </IconButton>
      </Link>
    </Root>
  );
};

export default OneLineLogo;
