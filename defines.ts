export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;
export const MOBILE_BREAKPOINT = 500;
export const TABLET_BREAKPOINT = 800;
export const NAVBAR_WIDTH = 225;
export const PLAYBAR_HEIGHT = 82;
export const NUM_ARTISTS = 64;

export const HEADER_HEIGHT = 56;
export const TRANSITION = 300;

export const COLORS = {
  primary: '#17babc',
  disabled: '#7d7d7d',
};
export const PAGE_ARRAY = ['/', '/artist', '/video', '/visitor', '/about'];

const DEFINES = {
  API_URL,
  BUCKET_URL,
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
  NAVBAR_WIDTH,
  PLAYBAR_HEIGHT,
  NUM_ARTISTS,
  HEADER_HEIGHT,
  TRANSITION,
  COLORS,
};

export default DEFINES;
