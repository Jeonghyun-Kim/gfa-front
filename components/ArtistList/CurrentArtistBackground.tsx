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

  img.nowPlaying {
    width: 50%;
    height: 50%;
    object-fit: contain;
  }
`;

const CurrentArtistBackground: React.FC = ({ ...props }) => {
  return (
    <Root {...props}>
      <img
        className="nowPlaying"
        alt="Now Playing"
        src="/images/now_playing.png"
      />
    </Root>
  );
};

export default CurrentArtistBackground;
