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
      <Box textAlign="center" margin="auto">
        <Box padding="40px 0" background="#333333">
          <Box 
            boxShadow="8px 8px 8px rgba(0,0,0,0.7)" 
            height={400} 
            width={600} 
            margin="0 auto 20px" 
            borderRadius="5px" 
            overflow="hidden"
          >
            <Image src={res.url} height={400} width={600} quality={80}/>
          </Box>
          <chakra.h1 fontSize="2rem" textColor="white" fontWeight="800">{res.title}</chakra.h1>
        </Box>
        <InfoTable {...res} />
      </Box>
      {
        res.exif 
        ? <Map {...res.exif} image={res.url} title={res.title} />
        : <Box textAlign="center" margin="50px 0">
            <chakra.h1 fontSize="1.2rem">この写真には位置情報がありません。</chakra.h1>
          </Box>
      }
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