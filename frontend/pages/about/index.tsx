import type { NextPage } from 'next';
import { Box, Text } from '@chakra-ui/react';
import Head from 'next/head';

const About: NextPage = () => {
  return (
    <Box>
      <Head>
        <title>About | baetoru.com</title>
        <meta name="description" content="About | baetoru.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Text>About page</Text>
    </Box>
  );
}

export default About;