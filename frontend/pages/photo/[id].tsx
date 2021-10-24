import { 
  Box, 
  chakra,
} from '@chakra-ui/react';
import { NextApiRequest } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import { Map } from '../../src/components/pages/photo/Map';
import { InfoTable } from '../../src/components/pages/photo/InfoTable';
import { PhotoProps, PhotoType } from '../../src/types';


const Photo = (props: PhotoProps): JSX.Element => {
  const { res } = props;

  return (
    <Box>
      <Head>
        <title>{res.title} | baetoru.com</title>
        <meta name="description" content={`${res.title} | baetoru.com`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box textAlign="center">
        <Image src={res.url} height={400} width={600} quality={100} />
        <chakra.h1 fontSize="2rem">{res.title}</chakra.h1>
        <InfoTable {...res} />
      </Box>
      <Map {...res.exif}/>
    </Box>
  )
}

export const getServerSideProps = async (req: NextApiRequest): Promise<{
    props: PhotoType
}> => {
    const { id } = req.query;
    const res = await fetch(`http://localhost:3000/api/mock_photo/${Number(id)}`);
    const data = await res.json() as PhotoType;

    return {
      props: data
    }
  }
export default Photo;