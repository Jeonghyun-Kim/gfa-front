import { useEffect, useState } from 'react';

import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from '../../defines';

export default function useWindowSize() {
  const [windowInfo, setWindowInfo] = useState<{
    isMobile: boolean;
    isTablet: boolean;
    isPortrait: boolean;
    innerWidth: number;
    innerHeight: number;
    ratio: number;
  }>({
    isMobile: true,
    isTablet: false,
    isPortrait: true,
    innerWidth: 0,
    innerHeight: 0,
    ratio: 1,
  });

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth < window.innerHeight) {
        if (window.innerWidth <= MOBILE_BREAKPOINT) {
          setWindowInfo({
            isMobile: true,
            isTablet: false,
            isPortrait: true,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            ratio: window.innerHeight / window.innerWidth,
          });
        } else if (window.innerWidth <= TABLET_BREAKPOINT) {
          setWindowInfo({
            isMobile: false,
            isTablet: true,
            isPortrait: true,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            ratio: window.innerHeight / window.innerWidth,
          });
        } else {
          setWindowInfo({
            isMobile: false,
            isTablet: false,
            isPortrait: true,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            ratio: window.innerHeight / window.innerWidth,
          });
        }
      } else if (window.innerHeight <= MOBILE_BREAKPOINT) {
        setWindowInfo({
          isMobile: true,
          isTablet: false,
          isPortrait: false,
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
          ratio: window.innerHeight / window.innerWidth,
        });
      } else if (window.innerHeight <= TABLET_BREAKPOINT) {
        setWindowInfo({
          isMobile: false,
          isTablet: true,
          isPortrait: false,
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
          ratio: window.innerHeight / window.innerWidth,
        });
      } else {
        setWindowInfo({
          isMobile: false,
          isTablet: false,
          isPortrait: false,
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
          ratio: window.innerHeight / window.innerWidth,
        });
      }
    };
    window.addEventListener('resize', handler, {
      capture: false,
      passive: true,
    });
    handler();
    return () => window.removeEventListener('resize', handler);
  }, []);
  return windowInfo;
}
