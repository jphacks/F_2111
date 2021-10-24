import { Box, Flex } from '@chakra-ui/react';
import Head from 'next/head';
import { Photo } from '../src/components/pages/home/Photo';

type Props = {
  res: {
    id: number;
    url: string;
    exif?: any;
    title: string;
    description?: string;
    info?: any;
  }[]
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
      <Flex flexWrap="wrap" justifyContent="center">
        {
          res.map(p => <Photo key={p.id} {...p} />)
        }
      </Flex>
    </Box>
  );
}

export const getServerSideProps = async (): Promise<{
  props: Props
}> => {
  const res = await fetch('http://localhost:3000/api/mock_photos');
  const data = await res.json() as Props;

  return {
    props: data
  }
}
export default Home;
