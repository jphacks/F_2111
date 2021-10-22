import Link from 'next/link';
import { Box, Text, chakra } from '@chakra-ui/react';
import Head from 'next/head';

type Props = {
  res: {
    name: string;
    age: number;
  }
}

const Home = (props: Props) => {
  const { res } = props;
  return (
    <Box>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Home | baetoru.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <chakra.h1>{res.name}</chakra.h1>
      <chakra.p>{res.age}</chakra.p>
      <Link href="/about">
        <a>
          <Text>about page</Text>
        </a>
      </Link>
    </Box>
  );
}

export const getServerSideProps = async () => {
  return {
    props: {
      res: {
        name: 'takurinton', 
        age: 21, 
      }
    }
  }
}
export default Home;
