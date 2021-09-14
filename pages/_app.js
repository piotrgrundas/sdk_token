import "../styles/global.css";
import { createSaleorClient, SaleorProvider, useAuth } from "@saleor/sdk";

export default function App({ Component, pageProps }) {
  const saleorClient = createSaleorClient({
    apiUrl: process.env.NEXT_PUBLIC_API_URI,
    channel: "gb",
    autologin: true,
  });

  return (
    <SaleorProvider client={saleorClient}>
      <Component {...pageProps} />
    </SaleorProvider>
  );
}
