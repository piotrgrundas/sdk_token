import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { relayStylePagination } from "@apollo/client/utilities";
import fetch from "cross-fetch";

let apolloClient;

const httpLink = new HttpLink({
  fetch,
  uri: process.env.NEXT_PUBLIC_API_URI,
});

const authLink = setContext((_, { headers }) => {
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("saleorAuthToken");
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      // eslint-disable-next-line no-console
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}\n[Operation]: ${
          operation.operationName
        }: ${JSON.stringify(operation.variables)}`
      )
    );
  }

  if (networkError) {
    // eslint-disable-next-line no-console
    console.error(
      `[Network error]: ${networkError}\n[Operation]: ${
        operation.operationName
      }: ${JSON.stringify(operation.variables)}`
    );
  }
});

function createApolloClient() {
  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        User: {
          fields: {
            orders: relayStylePagination(),
          },
        },
      },
    }),
    link: from([errorLink, authLink.concat(httpLink)]),
    // set to true for SSR
    ssrMode: typeof window === "undefined",
  });
}
export function initializeApollo(initialState = null) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") {
    return _apolloClient;
  }

  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = _apolloClient;
  }
  return _apolloClient;
}
