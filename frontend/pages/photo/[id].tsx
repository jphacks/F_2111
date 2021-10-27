import { Box, chakra } from '@chakra-ui/react';
import { NextApiRequest } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import { Map } from '../../src/components/pages/photo/Map';
import { InfoTable } from '../../src/components/pages/photo/InfoTable';
import { PhotoProps, PhotoType } from '../../src/types';

const Photo = (props: PhotoProps): JSX.Element => {
  const { photo } = props;

  return (
    <Box>
      <Head>
        <title>{photo.title} | baetoru.com</title>
        <meta name="description" content={`${photo.title} | baetoru.com`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box textAlign="center" margin="auto">
        <Box padding="40px 0" background="#333333" width="100vmax">
          <Box
            boxShadow="8px 8px 8px rgba(0,0,0,0.7)"
            height={400}
            width={600}
            margin="0 auto 20px"
            borderRadius="5px"
            overflow="hidden"
          >
            <Image
              src={photo.url}
              height={400}
              width={600}
              quality={80}
              priority
            />
          </Box>
          <chakra.h1 fontSize="2rem" textColor="white" fontWeight="800">
            {photo.title}
          </chakra.h1>
        </Box>
        <InfoTable {...photo} />
      </Box>
      {photo.exif ? (
        <Map {...photo.exif} image={photo.url} title={photo.title} />
      ) : (
        <Box textAlign="center" margin="50px 0">
          <chakra.h1 fontSize="1.2rem">
            この写真には位置情報がありません。
          </chakra.h1>
        </Box>
      )}
    </Box>
  );
};

export const getServerSideProps = async (
  req: NextApiRequest,
): Promise<{
  props: PhotoType;
}> => {
  const { id } = req.query;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SSR_HOST}/api/v1/photos/${id}`,
  );
  const data = (await res.json()) as PhotoType;

  return {
    props: data,
  };
};
export default Photo;
