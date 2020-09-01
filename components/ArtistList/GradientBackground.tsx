import React from 'react';
import styled from 'styled-components';

interface RootProps {
  width?: number;
  height?: number;
  top: number;
  left: number;
  opacity: {
    from: number;
    to: number;
  };
  hover?: boolean;
}
const Root = styled.div<RootProps>`
  position: absolute;
  width: ${(props) => props.width ?? '100%'};
  height: ${(props) => props.height ?? '100%'};
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.7) ${(props) => props.opacity.to}%,
    rgba(0, 0, 0, 0) ${(props) => props.opacity.from}%
  );

  ${(props) =>
    props.hover &&
    `
    &:hover {
      cursor: pointer;
    }
  `}
`;

interface Props {
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  opacity?: {
    from: number;
    to: number;
  };
  hover?: boolean;
}
const GradientBaground: React.FC<Props> = ({
  width,
  height,
  top = 0,
  left = 0,
  opacity = {
    from: 60,
    to: 0,
  },
  hover = false,
  ...props
}) => {
  return (
    <Root
      width={width}
      height={height}
      top={top}
      left={left}
      opacity={opacity}
      hover={hover}
      {...props}
    />
  );
};

export default GradientBaground;
