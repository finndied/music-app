import { FC } from 'react'
import NavigationBar from '../../components/layout/NavigationBar/NavigationBar'
import styles from './Artists.module.scss'
import background from '../../assets/images/background.gif'
import UserMenu from '../../components/UserMenu/UserMenu'
import SearchInput from '../../components/Search/SearchInput'
import Player from '../../components/Player/Player'
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
				<PopularArtists artistsToDisplay={100} />
            </div>
			</div>
			<div className={styles.playerWrapper}>
				<Player />
			</div>
		</div>
	)
}

export default Artists
