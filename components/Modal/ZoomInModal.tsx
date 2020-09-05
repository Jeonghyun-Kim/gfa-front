import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import PinchToZoom from 'react-pinch-and-zoom';
import { isIOS } from 'react-device-detect';

import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';

import Modal from './Modal';

import { BUCKET_URL } from '../../defines';

import IndexContext from '../../IndexContext';

interface RootProps {
  withLayout: boolean;
}
const Root = styled(Modal)<RootProps>`
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
    background: rgb(0, 0, 0);
    background: radial-gradient(
      circle,
      rgba(0, 0, 0, 0.7161239495798319) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    z-index: 10;

    @media screen and (max-height: 500px) and (orientation: landscape) {
      top: 60px;
    }
    svg {
      color: white;
    }
  }
`;

interface Props {
  modalOpen: number;
  setModalOpen: React.Dispatch<React.SetStateAction<number>>;
  artworks: Artwork[];
}
const ZoomInModal: React.FC<Props> = ({
  modalOpen,
  setModalOpen,
  artworks,
  ...props
}) => {
  const router = useRouter();
  const { withLayout } = React.useContext(IndexContext);

  React.useEffect(() => {
    window.focus();
  }, []);

  const visible =
    withLayout || isIOS ? Boolean(modalOpen) : Boolean(router.query.zoomIn);

  const handleModalClose = () => {
    if (withLayout || isIOS) {
      setModalOpen(0);
    } else if (router.query.zoomIn) {
      router.back();
    }
  };

  return (
    <Root withLayout={withLayout} visible={visible} full {...props}>
      <IconButton
        onClick={() => {
          handleModalClose();
        }}
      >
        <Close />
      </IconButton>
      {visible && (
        <PinchToZoom
          className="pinchArea"
          maxZoomScale={3}
          minZoomScale={0.9}
          boundSize={{ width: 50, height: 50 }}
          onTransform={({ zoomFactor, translate }) => {
            const { x, y } = translate;
            const diff = Math.sqrt(x * x + y * y) / Math.min(zoomFactor, 1);
            if (zoomFactor < 1.5 && diff > 300) {
              handleModalClose();
            }
          }}
          contentSize={{ width: 0, height: 0 }}
          debug={false}
        >
          <img
            className="zoomInArtworkImg"
            alt={
              artworks.find((artwork) => {
                if (withLayout || isIOS) {
                  return artwork.id === modalOpen;
                }
                return artwork.id === Number(router.query.zoomIn);
              })?.title
            }
            src={`${BUCKET_URL}/artworks/${
              artworks.find((artwork) => {
                if (withLayout || isIOS) {
                  return artwork.id === modalOpen;
                }
                return artwork.id === Number(router.query.zoomIn);
              })?.fileName
            }`}
          />
        </PinchToZoom>
      )}
    </Root>
  );
};

export default ZoomInModal;
