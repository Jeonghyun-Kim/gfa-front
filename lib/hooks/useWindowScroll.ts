import { useEffect, useState } from 'react';

export default function useWindowScroll(): {
  x: number;
  y: number;
} {
  const [scroll, setScroll] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const scrollHandler = () =>
      setScroll({ x: window.pageXOffset, y: window.pageYOffset });
    window.addEventListener('scroll', scrollHandler, {
      capture: false,
      passive: true,
    });
    scrollHandler();
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);
  return scroll;
}
