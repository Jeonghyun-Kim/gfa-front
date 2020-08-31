import React from 'react';
import styled from 'styled-components';

import ArtistGridItem from './ArtistList/ArtistGridItem';

import IndexContext from '../IndexContext';

interface RootProps {
  base: number;
  gap: string;
}
const Root = styled.div<RootProps>`
  width: 100%;
  display: grid;
  place-items: center;
  overflow-y: scroll;
  background-color: white;
  grid-gap: ${(props) => props.gap};
  grid-template-columns: repeat(
    auto-fit,
    minmax(${(props) => props.base}px, 1fr)
  );
`;

interface Props {
  artists: Artist[];
  size?: number;
  gap?: string;
  hoverEffect?: boolean;
  withName?: boolean;
}
const ArtistLists: React.FC<Props> = ({
  artists,
  size = 150,
  gap = '5px',
  hoverEffect = false,
  withName = false,
  ...props
}) => {
  const { index } = React.useContext(IndexContext);
  return (
    <Root base={size} gap={gap} {...props}>
      {artists.map((artist) => (
        <ArtistGridItem
          key={artist.id}
          artistData={artist}
          size={size}
          gap={gap}
          current={artist.id === index}
          hoverEffect={hoverEffect}
          withName={withName}
        />
      ))}
    </Root>
  );
};

export default ArtistLists;
