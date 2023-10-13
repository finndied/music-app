import { FC } from 'react'
import styles from './Artists.module.scss'
import background from '../../assets/images/background.gif'
import UserMenu from '../../components/UserMenu/UserMenu'
import PopularArtists from '../../components/PopularArtists/PopularArtists'

const Artists: FC = () => {
	return (
		<div className={styles.wrapper}>
			<div
				className={styles.homeContainer}
				style={{ backgroundImage: `url(${background})` }}
			></div>
			<div className={styles.homeContent}>
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
