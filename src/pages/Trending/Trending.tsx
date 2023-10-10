import { FC } from 'react'
import NavigationBar from '../../components/layout/NavigationBar/NavigationBar'
import styles from './Trending.module.scss'
import background from '../../assets/images/background.gif'
import UserMenu from '../../components/UserMenu/UserMenu'
import SearchInput from '../../components/Search/SearchInput'
import TrendingSongs from '../../components/TrendingSongs/TrendingSongs'

const Trending: FC = () => {
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
            <div className={styles.trendingWrapper}>
            <h2>Trending songs this week</h2>
				<TrendingSongs tracksToDisplay={200} />
            </div>
			</div>
			
		</div>
	)
}

export default Trending
