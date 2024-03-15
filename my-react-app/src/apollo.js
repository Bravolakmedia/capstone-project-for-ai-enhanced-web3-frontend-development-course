// apollo.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000', // Correct endpoint for your Apollo Server
  cache: new InMemoryCache(),
});

export default client;

