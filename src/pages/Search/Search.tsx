import { FC } from 'react'
import styles from './Search.module.scss'
import background from '../../assets/images/background.gif'
import UserMenu from '../../components/UserMenu/UserMenu'
import SearchResults from '../../components/SearchResults/SearchResults'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

const Search: FC = () => {
	const currentImage = useSelector(
		(state: RootState) => state.player.currentImage
	)
	return (
		<div className={styles.wrapper}>
			<div
				className={styles.homeContainer}
				style={{ backgroundImage: `url(${currentImage || background})` }}
			></div>
			<div className={styles.homeContent}>
				<UserMenu className={styles.user} />
				<div className={styles.searchWrapper}>
					<SearchResults />
				</div>
			</div>
		</div>
	)
}

export default Search
