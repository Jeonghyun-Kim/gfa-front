declare interface Artwork {
  id: number;
  fileName: string;
  artistId: number;
}

declare interface Artist {
  id: number;
  artistName: string;
  thumbFileName?: string;
  landscapeFileName?: string;
  portraitFileName?: string;
  hitCount: number;
  seeMoreCount: number;
}

declare module '*.svg' {
  const content: any;
  export default content;
}
