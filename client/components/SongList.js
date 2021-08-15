import React from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { Link } from 'react-router-dom';
import query from '../queries/fetchSongs';
import gql from 'graphql-tag';

import '../style/style.css';

class SongList extends React.Component {
	onSongDelete = (id) => {
		this.props
			.mutate({
				variables: { id },
			})
			.then(() => this.props.data.refetch());
	};

	renderSongs = () => {
		if (this.props.data.loading) return <div>loading...</div>;
		return this.props.data.songs.map((song) => (
			<li className='collection-item' key={song.id}>
				<Link to={`/songs/${song.id}`}>{song.title}</Link>
				<i
					className='material-icons'
					onClick={() => this.onSongDelete(song.id)}
				>
					delete
				</i>
			</li>
		));
	};

	render() {
		return (
			<div className='container'>
				<ul className='collection'>{this.renderSongs()}</ul>
				<Link to='/songs/new' className='btn-floating btn-large red right'>
					<i className='material-icons'>add</i>
				</Link>
			</div>
		);
	}
}

const mutation = gql`
	mutation DeleteSong($id: ID) {
		deleteSong(id: $id) {
			id
		}
	}
`;

export default graphql(mutation)(graphql(query)(SongList));
