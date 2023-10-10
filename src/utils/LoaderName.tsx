import ContentLoader from 'react-content-loader'
const LoaderName = (props: any) => (
	<ContentLoader
		viewBox='0 0 100 20'
		width={90}
		height={17}
		backgroundColor='#b5b5b5'
		foregroundColor="transparent"
		{...props}
	>
		<rect x='5' y='8' rx='5' ry='5' width='85' height='13' />
	</ContentLoader>
)

export default LoaderName
