export interface Artist {
    name: string;
    id: string;
    followers?:{total: number, href: '' | null};
    images?: { url: string }[];
    genres?: string[];
}

export interface Track {
    id: string;
    name: string;
    artists: Artist[];
}

export interface FetchRequest {
    endpoint: string;
    method: "POST" | "GET";
    body?: Record<string, any> | FormData | null;
  }

export interface RefreshTokenResponse {
    access_token: string;
    refresh_token?: string;
    expires_in: number;
}