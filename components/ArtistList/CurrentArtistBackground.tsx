import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #17babc;
  opacity: 0.75;
  z-index: 10;

  display: grid;
  place-items: center;
`;

const CurrentArtistBackground: React.FC = ({ ...props }) => {
  return (
    <Root {...props}>
      <p>Now Playing</p>
    </Root>
  );
};

export default CurrentArtistBackground;
