import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { BUCKET_URL } from '../defines';

const Root = styled.div`
  min-width: 200px;
  min-height: 200px;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
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
  withName?: boolean;
}

const ArtistGridItem: React.FC<Props> = ({
  artistData,
  withName = false,
  ...props
}) => {
  return (
    <Root {...props}>
      <Link href={`/artist/${artistData.id}`}>
        <img
          src={`${BUCKET_URL}/${artistData.thumbFileName}`}
          alt={artistData.artistName}
        />
        {withName && <p className="artistName">{artistData.artistName}</p>}
      </Link>
    </Root>
  );
};

export default ArtistGridItem;
