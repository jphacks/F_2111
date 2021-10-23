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
      <Flex flexWrap="wrap" justifyContent="center">
        {
          res.map(p => (
              <Box 
                key={p.id} 
                margin="5px 5px"
                height={300}
                width={450}
                overflow="hidden"
                position="relative"
              >
                <Box _hover={{ 
                  transform: 'scale(1.2)',
                  transition: 'transform .5s',  
                  filter: 'brightness(50%)',
                }}>
                  <Link href="/photo/[id]" as={`/photo/${p.id}`}>
                    <a>
                      <Image src={p.url} height={300} width={450} quality={30} />
                    </a>
                  </Link>
                </Box>
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
