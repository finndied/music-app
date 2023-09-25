import { FC } from 'react'
import styles from './Home.module.scss'
import background from '../../assets/images/background.gif'
import NavigationBar from '../../components/layout/NavigationBar/NavigationBar'
import UserMenu from '../../components/UserMenu/UserMenu'
import SearchInput from '../../components/Search/SearchInput'
import TrendingSongs from '../../components/TrendingSongs/TrendingSongs'
import PopularArtists from '../../components/PopularArtists/PopularArtists'
import NowPlaying from '../../components/NowPlaying/NowPlaying'
import Player from '../../components/Player/Player'
import { Link } from 'react-router-dom'

const Home: FC = () => {
	return (
		<div className={styles.wrapper}>
			<NavigationBar />
			<div
				className={styles.homeContainer}
				style={{ backgroundImage: `url(${background})` }}
			></div>
			<div className={styles.homeContent}>
				<SearchInput className={styles.searchInput} />
				<UserMenu className={styles.user} />
				<div className={styles.homeContentWrapper}>
					<div className={styles.trendingWrapper}>
						<div>Trending songs this week</div>
						<div>See all</div>
					</div>
					<TrendingSongs />
					<div className={styles.artistsWrapper}>
						<div>Popular artists</div>
						<Link to='/artists'>See all</Link>
					</div>
					<PopularArtists artistsToDisplay={5}/>
				</div>
				<div className={styles.nowPlayingWrapper}>
					<NowPlaying />
				</div>
			</div>
			<div className={styles.playerWrapper}>
				<Player />
			</div>
		</div>
	)
}

export default Home
