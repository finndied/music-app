import React, { useState } from 'react'
import avatarImage from '../../assets/images/avatar.jpg'
import styles from './UserMenu.module.scss'

interface UserMenuProps {
	className?: string
}

const UserMenu: React.FC<UserMenuProps> = ({ className }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	return (
		<div className={`userMenu ${className}`} onClick={toggleMenu}>
			<img src={avatarImage} className={styles.avatarImage} alt='User Avatar' />
			{isMenuOpen && (
				<div className={styles.menu}>
					<div>Profile</div>
					<div>Settings</div>
					<div>Log out</div>
				</div>
			)}
		</div>
	)
}

export default UserMenu
