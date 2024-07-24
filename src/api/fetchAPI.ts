import { fetchWebApi } from "./APIservices";
import {Track, Artist} from "../types"

export async function getTopTracks(): Promise<{ items: Track[] }> {
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return await fetchWebApi({
      endpoint: "v1/me/top/tracks?time_range=long_term&limit=5",
      method: "GET",
    });
  }

  export async function getArtist(artist_id: string): Promise<Artist> {
    return await fetchWebApi({
        endpoint: `v1/artists/${artist_id}`, 
        method: 'GET',
    })
  }