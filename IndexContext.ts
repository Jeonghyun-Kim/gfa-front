import React from 'react';
import Slider from 'react-slick';

interface ContextProps {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  refSlider: React.MutableRefObject<Slider | null>;
}

const defaultContext: ContextProps = {
  index: 1,
  setIndex: () => 1,
  refSlider: React.createRef(),
};

export default React.createContext<ContextProps>(defaultContext);
