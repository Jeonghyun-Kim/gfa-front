import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import PinchToZoom from 'react-pinch-and-zoom';
import { isIOS } from 'react-device-detect';

import IconButton from '@material-ui/core/IconButton';
import ZoomIn from '@material-ui/icons/ZoomIn';
import Close from '@material-ui/icons/Close';

import Modal from './Modal';

// import useWindowSize from '../lib/hooks/useWindowSize';
import IndexContext from '../IndexContext';

const BLUR_PX = 10;

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

    img.artworkImg {
      max-width: ${(props) => props.width - 32}px;
      max-height: ${(props) => props.width - 32}px;
      object-fit: contain;
      z-index: 1;
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

  svg {
    font-size: 20px;
    color: white;
  }
`;

interface ModalProps {
  withLayout: boolean;
}
const MyModal = styled(Modal)<ModalProps>`
  .modalRoot {
    display: grid;
    place-items: center;
    background-color: black;
    width: ${(props) => (props.withLayout ? '100vw' : '100%')};
    height: ${(props) => (props.withLayout ? '100vh' : '100%')};
  }

  .pinchArea {
    .pinch-to-zoom-area {
      width: 100vh;
      height: 100vh;
    }
  }

  .zoomInArtworkImg {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  button {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    svg {
      color: white;
    }
  }
`;

interface BoxProps {
  width: number;
  background: string;
}
const ArtworkBox = styled.div<BoxProps>`
  position: absolute;
  top: -10px;
  left: -10px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.width}px;
  background-image: url('${(props) => props.background}');
  background-size: cover;
  background-repeat: repeat;
  -webkit-filter: blur(${BLUR_PX}px);
  -moz-filter: blur(${BLUR_PX}px);
  -o-filter: blur(${BLUR_PX}px);
  -ms-filter: blur(${BLUR_PX}px);
  filter: blur(${BLUR_PX}px);
  transform: scale(1.2);
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
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const { withLayout } = React.useContext(IndexContext);
  // const { innerWidth, innerHeight } = useWindowSize();

  return (
    <Root width={width} {...props}>
      <MyModal
        withLayout={withLayout}
        visible={
          withLayout || isIOS ? modalOpen : Number(router.query.zoomIn) === id
        }
        full
      >
        <IconButton
          onClick={() => {
            if (withLayout || isIOS) {
              setModalOpen(false);
            } else if (router.query.zoomIn) {
              router.back();
            }
          }}
        >
          <Close />
        </IconButton>
        <PinchToZoom
          className="pinchArea"
          maxZoomScale={3}
          minZoomScale={0.8}
          boundSize={{ width: 50, height: 50 }}
          onTransform={() => {}}
          contentSize={{ width: 0, height: 0 }}
          debug={false}
        >
          <img className="zoomInArtworkImg" alt={title} src={imageUrl} />
        </PinchToZoom>
      </MyModal>
      <div className="artworkContainer">
        <img className="artworkImg" alt={title} src={imageUrl} />
        <ArtworkBox background={imageUrl} width={width} />
        <MyIconButton
          onClick={() => {
            if (withLayout || isIOS) {
              setModalOpen(true);
            } else {
              router.push(`?zoomIn=${id}`, undefined, { shallow: true });
            }
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
