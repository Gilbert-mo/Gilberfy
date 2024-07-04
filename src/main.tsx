import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './routes/App.tsx'
import {Login, Home, Album, Preferences, Lyrics, Search} from './routes'
import './index.css'

function initialRoot(isLoggedIn: boolean) {
  return isLoggedIn ? <App /> : <Login />
}

const router = createBrowserRouter([{
  path: '/',
  element: initialRoot(true),
  errorElement: <p>Error page</p>,
  children: [{
    path: '/',
    element: <Home />
  }, {
    path: 'search',
    element: <Search />
  }, {
    path: 'artist/:artistId',
    element: <h1>Artist</h1>
  }, {
    path: 'track/trackId',
    element: <h1>Track 1</h1>
  }, {
    path: 'album/albumId',
    element: <Album />
  }, {
    path: 'playlist/playlistId',
    element: <h1>Playlist 1</h1>
  }, {
    path: 'preferences',
    element: <Preferences />
  }, {
    path: 'lyrics',
    element: <Lyrics />
  }, {
    path: 'collection/tracks',
    element: <h1>Collections</h1>
  }]
}])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
