
export interface Media {
  id: number;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  profile_path?: string;
  known_for_department?: string;
}

export interface Video {
  key: string;
  site: string;
  type: string;
}

export interface MediaDetails extends Media {
  genres: { id: number; name: string }[];
  videos: { results: Video[] };
  credits: { cast: any[] };
  similar: { results: Media[] };
}