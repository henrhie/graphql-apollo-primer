import React from 'react';
import gql from 'graphql-tag';
import { graphql } from '@apollo/client/react/hoc';
import { Link, useHistory } from 'react-router-dom';
import query from '../queries/fetchSongs';

const onSubmit = (e, props, history, title) => {
	e.preventDefault();
	props
		.mutate({
			variables: {
				title: title,
			},
			refetchQueries: [{ query }],
		})
		.then(() => history.push('/'))
		.catch((err) => console.log(err));
};

function SongCreate(props) {
	const [title, setTitle] = React.useState('');
	let history = useHistory();

	return (
		<div>
			<Link to='/'>Back</Link>
			<h3>create a new song</h3>
			<form onSubmit={(e) => onSubmit(e, props, history, title)}>
				<label>Song Title: </label>
				<input onChange={(e) => setTitle(e.target.value)} value={title} />
			</form>
		</div>
	);
}

const mutation = gql`
	mutation AddSong($title: String) {
		addSong(title: $title) {
			title
		}
	}
`;

export default graphql(mutation)(SongCreate);
