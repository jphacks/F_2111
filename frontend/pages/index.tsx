import { useState, useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Head from 'next/head';
import { Photo } from '../src/components/pages/home/Photo';
import { PhotosProps, PhotoType } from '../src/types';
import { useIntersection } from '../src/hooks/useIntersection';

const getPhotos = async (page: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/v1/photos/search?page=${page}&perPage=16`);
  return await res.json();
};

const Home = (props: PhotosProps): JSX.Element => {
  const { photos } = props;
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<PhotoType[] | null>(photos);
  const intersection = useIntersection();

  const handleSearch = () => {
    getPhotos(page)
      .then(res => {
        if (res.photos !== null) {
          const r = result ?? [] as PhotoType[];
          setResult([...r, ...res.photos]);
          setPage(page + 1);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (intersection) handleSearch();
  }, [intersection]);

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
        {result ? result.map((p, idx) => <Photo key={idx} {...p} />) : ''}
      </Flex>
    </Box>
  );
};

export const getServerSideProps = async (): Promise<{
  props: PhotosProps;
}> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SSR_HOST}/api/v1/photos/search?page=0&perPage=16`);
  const data = (await res.json());

  return {
    props: data,
  };
};
export default Home;
