import { Box, Flex } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Photo } from '../src/components/pages/home/Photo';
import { PhotosProps } from '../src/types';

const Home = (props: PhotosProps): JSX.Element => {
  const { res } = props;

  return (
    <Box>
      <Head>
        <title>Home | baetoru.com</title>
        <meta name='description' content='Home | baetoru.com' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Flex flexWrap="wrap" justifyContent="center" marginTop="5px">
        {
          res.map(p => <Photo key={p.id} {...p} />)
        }
      </Flex>
    </Box>
  );
}

export const getStaticProps: GetStaticProps<PhotosProps> = async (): Promise<{
  props: PhotosProps
}> => {
  const res = await fetch('http://localhost:3000/api/mock_photos');
  const data = await res.json() as PhotosProps;

  return {
    props: data, 
    revalidate: 60,
  }
}
export default Home;
