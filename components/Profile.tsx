import React from 'react';
import styled from 'styled-components';

import { BUCKET_URL } from '../defines';

interface RootProps {
  height: number;
}
const Root = styled.span<RootProps>`
  display: flex;
  height: ${(props) => props.height}px;

  .profileImage {
    height: 100%;
    object-fit: contain;
  }

  .nameBox {
    display: flex;
    flex-direction: column;
    margin-left: 15px;

    p {
      margin: 0;
      font-size: 1.5rem;
    }

    .position {
      color: #707070;
    }

    .name {
      color: #1e1e1e;
      font-weight: 500;
    }
  }
`;

interface Props {
  artist: Artist;
  height?: number;
}
const Profile: React.FC<Props> = ({ artist, height = 150, ...props }) => {
  const getPosition = (id: number) => {
    if (id <= 10) return '고문';
    if (id === 11) return '회장';
    return '회원';
  };

  return (
    <Root height={height} {...props}>
      <img
        className="profileImage"
        alt={artist.artistName}
        src={`${BUCKET_URL}/profile/${artist.profileFileName}`}
      />
      <span className="nameBox">
        <div className="grow" />
        <p className="position">{getPosition(Number(artist.id))}</p>
        <p className="name">{artist.artistName}</p>
      </span>
    </Root>
  );
};

export default Profile;
