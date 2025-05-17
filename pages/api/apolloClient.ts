import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: new HttpLink({ uri: "/api/graphql" }),
  cache: new InMemoryCache(),
});

export default client;
