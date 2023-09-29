import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home.tsx'
import Artists from './pages/Artists/Artists.tsx'
import Artist from './pages/Artist/Artist.tsx'
import Album from './pages/Album/Album.tsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />
	},
	{
		path: '/artists',
		element: <Artists />
	},
	{
		path: '/artist/:id',
		element: <Artist />
	},{
		path: '/album/:id',
		element: <Album />
	}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)