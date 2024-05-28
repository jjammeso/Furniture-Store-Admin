import Layout from "@/Components/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
})

export default function App({ Component, pageProps }) {
  return (
    <main className={poppins.className}>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </main>
  )
}
