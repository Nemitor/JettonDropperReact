import { FC,CSSProperties  } from 'react';
import cleaningGif from '../../resources/gif/Cleaning.gif'

const styles: { container: CSSProperties; gif: CSSProperties } = {
	container: {
		display: 'flex',
		flexDirection: 'column', // Используем строковый литерал вместо общего типа string
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
		textAlign: 'center',

	},
	gif: {
		width: '200px',
		height: '200px',
		marginBottom: '20px',
	},
};

export const HomePage: FC = () => {
	return (
		<div style={styles.container}>
			<img src={cleaningGif} alt="Loading GIF" style={styles.gif} />
			<h1>{'Oops!'}</h1>
			<p>{"The server may not be responding to requests.\n We're already working on the problem!"}</p>
		</div>
	);
};
