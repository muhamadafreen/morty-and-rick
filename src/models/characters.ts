export interface CharacterType {
  id: number;
  name: string;
  gender: string;
  species: string;
  status: string;
  type: string | null;
  created: string;
  image: string;
}

export interface CharactersData {
  characters: {
    info: {
      count: number;
      next: number;
      pages: number;
      prev: number | null;
    };
    results: CharacterType[];
  };
}

export interface EpisodeType {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}
export interface EpisodesData {
  episodes: {
    info: {
      count: number;
      next: number;
      pages: number;
      prev: number | null;
    };
    results: EpisodeType[];
  };
}

export interface InfoType {
  count: number;
  next: number;
  pages: number;
  prev: number | null;
}

export interface CharacterDetails {
  name: string;
  gender: string;
  image: string;
  species: string;
  origin: {
    name: string;
    dimension: string;
    type: string;
  };
  location: {
    name: string;
    dimension: string;
    type: string;
  };
  episode: EpisodeType[];
}
