declare interface Artwork {
  id: number;
  fileName: string;
  artistId: number;
}

declare interface Artist {
  id: number;
  thumbFileName?: string;
  landscapeFileName?: string;
  portraitFileName?: string;
  hitCount: number;
  seeMoreCount: number;
}
