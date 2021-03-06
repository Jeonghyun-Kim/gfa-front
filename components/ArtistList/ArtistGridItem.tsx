import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { isIOS } from 'react-device-detect';

import CurrentBackground from './CurrentArtistBackground';
import GradientBackground from './GradientBackground';

import { BUCKET_URL } from '../../defines';

import IndexContext from '../../IndexContext';

interface RootProps {
  base: number;
  gap: string;
  hoverEffect: boolean;
}
const Root = styled.div<RootProps>`
  position: relative;
  width: ${(props) => props.base}px;
  height: ${(props) => props.base}px;
  /* border: 1px solid #eee; */
  transition: 0.5s ease;

  ${(props) =>
    props.hoverEffect &&
    `
    &:hover {
      opacity: 0.7;
    }
  `}

  img.thumbArtwork {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;

    &:hover {
      cursor: pointer;
    }
  }

  .artistName {
    position: absolute;
    bottom: 0.3rem;
    left: 0.5rem;
    margin: 0;
    letter-spacing: 0.5rem;
    color: #ffffff;
    font-size: 1rem;
    z-index: 1;
  }
`;

interface Props {
  artistData: Artist;
  size: number;
  gap: string;
  withName?: boolean;
  current?: boolean;
  hoverEffect?: boolean;
}

const ArtistGridItem: React.FC<Props> = ({
  artistData,
  size,
  gap,
  withName = false,
  current = false,
  hoverEffect = false,
  ...props
}) => {
  const router = useRouter();
  const {
    setIndex,
    withLayout,
    refSlider,
    setListModalFlag,
  } = React.useContext(IndexContext);

  return (
    <Root
      id={`${artistData.id}`}
      base={size}
      gap={gap}
      hoverEffect={hoverEffect}
      onClick={() => {
        setIndex(artistData.id);
        sessionStorage.setItem('@artistId', `${artistData.id}`);
        if (!withLayout) {
          if (isIOS) {
            setListModalFlag(false);
          } else {
            router.back();
          }
          setTimeout(() => router.reload(), 10);
        } else {
          setListModalFlag(false);
          refSlider.current?.slickGoTo(artistData.id - 1);
        }
      }}
      {...props}
    >
      <img
        className="thumbArtwork"
        src={`${BUCKET_URL}/thumb/${artistData.thumbFileName}`}
        alt={artistData.artistName}
      />
      {!current && withName && (
        <p className="artistName">{artistData.artistName}</p>
      )}
      {current && <CurrentBackground />}
      {withName && <GradientBackground height="25%" top="75%" hover />}
    </Root>
  );
};

export default ArtistGridItem;
