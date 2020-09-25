/* eslint-disable react/no-danger */
import React from 'react';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import GoUp from '../public/icons/go_up.svg';

import Profile from './Profile';
import Artwork from './Artwork';

// import { detailHit } from '../lib/utils';
import useWindowSize from '../lib/hooks/useWindowSize';

import { NAVBAR_WIDTH, BUCKET_URL, PLAYBAR_HEIGHT } from '../defines';

import IndexContext from '../IndexContext';

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
    overflow: hidden;
    margin-top: 46px;
    display: flex;
    flex-direction: column;
    align-items: center;

    section {
      width: 100%;
      margin-bottom: 30px;

      .sectionTitle {
        color: #1e1e1e;
        font-size: 1.5rem;
        font-weight: 500;
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
        padding: 10px 0;
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
        place-items: start center;
        width: 100%;
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

const GoUpButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  transition: 300ms ease;

  button {
    padding: 3px;
    width: 54px;
    transition: none;

    &:hover {
      background: none;
    }

    svg {
      font-size: 50px;
      height: 20px;
      transition: none;
    }

    .goUpTitle {
      margin: 5px;
      font-size: 1.5rem;
      font-weight: 500;
    }
  }

  &:hover {
    cursor: pointer;
    opacity: 0.9;
    transform: scale(1.1);
  }
`;

interface Props {
  artist: Artist;
}
const DesktopDetail: React.FC<Props> = ({ artist, ...props }) => {
  const { innerWidth, innerHeight } = useWindowSize();
  const { refMain, setDetailModalFlag } = React.useContext(IndexContext);
  const [shownFlag, setShownFlag] = React.useState<boolean>(false);
  const [scrollY, setScrollY] = React.useState<number | null>(null);

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

  const detail = artist.detail ? artist.detail.split('\n').join('<br />') : '';

  // React.useEffect(() => {
  //   detailHit(artist.id);
  // }, [artist.id]);

  React.useEffect(() => {
    const handleSetScroll = () => {
      setScrollY(refMain.current?.scrollTop ?? null);
    };
    refMain.current?.addEventListener('scroll', handleSetScroll, {
      capture: false,
      passive: true,
    });
    handleSetScroll();
    setTimeout(() => {
      refMain.current?.scroll({
        behavior: 'smooth',
        top: innerHeight - PLAYBAR_HEIGHT,
        left: 0,
      });
      setShownFlag(true);
    }, 10);

    return () =>
      refMain.current?.removeEventListener('scroll', handleSetScroll);
  }, [refMain.current]);

  React.useEffect(() => {
    if (shownFlag && scrollY === 0) {
      setDetailModalFlag(false);
      setShownFlag(false);
    }
  }, [scrollY]);

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
            {artist.artworks.map((artwork, idx) => (
              <Artwork
                key={artwork.id}
                imageUrl={`${BUCKET_URL}/artworks/${artist.artworks[idx].fileName}`}
                id={artwork.id}
                title={artwork.title}
                size={artwork.size}
                material={artwork.material}
                width={artworkSize}
              />
            ))}
          </div>
        </section>
        <GoUpButtonGroup
          onClick={() => {
            refMain.current?.scroll({ behavior: 'smooth', top: 0, left: 0 });
          }}
        >
          <IconButton>
            <SvgIcon component={GoUp} viewBox="0 0 56.9 22.1" />
          </IconButton>
          <p className="goUpTitle">전시장으로 돌아가기</p>
        </GoUpButtonGroup>
      </div>
    </Root>
  );
};

export default DesktopDetail;
