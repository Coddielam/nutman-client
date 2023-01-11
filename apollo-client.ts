import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://cms.nutman.link/graphql',
  cache: new InMemoryCache(),
});

export default client;
