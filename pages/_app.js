import "../styles/global.css";
import { createSaleorClient, SaleorProvider, useAuth } from "@saleor/sdk";
import { ApolloProvider } from "@apollo/client";

import { initializeApollo } from "../client";
import { useMemo } from "react";

function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}

export default function App({ Component, pageProps }) {
  const saleorClient = createSaleorClient({
    apiUrl: process.env.NEXT_PUBLIC_API_URI,
    channel: "gb",
    autologin: true,
  });

  const apolloClient = useApollo(null);

  return (
    <ApolloProvider client={apolloClient}>
      <SaleorProvider client={saleorClient}>
        <Component {...pageProps} />
      </SaleorProvider>
    </ApolloProvider>
  );
}
