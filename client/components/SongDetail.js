import React from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { Link } from 'react-router-dom';
import fetchSong from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

function SongDetail(props) {
	const { song } = props.data;
	if (!song) return <div>Loading...</div>;
	return (
		<div className='container'>
			<Link to='/'>back</Link>
			<h3>{song.title}</h3>
			<LyricCreate songId={song.id} />
			<LyricList lyrics={song.lyrics} />
		</div>
	);
}

export default graphql(fetchSong, {
	options: (props) => ({ variables: { id: props.match.params.id } }),
})(SongDetail);
