import { Box, Flex } from '@chakra-ui/react';
import Head from 'next/head';
import { Photo } from '../src/components/pages/home/Photo';
import { PhotosProps } from '../src/types';

const Home = (props: PhotosProps): JSX.Element => {
  const { photos } = props;
  return (
    <Box>
      <Head>
        <title>Home | baetoru.com</title>
        <meta name="description" content="映える写真や撮り方を共有できるサービス、baetoruです。" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:url" content="https://baetoru.tetsuzawa.com" />
        <meta property="og:title" content="Home | baetoru.com" />
        <meta property="og:description" content="映える写真や撮り方を共有できるサービス、baetoruです。" />
        <meta property="og:image" content="https://baetoru.tetsuzawa.com/Logo.jpg" />
        <meta property="twitter:url" content="https://baetoru.tetsuzawa.com" />
        <meta property="twitter:title" content="Home | baetoru.com" />
        <meta property="twitter:description" content="映える写真や撮り方を共有できるサービス、baetoruです。" />
        <meta property="twitter:image" content="https://baetoru.tetsuzawa.com/Logo.jpg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex flexWrap="wrap" justifyContent="center" marginTop="5px">
        {photos ? photos.map((p) => <Photo key={p.id} {...p} />) : ''}
      </Flex>
    </Box>
  );
};

export const getServerSideProps = async (): Promise<{
  props: PhotosProps;
}> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SSR_HOST}/api/v1/photos`);
  const data = (await res.json()) as PhotosProps;

  return {
    props: data,
  };
};
export default Home;
