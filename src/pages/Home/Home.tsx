import { FC } from 'react'
import styles from './Home.module.scss'
import background from '../../assets/images/background.gif'
import UserMenu from '../../components/UserMenu/UserMenu'
import TrendingSongs from '../../components/TrendingSongs/TrendingSongs'
import PopularArtists from '../../components/PopularArtists/PopularArtists'
import NowPlaying from '../../components/NowPlaying/NowPlaying'
import { Link } from 'react-router-dom'

const Home: FC = () => {
	return (
		<div className={styles.wrapper}>
			<div
				className={styles.homeContainer}
				style={{ backgroundImage: `url(${background})` }}
			></div>
			<div className={styles.homeContent}>
				<UserMenu className={styles.user} />
				<div className={styles.homeContentWrapper}>
					<div>
						<div className={styles.trendingWrapper}>
							<div>Trending songs this week</div>
							<Link to='/trending'>
								<div>See all</div>
							</Link>
						</div>
						<TrendingSongs tracksToDisplay={3} />
						<div className={styles.artistsWrapper}>
							<div>Popular artists</div>
							<Link to='/artists'>See all</Link>
						</div>
						<PopularArtists artistsToDisplay={5} />
					</div>
					<div className={styles.nowPlayingWrapper}>
						<NowPlaying />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
