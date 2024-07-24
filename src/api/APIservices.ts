import {FetchRequest, RefreshTokenResponse } from "../types";

const clientId = "f48929ff84e24e4fa8e9b381630a33c8";
const redirectUri = "http://localhost:3000/callback";

const scope = "user-read-private user-read-email user-top-read";
const authUrl = new URL("https://accounts.spotify.com/authorize");

const generateRandomString = (length: number) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256 = async (plain: any) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

const base64encode = (input: any) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

export async function getAuthURL() {
  const codeVerifier = generateRandomString(64);
  window.localStorage.setItem("code_verifier", codeVerifier);

  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  const params = {
    response_type: "code",
    client_id: clientId,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
}

// get TOKEN

const token_url = "https://accounts.spotify.com/api/token";

export const getToken = async (code: string) => {
  // stored in the previous step
  let codeVerifier = localStorage.getItem("code_verifier");

  if (!codeVerifier) {
    throw new Error("No code verifier found in local storage");
  }

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  };

  const response = await fetch(token_url, payload);

  if (!response.ok) {
    throw new Error("Failed to fetch access token");
  }

  const data = await response.json();
  console.log('1', data);

  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);
  localStorage.setItem(
    "expiry_time",
    (new Date().getTime() + data.expires_in * 1000).toString()
  );
};

// verifica si el token ha expirado
function isTokenExpired(): boolean {
  const expiryTimeStr = localStorage.getItem("expiry_time");

  if (!expiryTimeStr) {
    return true; //Si no hay tiempo de expiración, consideramos que el token está expirado
  }

  const expiryTime = parseInt(expiryTimeStr, 10) 

  if (isNaN(expiryTime)){
    return true // si la conversion falla, se considera que el token a expirado
  }

  return new Date().getTime() > expiryTime // se compara si el tiempo actual es mayor que el tiempo de expiración
}


async function ensureTokenValid(){
  if(isTokenExpired())
    await getRefreshToken()
}



async function getRefreshToken() {
  const refreshToken = localStorage.getItem("refresh_token");
  const url = "https://accounts.spotify.com/api/token";

  if (!refreshToken) {
    throw new Error("No refresh token found in local storage");
  }

  const payload = {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
    }),
  };

  try {
    const res = await fetch(url, payload);

    if (!res.ok) {
      throw new Error("Failed to refresh token");
    }

    const data: RefreshTokenResponse = await res.json();

    console.log('2', data)

    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token || refreshToken);
    localStorage.setItem(
      "expiry_time",
      (new Date().getTime() + data.expires_in * 1000).toString()
    );
  } catch (err) {
    console.log("Error refresh token", err);
  }
}

// para hacer peticiones
export async function fetchWebApi({ endpoint, method, body }: FetchRequest) {

  await ensureTokenValid() // verifica y refresca el token si es necesario

  const token = localStorage.getItem("access_token");

  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data from Spotify API");
  }

  return await res.json();
}