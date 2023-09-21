import { FC, useEffect, useState } from 'react'
import styles from './Home.module.scss'
import background from '../../assets/images/background.gif'
import NavigationBar from '../../components/layout/NavigationBar/NavigationBar'
import UserMenu from '../../components/UserMenu/UserMenu'
import SearchInput from '../../components/Search/SearchInput'
import TrendingSongs from '../../components/TrendingSongs/TrendingSongs'

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
				<div className={styles.trendingWrapper}>
					<div>Trending songs this week</div>
					<div>See all</div>
				</div>
					<TrendingSongs className={styles.trending} />
			</div>
		</div>
	)
}

export default Home
