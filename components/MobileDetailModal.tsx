/* eslint-disable react/no-danger */
import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';

import Profile from './Profile';
import Artwork from './Artwork';

import useWindowSize from '../lib/hooks/useWindowSize';

import artworksJson from '../artworks.json';
import { API_URL } from '../defines';

interface RootProps {
  seeMore: boolean;
}
const Root = styled.div<RootProps>`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 99;

  .container {
    /* position: absolute; */
    /* width: 100%; */
    position: relative;
    height: calc(100% - 46px);
    background-color: white;
    overflow: auto;
    scroll-behavior: smooth;
    margin-top: 46px;
    /* padding: 0 16px; */

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none;
    scrollbar-width: none;

    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
      /* display: none; */
      scrollbar-width: auto;
    }

    section {
      margin-bottom: 20px;

      .sectionTitle {
        color: #1e1e1e;
        font-weight: normal;
        margin-bottom: 5px;
      }
    }

    .profile {
      padding: 0 16px;
    }

    .history {
      padding: 0 16px;

      button {
        padding-left: 0;
        width: fit-content;
        span {
          color: #b1b1b1;
        }
      }

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
      .sectionTitle {
        padding: 0 16px;
      }

      .artworkInfo {
        margin-left: 16px;
      }
    }
  }

  .modalHeader {
    /* position: fixed; */
    position: absolute;
    top: 0px;
    width: 100%;
    height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ededed;
    box-shadow: rgba(0, 0, 0, 0.16) 0 3px 6px;
    z-index: 999;

    svg {
      font-size: 1.8rem;
    }

    button {
      position: absolute;
      left: 0;
    }
  }
`;

interface Props {
  artist: Artist;
}
const MobileDetailModal: React.FC<Props> = ({ artist, ...props }) => {
  const router = useRouter();
  const [seeMore, setSeeMore] = React.useState<boolean>(false);
  const { innerWidth } = useWindowSize();

  const artworks = artworksJson.filter((artworkJson) => {
    return artworkJson.artistId === artist.id;
  });

  const detail = artist.detail ? artist.detail.split('\n') : [''];
  const isLong = detail.length > 4;
  const shortDetail = isLong
    ? detail.slice(0, 3).join('<br />')
    : detail.join('<br />');
  const extraDetail = isLong ? detail.slice(3).join('<br />') : null;

  return (
    <Root seeMore={seeMore} {...props}>
      <div className="modalHeader">
        <IconButton
          onClick={() => {
            router.back();
          }}
        >
          <Close />
        </IconButton>
        <h4>작가 상세페이지</h4>
      </div>
      <div className="container unselectable">
        <section className="profile">
          <Profile artist={artist} />
        </section>
        <section className="history">
          <h4 className="sectionTitle">작가 경력</h4>
          <article>
            {!isLong ? (
              <div
                className="detailDiv"
                dangerouslySetInnerHTML={{
                  __html: shortDetail,
                }}
              />
            ) : (
              <>
                <div
                  className="detailDiv"
                  dangerouslySetInnerHTML={{
                    __html: shortDetail,
                  }}
                />
                {seeMore && extraDetail && (
                  <div
                    className="detailDiv"
                    dangerouslySetInnerHTML={{
                      __html: extraDetail,
                    }}
                  />
                )}
                <Button variant="text" onClick={() => setSeeMore(!seeMore)}>
                  {!seeMore ? '작가 경력 모두 보기' : '줄이기'}
                </Button>
              </>
            )}
          </article>
        </section>
        <section className="artworks">
          <h4 className="sectionTitle">대표 작품</h4>
          {artworks.map((artwork, idx) => (
            <Artwork
              key={artwork.artworkId}
              imageUrl={`${API_URL}/artworks/${artist.artworks[idx].fileName}`}
              id={artwork.artworkId}
              title={artwork.title}
              size={artwork.size}
              material={artwork.material}
              width={innerWidth}
            />
          ))}
        </section>
      </div>
    </Root>
  );
};

export default MobileDetailModal;
