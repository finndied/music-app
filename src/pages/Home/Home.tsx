import { FC } from 'react'
import styles from './Home.module.scss'
import background from '../../assets/images/background.gif'
import NavigationBar from '../../components/layout/NavigationBar/NavigationBar'
import UserMenu from '../../components/UserMenu/UserMenu'
import SearchInput from '../../components/Search/SearchInput'

const Home: FC = () => {
	return (
		<div className={styles.wrapper}>
			<NavigationBar />
			<div
				className={styles.homeContainer}
				style={{ backgroundImage: `url(${background})` }}
			></div>
			<div className={styles.homeContent}>
				<SearchInput className={styles.searchInput}/>
				<UserMenu className={styles.user} />
			</div>
		</div>
	)
}

export default Home
