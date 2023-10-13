import { FC } from 'react'
import styles from './Trending.module.scss'
import background from '../../assets/images/background.gif'
import UserMenu from '../../components/UserMenu/UserMenu'
import TrendingSongs from '../../components/TrendingSongs/TrendingSongs'

const Trending: FC = () => {
	return (
		<div className={styles.wrapper}>
			<div
				className={styles.homeContainer}
				style={{ backgroundImage: `url(${background})` }}
			></div>
			<div className={styles.homeContent}>
				<UserMenu className={styles.user} />
            <div className={styles.trendingWrapper}>
            <h2>Trending songs this week</h2>
				<TrendingSongs tracksToDisplay={200} />
            </div>
			</div>
			
		</div>
	)
}

export default Trending
