export interface Show {
  id: string;
  title: string;
  url: string;
  image: string | undefined;
}

export interface Details {
  name: string;
  year: number;
  channel: string;
  summary: string;
  rating: string;
  image: string | null;
}
