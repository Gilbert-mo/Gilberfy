// import { useEffect, useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './routes/App.tsx'
import { Login, Home, homeLoader, Album, Preferences, Lyrics, Search, Artist, artistsLoader } from './routes'
import './index.css'
import AuthCallback from './routes/AuthCallBack.tsx'
// import { loader as homeLoader } from './routes/Home.tsx'


const router = createBrowserRouter([{
  path: '/',
  element: localStorage.getItem('isLoggedIn') === 'true' ? <App /> : <Login />,
  errorElement: <p>Error page</p>,
  children: [{
    path: '/',
    element: <Home />,
    loader: homeLoader,
  }, {
    path: '/callback',
    element: <AuthCallback />
  }, {
    path: 'search',
    element: <Search />
  }, {
    path: 'artist/:artistId',
    element: <Artist />,
    loader: artistsLoader,
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
