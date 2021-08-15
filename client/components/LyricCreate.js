import { graphql } from '@apollo/client/react/hoc';
import gql from 'graphql-tag';
import React from 'react';

function onSubmit(e, props, content, songId, setContent) {
	console.log(content, songId);
	e.preventDefault();
	props
		.mutate({
			variables: {
				content,
				songId,
			},
		})
		.then(() => setContent(''));
}

function LyricCreate(props) {
	const [content, setContent] = React.useState('');
	return (
		<form
			onSubmit={(e) => onSubmit(e, props, content, props.songId, setContent)}
		>
			<label>add a lyric</label>
			<input onChange={(e) => setContent(e.target.value)} value={content} />
		</form>
	);
}

const mutation = gql`
	mutation AddLyricToSong($content: String, $songId: ID) {
		addLyricToSong(content: $content, songId: $songId) {
			id
			lyrics {
				id
				content
				likes
			}
		}
	}
`;

export default graphql(mutation)(LyricCreate);
