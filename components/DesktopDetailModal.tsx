/* eslint-disable react/no-danger */
import React from 'react';
import styled from 'styled-components';

import Profile from './Profile';
import Artwork from './Artwork';

import useWindowSize from '../lib/hooks/useWindowSize';

import artworksJson from '../artworks.json';
import { NAVBAR_WIDTH, API_URL } from '../defines';

const PROFILE_HEIGHT = 280;
const CONTAINER_WIDTH = 1200;
const GAP = 15;

interface RootProps {
  tmp: boolean;
}
const Root = styled.div<RootProps>`
  position: relative;
  max-width: ${CONTAINER_WIDTH}px;
  margin: 0 auto;
  width: 100%;
  padding: 0 20px;

  .container {
    /* position: absolute; */
    width: 100%;
    position: relative;
    background-color: white;
    overflow: auto;
    margin-top: 46px;

    section {
      margin-bottom: 20px;

      .sectionTitle {
        color: #1e1e1e;
        font-weight: normal;
        margin-bottom: 5px;
      }
    }

    .profile-and-history {
      display: flex;
      flex-direction: ${(props) => (props.tmp ? 'column' : 'row')};
    }

    .history {
      width: ${(100 / 3) * 2}%;
      article {
        color: #7d7d7d;
        font-size: 0.9rem;

        .detailDiv {
        }

        b {
          color: #1e1e1e;
          font-weight: normal;
        }
      }
    }

    .artworks {
      .artworks-row {
        display: flex;
        justify-content: space-between;
      }
    }
  }
`;

const DesktopProfile = styled(Profile)`
  min-width: 350px;
  margin-right: 50px;
`;

interface Props {
  artist: Artist;
}
const DesktopDetailModal: React.FC<Props> = ({ artist, ...props }) => {
  const { innerWidth } = useWindowSize();

  const artworkSize =
    innerWidth > 1200 + NAVBAR_WIDTH + 40
      ? (1200 - 40 - GAP * 2) / 3
      : (innerWidth - NAVBAR_WIDTH - 40 - GAP * 2) / 3;

  const artworks = artworksJson.filter((artworkJson) => {
    return artworkJson.artistId === artist.id;
  });

  const detail = artist.detail ? artist.detail.split('\n').join('<br />') : '';

  return (
    <Root tmp={innerWidth < 1000} {...props}>
      <div className="container unselectable">
        <section className="profile-and-history">
          <DesktopProfile artist={artist} height={PROFILE_HEIGHT} />
          {/* <div className="history">
          </div> */}
        </section>
        <section className="history">
          <h4 className="sectionTitle">작가 경력</h4>
          <article>
            <div
              className="detailDiv"
              dangerouslySetInnerHTML={{
                __html: detail,
              }}
            />
          </article>
        </section>
        <section className="artworks">
          <h4 className="sectionTitle">대표 작품</h4>
          <div className="artworks-row">
            {artworks.map((artwork, idx) => (
              <Artwork
                key={artwork.artworkId}
                imageUrl={`${API_URL}/artworks/${artist.artworks[idx].fileName}`}
                id={artwork.artworkId}
                title={artwork.title}
                size={artwork.size}
                material={artwork.material}
                width={artworkSize}
              />
            ))}
          </div>
        </section>
      </div>
    </Root>
  );
};

export default DesktopDetailModal;
