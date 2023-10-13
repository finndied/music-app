import React, { useState } from 'react'
import styles from './SearchInput.module.scss'
import { BiSearch } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { searchAsync } from '../../store/searchSlice'
import getAccessToken from '../../api/apiSpotify'
import { useNavigate } from 'react-router-dom'

interface ISearchInputProps {
	className?: string
}

const SearchInput: React.FC<ISearchInputProps> = ({ className }) => {
	const [searchQuery, setSearchQueryLocal] = useState('')
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQueryLocal(e.target.value)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (searchQuery.trim() === '') {
			return
		}

		navigate(`/search/${searchQuery}`)
		getAccessToken()
			.then(accessToken => {
				dispatch(searchAsync(accessToken, searchQuery))
			})
			.catch(error => {
				console.error('Error fetching access token:', error)
			})
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
