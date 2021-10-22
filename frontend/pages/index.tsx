import { Box, chakra } from '@chakra-ui/react';
import Head from 'next/head';

type Props = {
  res: {
    name: string;
    age: number;
  }
}

const Home = (props: Props): JSX.Element => {
  const { res } = props;

  return (
    <Box>
      <Head>
        <title>Home | baetoru.com</title>
        <meta name='description' content='Home | baetoru.com' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <chakra.h1>name: {res.name}</chakra.h1>
      <chakra.p>age: {res.age}</chakra.p>
    </Box>
  );
}

export const getServerSideProps = async (): Promise<{
  props: Props
}> => {
  // 一時的な退避
  const res = await fetch('https://api.takurinton.com');
  const json = await res.json() as string;

  return {
    props: {
      res: {
        name: json, 
        age: 21, 
      }
    }
  }
}
export default Home;
