import { gql, useApolloClient, useLazyQuery } from "@apollo/client";
import {
  CharacterDetails,
  CharactersData,
  CharacterType,
  EpisodesData,
} from "../models/characters";

export default function useMortyAndrickService() {
  const client = useApolloClient();

  /****Graphql Query for Listing characters */
  const GET_CHARACTERS_QUERY = gql`
    query Characters($filter: FilterCharacter, $page: Int) {
      characters(filter: $filter, page: $page) {
        info {
          count
          next
          pages
          prev
        }
        results {
          gender
          id
          image
          name
          species
        }
      }
    }
  `;

  /**
   * @return Promise<{ status: boolean; message: string,data:characters }>
   */
  const getCharacterList = async function (
    page: number,
    filter: FilterProps
  ): Promise<CharactersDataResponse> {
    // Check if data exists in cache
    const data = client.readQuery({
      query: GET_CHARACTERS_QUERY,
      variables: { page, filter },
    });
    if (data) {
      return {
        status: true,
        message: "Episodes listed successfully",
        data: data,
      };
    }
    // If data doesn't exist in cache, fetch from server
    try {
      const { data } = await client.query({
        query: GET_CHARACTERS_QUERY,
        variables: {
          page: page,
          filter: filter,
        },
      });

      return {
        status: true,
        message: "Characters listed successfully",
        data: data,
      };
    } catch (error) {
      return {
        status: false,
        message: "Characters Not Listed...try again",
      };
    }
  };

  /*****Query for Episodes */
  const GET_EPISODES_QUERY = gql`
    query Episodes($page: Int, $filter: FilterEpisode) {
      episodes(page: $page, filter: $filter) {
        info {
          count
          next
          pages
          prev
        }
        results {
          air_date
          episode
          name
          id
        }
      }
    }
  `;
  /**
   * @return Promise<{ status: boolean; message: string,data:Episodes }>
   */
  const getEpisodeList = async function (
    page: number,
    filter: EpisodeFilterProps
  ): Promise<EpisodesDataResponse> {
    // Check if data exists in cache
    const data = client.readQuery({
      query: GET_EPISODES_QUERY,
      variables: { page, filter },
    });
    if (data) {
      return {
        status: true,
        message: "Episodes listed successfully",
        data: data,
      };
    }

    // If data doesn't exist in cache, fetch from server
    try {
      const { data } = await client.query({
        query: GET_EPISODES_QUERY,
        variables: {
          page: page,
          filter: filter,
        },
      });

      return {
        status: true,
        message: "Episodes listed successfully",
        data: data,
      };
    } catch (error) {
      return {
        status: false,
        message: "Episodes Not Listed...try again",
      };
    }
  };

  /****Graphql Query to get an Episode */
  const GET_EPISODE_QUERY = gql`
    query Episode($episodeId: ID!) {
      episode(id: $episodeId) {
        air_date
        name
        episode
        characters {
          id
          name
          image
        }
      }
    }
  `;
  const [getEpisodeQuery] = useLazyQuery(GET_EPISODE_QUERY);

  /**
   * @return Promise<{ status: boolean; message: string,data:Episode }>
   */
  const getEpisode = async function (
    episodeId: string
  ): Promise<EpisodeDataResponse> {
    try {
      await client.resetStore();

      const { data } = await getEpisodeQuery({
        variables: {
          episodeId: episodeId,
        },
      });

      return {
        status: true,
        message: "Episode detailed Successfully",
        episode: data.episode,
      };
    } catch (error) {
      return {
        status: false,
        message: "There is No episode for this ID...try again",
      };
    }
  };

  /****Graphql Query to get a Character details */
  const GET_CHARACTER_QUERY = gql`
    query Character($characterId: ID!) {
      character(id: $characterId) {
        name
        gender
        image
        species
        origin {
          name
          dimension
          type
        }

        location {
          name
          dimension
          type
        }

        episode {
          id
          name
          episode
          air_date
        }
      }
    }
  `;
  const [getCharacterQuery] = useLazyQuery(GET_CHARACTER_QUERY);

  /**
   * @return Promise<{ status: boolean; message: string,data:character }>
   */
  const getCharacter = async function (
    characterId: string
  ): Promise<CharacterDataResponse> {
    try {
      await client.resetStore();

      const { data } = await getCharacterQuery({
        variables: {
          characterId: characterId,
        },
      });
      return {
        status: true,
        message: "Character fetched successfully",
        character: data.character,
      };
    } catch (error) {
      return {
        status: false,
        message: "There is No Character for this ID...try again",
      };
    }
  };

  return { getCharacterList, getEpisodeList, getEpisode, getCharacter };
}

export interface CharactersDataResponse {
  status: boolean;
  message: string;
  data?: CharactersData;
}
interface FilterProps {
  gender: string;
  name: string;
  species: string;
  status: string;
}

interface EpisodeFilterProps {
  name: string;
}

export interface EpisodesDataResponse {
  status: boolean;
  message: string;
  data?: EpisodesData;
}

export interface EpisodeDataResponse {
  status: boolean;
  message: string;
  episode?: EpisodeData;
}
export interface EpisodeData {
  name: string;
  air_date: string;
  episode: string;
  characters: CharacterType[];
}

export interface CharacterDataResponse {
  status: boolean;
  message: string;
  character?: CharacterDetails;
}
