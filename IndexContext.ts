import React from 'react';
import Slider from 'react-slick';

interface ContextProps {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  refSlider: React.MutableRefObject<Slider | null>;
  withLayout: boolean;
  listModalFlag: boolean;
  setListModalFlag: React.Dispatch<React.SetStateAction<boolean>>;
  detailModalFlag: boolean;
  setDetailModalFlag: React.Dispatch<React.SetStateAction<boolean>>;
  zoomInModal: number;
  setZoomInModal: React.Dispatch<React.SetStateAction<number>>;
  refMain: React.MutableRefObject<HTMLDivElement | null>;
}

const defaultContext: ContextProps = {
  index: 1,
  setIndex: () => 1,
  refSlider: React.createRef(),
  withLayout: false,
  listModalFlag: false,
  setListModalFlag: () => false,
  detailModalFlag: false,
  setDetailModalFlag: () => false,
  zoomInModal: 0,
  setZoomInModal: () => 0,
  refMain: React.createRef(),
};

export default React.createContext<ContextProps>(defaultContext);
