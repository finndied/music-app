import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home.tsx'
import Artists from './pages/Artists/Artists.tsx'
import Artist from './pages/Artist/Artist.tsx'
import Album from './pages/Album/Album.tsx'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import Player from './components/Player/Player.tsx'
import Trending from './pages/Trending/Trending.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Provider store={store}>
			<React.StrictMode>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/artists' element={<Artists />} />
					<Route path='/artist/:id' element={<Artist />} />
					<Route path='/trending/' element={<Trending />} />
					<Route path='/album/:id' element={<Album />} />
				</Routes>
				<Player />
			</React.StrictMode>
		</Provider>
	</BrowserRouter>
)
