import '../styles/globals.css'
import type { AppProps } from 'next/app'
import dayjs from 'dayjs';
import dayjsJalali from 'jalaliday';

dayjs.extend(dayjsJalali);

function MyApp({ Component, pageProps }: AppProps) {
  return <Component  {...pageProps} />
}

export default MyApp
