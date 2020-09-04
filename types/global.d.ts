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
  artistName: string;
  title: string;
  size: string;
  material: string;
}

declare interface Artist {
  id: number;
  artistName: string;
  detail?: string;
  profileFileName: string;
  thumbFileName: string;
  landscapeFileName?: string;
  portraitFileName?: string;
  hitCount: number;
  seeMoreCount: number;
  artworks: Artwork[];
}

declare interface ArtworkData {
  artistName: string;
  title: string;
}

declare interface User {
  userId: string;
  createdAt: Date;
}
