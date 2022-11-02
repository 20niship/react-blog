import '../styles/globals.css'
import { DefaultLayout, NoSidebarLayout } from '../components/Layouts'

const getDefaultLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
}


export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || getDefaultLayout;
  return getLayout(<Component {...pageProps} />);
}

