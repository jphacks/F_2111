import { Box, chakra } from '@chakra-ui/react';
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
        <title>Home | baetoru.com</title>
        <meta name='description' content='Home | baetoru.com' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <chakra.h1>{res.name}</chakra.h1>
      <chakra.p>{res.age}</chakra.p>
    </Box>
  );
}

export const getServerSideProps = async () => ({
    props: {
      res: {
        name: 'takurinton', 
        age: 21, 
      }
    }
  })
export default Home;
