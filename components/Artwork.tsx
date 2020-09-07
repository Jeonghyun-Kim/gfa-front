import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { isIOS } from 'react-device-detect';

import IconButton from '@material-ui/core/IconButton';
import ZoomIn from '@material-ui/icons/ZoomIn';

import IndexContext from '../IndexContext';

const BLUR_PX = 30;
const borderList = [31, 32, 33, 40, 41, 42];

interface RootProps {
  width: number;
}
const Root = styled.div<RootProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width}px;
  margin-bottom: 50px;

  .artworkContainer {
    position: relative;
    display: grid;
    place-items: center;
    overflow: hidden;
    width: ${(props) => props.width}px;
    height: ${(props) => props.width}px;

    &:hover {
      cursor: pointer;
    }

    img.artworkImg {
      max-width: ${(props) => props.width - 32}px;
      max-height: ${(props) => props.width - 32}px;
      object-fit: contain;
      z-index: 3;

      &.withBorder {
        border: 1px solid #ddd;
      }
    }
  }

  .artworkInfo {
    margin-top: 10px;

    .title {
      margin: 0;
      font-weight: normal;
      color: #1e1e1e;
      font-size: 1rem;
    }
    .info {
      margin: 0;
      font-weight: normal;
      color: #707070;
      font-size: 1rem;
    }
  }
`;

const MyIconButton = styled(IconButton)`
  position: absolute !important;
  right: 10px;
  bottom: 10px;
  background-color: black !important;
  padding: 5px !important;
  z-index: 4;

  svg {
    font-size: 20px;
    color: white;
  }
`;

interface BoxProps {
  width: number;
  background: string;
}
const ArtworkBox = styled.div<BoxProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.width}px;
  height: ${(props) => props.width}px;
  background-image: url('${(props) => props.background}');
  background-size: cover;
  background-repeat: repeat;
  /* -webkit-filter: blur(${BLUR_PX}px);
  -moz-filter: blur(${BLUR_PX}px);
  -o-filter: blur(${BLUR_PX}px);
  -ms-filter: blur(${BLUR_PX}px);
  filter: blur(${BLUR_PX}px);
  transform: scale(1.1); */
  z-index: 1;

  .blurBackground {
    position: absolute;
    top: 0;
    left: 0;
    width: ${(props) => props.width}px;
    height: ${(props) => props.width}px;
    background: rgba(255, 255, 255, 0.2) no-repeat padding-box;
    -webkit-backdrop--filter: blur(30px);
    backdrop-filter: blur(30px);
    z-index: 2;
  }
`;

interface Props {
  imageUrl: string;
  id: number;
  title: string;
  size: string;
  material: string;
  width?: number;
}
const Artwork: React.FC<Props> = ({
  imageUrl,
  id,
  title,
  size,
  material,
  width = 0,
  ...props
}) => {
  const router = useRouter();

  const { withLayout, zoomInModal, setZoomInModal } = React.useContext(
    IndexContext,
  );

  const handleModalOpen = () => {
    if ((withLayout || isIOS) && !zoomInModal) {
      setZoomInModal(id);
    } else if (router.query.detailOpen) {
      router.push(`?detailOpen=1&zoomIn=${id}`, undefined, { shallow: true });
    } else {
      router.push(`?zoomIn=${id}`, undefined, { shallow: true });
    }
  };

  return (
    <Root width={width} {...props}>
      <div
        className="artworkContainer"
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
        onClick={() => {
          handleModalOpen();
        }}
      >
        <img
          className={`artworkImg ${
            borderList.find((idx) => idx === id) && 'withBorder'
          }`}
          alt={title}
          src={imageUrl}
        />
        <ArtworkBox background={imageUrl} width={width}>
          <div className="blurBackground" />
        </ArtworkBox>
        <MyIconButton
          onClick={() => {
            handleModalOpen();
          }}
        >
          <ZoomIn />
        </MyIconButton>
      </div>
      <div className="artworkInfo">
        <h4 className="title">{title}</h4>
        <p className="info">
          {size}, {material}
        </p>
      </div>
    </Root>
  );
};

export default Artwork;
