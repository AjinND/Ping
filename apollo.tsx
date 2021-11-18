import { ApolloClient, createHttpLink, InMemoryCache  } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const CLIENT_HTTP_URI = 'http://192.168.1.5:4000/graphql/';
const CLIENT_WS_URI = 'ws://192.168.1.5:4000/graphql/';

const httpLink = createHttpLink({
  uri: CLIENT_HTTP_URI,
});

const authLink = setContext(async(_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token || "",
    }
  }
});

const wsLink = new WebSocketLink({
  uri: CLIENT_WS_URI,
  options: {
    reconnect: true,
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export const client = new ApolloClient({
    // link: authLink.concat(httpLink),
    link: authLink.concat(splitLink),
    cache: new InMemoryCache()
});
  