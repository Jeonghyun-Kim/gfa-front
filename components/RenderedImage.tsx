import React from 'react';
import styled from 'styled-components';

import useMobileOrientation from '../lib/hooks/useMobileOrientation';

import { BUCKET_URL } from '../defines';

const MOBILE_BREAKPOINT = 500;

interface PictureProps {
  ratio: number;
}
const Picture = styled.picture<PictureProps>`
  width: 100%;
  height: 100%;

  .rendered {
    object-fit: cover;
    object-position: center bottom;
    width: 100%;
    height: 100%;

    @media screen and (max-width: ${MOBILE_BREAKPOINT}px) and (orientation: portrait) {
      object-fit: cover;
      object-position: center top;
    }

    @media screen and (max-width: ${MOBILE_BREAKPOINT}px) and (orientation: portrait) and (min-aspect-ratio: 2/3) {
      object-position: center ${(props) => (2 - props.ratio) * (50 / 3)}%;
    }
  }
`;

interface Props {
  artistData: Artist;
  onClick?: () => void;
}
const RenderedImage: React.FC<Props> = ({
  artistData,
  onClick = () => {},
  ...props
}) => {
  const { ratio } = useMobileOrientation();
  return (
    <Picture
      onClick={() => onClick()}
      className="unselectable"
      ratio={ratio}
      {...props}
    >
      <source
        media={`(max-width: ${MOBILE_BREAKPOINT}px) and (orientation: portrait)`}
        srcSet={`${BUCKET_URL}/rendered/${artistData.portraitFileName}`}
      />
      <img
        alt="artwork"
        src={`${BUCKET_URL}/rendered/${artistData.landscapeFileName}`}
        className="rendered"
      />
    </Picture>
  );
};

export default RenderedImage;
