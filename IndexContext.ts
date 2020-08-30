import React from 'react';
import Slider from 'react-slick';

interface ContextProps {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  refSlider: React.MutableRefObject<Slider | null>;
  withLayout: boolean;
}

const defaultContext: ContextProps = {
  index: 1,
  setIndex: () => 1,
  refSlider: React.createRef(),
  withLayout: false,
};

export default React.createContext<ContextProps>(defaultContext);
