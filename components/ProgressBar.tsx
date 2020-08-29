import React from 'react';
import styled from 'styled-components';

import { COLORS, NUM_ARTISTS } from '../defines';

interface RootProps {
  index: number;
}
const Root = styled.div<RootProps>`
  position: absolute;
  top: 0;
  left: 0;
  height: 5px;
  border-radius: 10px;
  background-color: ${COLORS.primary};
  transition: width 300ms ease;
  width: ${(props) => (100 * props.index) / NUM_ARTISTS}%;
`;

interface Props {
  index: number;
}
const ProgressBar: React.FC<Props> = ({ index, ...props }) => {
  return <Root index={index} {...props} />;
};

export default ProgressBar;
