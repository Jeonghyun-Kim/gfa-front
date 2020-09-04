/* eslint-disable react/no-danger */
import React from 'react';
import styled from 'styled-components';

import Profile from './Profile';
import Artwork from './Artwork';

import useWindowSize from '../lib/hooks/useWindowSize';

import artworksJson from '../artworks.json';
import { NAVBAR_WIDTH, BUCKET_URL } from '../defines';

const PROFILE_HEIGHT = 280;
const CONTAINER_WIDTH = 1200;
const CONTAINER_PADDING = 40;
const GAP = 15;

interface RootProps {
  narrow: boolean;
  baseSize: number;
}
const Root = styled.div<RootProps>`
  position: relative;
  max-width: ${CONTAINER_WIDTH}px;
  margin: 0 auto;
  width: 100%;
  padding: 0 ${CONTAINER_PADDING}px;

  .container {
    /* position: absolute; */
    width: 100%;
    position: relative;
    background-color: white;
    overflow: auto;
    margin-top: 46px;

    section {
      margin-bottom: 30px;

      .sectionTitle {
        color: #1e1e1e;
        font-size: 1.5rem;
        font-weight: bolder;
        margin-top: 0;
        margin-bottom: 10px;
      }
    }

    .profile-and-history {
      display: flex;
      flex-direction: ${(props) => (props.narrow ? 'column' : 'row')};
    }

    .history {
      flex-grow: 1;
      height: ${PROFILE_HEIGHT}px;
      margin-top: ${(props) => (props.narrow ? 30 : 0)}px;

      article {
        width: 100%;
        height: ${PROFILE_HEIGHT - 45}px;
        overflow-y: scroll;
        color: #7d7d7d;
        font-size: 0.9rem;
        padding-top: 10px;
        border-top: 1px solid #707070;
        border-bottom: 1px solid #707070;

        ::-webkit-scrollbar {
          -webkit-appearance: none;
          width: 7px;
        }

        ::-webkit-scrollbar-thumb {
          border-radius: 4px;
          background-color: rgba(0, 0, 0, 0.5);
          box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
        }

        b {
          color: #1e1e1e;
          font-weight: normal;
        }
      }
    }

    .artworks {
      .artworks-row {
        display: grid;
        grid-template-columns: repeat(
          auto-fit,
          minmax(${(props) => props.baseSize}px, 1fr)
        );
      }
    }
  }
`;

const DesktopProfile = styled(Profile)`
  min-width: 391px;
`;

interface Props {
  artist: Artist;
}
const DesktopDetail: React.FC<Props> = ({ artist, ...props }) => {
  const { innerWidth } = useWindowSize();

  const narrow = innerWidth < 1000;
  const artworksPerLine = narrow ? 2 : 3;
  const artworkSize =
    innerWidth > CONTAINER_WIDTH + NAVBAR_WIDTH
      ? (CONTAINER_WIDTH -
          CONTAINER_PADDING * 2 -
          GAP * (artworksPerLine - 1)) /
        artworksPerLine
      : (innerWidth -
          NAVBAR_WIDTH -
          CONTAINER_PADDING * 2 -
          GAP * (artworksPerLine - 1)) /
        artworksPerLine;

  const artworks = artworksJson.filter((artworkJson) => {
    return artworkJson.artistId === artist.id;
  });

  const detail = artist.detail ? artist.detail.split('\n').join('<br />') : '';

  return (
    <Root narrow={narrow} baseSize={artworkSize} {...props}>
      <div className="container unselectable">
        <section className="profile-and-history">
          <DesktopProfile artist={artist} height={PROFILE_HEIGHT} />
          <div className="history">
            <h4 className="sectionTitle">작가 경력</h4>
            <article>
              <div
                className="detailDiv"
                dangerouslySetInnerHTML={{
                  __html: detail,
                }}
              />
            </article>
          </div>
        </section>
        <section className="artworks">
          <h4 className="sectionTitle">대표 작품</h4>
          <div className="artworks-row">
            {artworks.map((artwork, idx) => (
              <Artwork
                key={artwork.artworkId}
                imageUrl={`${BUCKET_URL}/artworks/${artist.artworks[idx].fileName}`}
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

export default DesktopDetail;
