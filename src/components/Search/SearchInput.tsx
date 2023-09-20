import React, { useState } from 'react'
import styles from './SearchInput.module.scss'
import { BiSearch } from 'react-icons/bi'

interface ISearchInputProps {
	className?: string
}

const SearchInput: React.FC<ISearchInputProps> = ({ className }) => {
	const [searchQuery, setSearchQuery] = useState('')

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log(searchQuery)
	}

	return (
		<form className={`${className}`} onSubmit={handleSubmit}>
			<div className={styles.searchInput}>
				<input
					type='text'
					placeholder='Search by title, artist, or album...'
					value={searchQuery}
					onChange={handleInputChange}
					className={styles.input}
				/>
				<button type='submit' className={styles.button}>
					<BiSearch />
				</button>
			</div>
		</form>
	)
}

export default SearchInput
