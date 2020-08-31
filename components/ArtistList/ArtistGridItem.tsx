import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import CurrentBackground from './CurrentArtistBackground';

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

  img {
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
    bottom: 1rem;
    left: 1rem;
    color: #ffffff;
    font-size: 1.2rem;
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
  const { setIndex, refSlider, setListModalFlag } = React.useContext(
    IndexContext,
  );

  return (
    <Root
      id={`${artistData.id}`}
      base={size}
      gap={gap}
      hoverEffect={hoverEffect}
      onClick={() => {
        setIndex(artistData.id);
        refSlider.current?.slickGoTo(artistData.id - 1);
        sessionStorage.setItem('@artistId', `${artistData.id}`);
        setListModalFlag(false);
        setTimeout(() => router.reload(), 10);
      }}
      {...props}
    >
      <img
        src={`${BUCKET_URL}/thumb/${artistData.thumbFileName}`}
        alt={artistData.artistName}
      />
      {withName && <p className="artistName">{artistData.artistName}</p>}
      {current && <CurrentBackground />}
    </Root>
  );
};

export default ArtistGridItem;
