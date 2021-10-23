import { Box, chakra, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

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
      <Flex flexWrap={'wrap'}>
        {
          res.map(p => (
              <Box>
                <Link href="/photo/[id]" as={`/photo/${p.id}`}>
                  <a>
                    <Image src={p.url} height={200} width={300} quality={30} />
                    <chakra.h1>{p.title}</chakra.h1>
                  </a>
                </Link>
              </Box>
            ))
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
