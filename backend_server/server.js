const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

const typeDefs = gql`
  type CryptoPrice {
    coin: String!
    usd: Float
  }

  type Query {
    cryptoPrices: [CryptoPrice]
  }
`;

const supportedCoins = ['bitcoin', 'ethereum', 'solana', 'jupiter', 'saros', 'bonk'];

const resolvers = {
  Query: {
    cryptoPrices: async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,jupiter,saros,bonk&vs_currencies=usd'
        );

        return supportedCoins.map((coin) => ({
          coin,
          usd: response.data[coin]?.usd,
        }));
      } catch (error) {
        console.error('Error fetching crypto prices:', error.message);
        return [];
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
