import React from 'react';
import styled from 'styled-components';

import useMobileOrientation from '../lib/hooks/useWindowSize';

import { BUCKET_URL, MOBILE_BREAKPOINT } from '../defines';

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
      object-position: center ${(props) => (2 - props.ratio) * (50 / 3)}%;
    }
  }
`;

interface Props {
  artistData: Artist;
  onClick?: () => void;
}
const RenderedImage: React.FC<Props> = ({
  artistData = { id: 0, artistName: 'UNKNOWN' },
  onClick = () => {},
  ...props
}) => {
  const { ratio } = useMobileOrientation();
  const { portraitFileName, landscapeFileName } = artistData;

  return (
    <Picture
      onClick={() => onClick()}
      className="unselectable"
      ratio={ratio}
      {...props}
    >
      <source
        media={`(max-width: ${MOBILE_BREAKPOINT}px) and (orientation: portrait)`}
        srcSet={
          portraitFileName
            ? `${BUCKET_URL}/rendered/${artistData.portraitFileName}`
            : '/images/empty_portrait.jpg'
        }
      />
      <img
        alt="artwork"
        src={
          landscapeFileName
            ? `${BUCKET_URL}/rendered/${artistData.landscapeFileName}`
            : '/images/empty_landscape.jpg'
        }
        className="rendered"
      />
    </Picture>
  );
};

export default RenderedImage;
