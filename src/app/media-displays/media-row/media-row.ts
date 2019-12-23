export interface MediaRow {
  title: string;
  items: MediaRowItem[];
}

export interface MediaRowItem {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  fanart: boolean;
  // posterUri: string;
  // fanartUri: string;
  watched: boolean;
  progressPercent: number;
  menuOpen: boolean;
  posterThumbnailUri: string;
  posterUri: string;
  fanartThumbnailUri: string;
  fanartUri?: string;
}
