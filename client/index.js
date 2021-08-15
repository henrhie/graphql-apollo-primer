import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import SongList from './components/SongList';
import { Route, HashRouter } from 'react-router-dom';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	cache: new InMemoryCache({
		typePolicies: {
			SongType: {
				keyFields: ['id'],
			},
			LyricType: {
				keyFields: ['id'],
			},
		},
	}),
});

const Root = () => {
	return (
		<ApolloProvider client={client}>
			<HashRouter>
				<Switch>
					<Route path='/' component={SongList} exact />
					<Route path='/songs/new' component={SongCreate} exact />
					<Route path='/songs/:id' component={SongDetail} exact />
				</Switch>
			</HashRouter>
		</ApolloProvider>
	);
};

ReactDOM.render(<Root />, document.querySelector('#root'));
