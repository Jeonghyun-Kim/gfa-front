declare interface ArtworkJson {
  artworkId: number;
  artistId: number;
  artist: string;
  title: string;
  size: string;
  material: string;
}

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

declare interface ArtworkData {
  artist: string;
  title: string;
}

declare module '*.svg' {
  const content: any;
  export default content;
}
