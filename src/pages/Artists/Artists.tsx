import { FC } from 'react'
import NavigationBar from '../../components/layout/NavigationBar/NavigationBar'
import styles from './Artists.module.scss'
import background from '../../assets/images/background.gif'
import UserMenu from '../../components/UserMenu/UserMenu'
import SearchInput from '../../components/Search/SearchInput'
import PopularArtists from '../../components/PopularArtists/PopularArtists'

const Artists: FC = () => {
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
            <div className={styles.artistsWrapper}>
				<h2>Popular artists</h2>
				<PopularArtists artistsToDisplay={100} />
            </div>
			</div>
			
		</div>
	)
}

export default Artists
