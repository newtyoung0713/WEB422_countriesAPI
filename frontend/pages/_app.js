import "@/styles/globals.css";
import Layout from '@/components/Layout';
import { SWRConfig } from "swr";
import 'bootstrap/dist/css/bootstrap.min.css';

const fetcher = async (...args) => {
  const response = await fetch(...args);

  if (!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`);
  }

  return response.json();
};

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}
