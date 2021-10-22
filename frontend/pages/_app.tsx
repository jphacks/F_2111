import type { AppProps } from 'next/app';
import { ChakraProvider } from "@chakra-ui/react";
import Header from '../src/components/Header';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => (
    <ChakraProvider>
      <Header />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </ChakraProvider>
  )

export default MyApp;
