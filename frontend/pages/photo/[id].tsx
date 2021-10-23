import { Box, chakra } from '@chakra-ui/react';
import { NextApiRequest } from 'next';
import Image from 'next/image';
import Head from 'next/head';

type Props = {
  res: {
    url: string;
    exif?: any;
    title: string;
    description?: string;
    info?: any;
  }
}

const Photo = (props: Props): JSX.Element => {
  const { res } = props;

  return (
    <Box>
      <Head>
        <title>About | baetoru.com</title>
        <meta name="description" content="About | baetoru.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Image src={res.url} height={200} width={300} quality={30} />
        <chakra.h1>{res.title}</chakra.h1>
      </Box>
    </Box>
  )
}

export const getServerSideProps = async (req: NextApiRequest): Promise<{
    props: Props
}> => {
    const { id } = req.query;
    const res = await fetch(`http://localhost:3000/api/mock_photo/${Number(id)}`);
    const data = await res.json() as Props;

    return {
      props: data
    }
  }
export default Photo;