import { 
  Box, 
  chakra,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
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
        <title>{res.title} | baetoru.com</title>
        <meta name="description" content={`${res.title} | baetoru.com`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box textAlign="center">
        <Image src={res.url} height={400} width={600} quality={100} />
        <chakra.h1 fontSize="2rem">{res.title}</chakra.h1>
        <Table variant="simple" width={600} margin="40px auto 0">
          <Thead>
            <Tr>
              <Th>項目</Th>
              <Th>説明</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Th>コメント</Th>
              <Td>{res?.description}</Td>
            </Tr>
            <Tr>
              <Th>カメラ情報</Th>
              <Td>{res.exif?.camera ?? ''}</Td>
            </Tr>
            <Tr>
              <Th>場所</Th>
              <Td>{res.exif?.place ?? ''}</Td>
            </Tr>
            <Tr>
              <Th>F値</Th>
              <Td>{res.exif?.fvalue ?? ''}</Td>
            </Tr>
            <Tr>
              <Th>ISO</Th>
              <Td>{res.exif?.iso ?? ''}</Td>
            </Tr>
            <Tr>
              <Th>シャッタースピード</Th>
              <Td>{res.exif?.speed ?? ''}</Td>
            </Tr>
          </Tbody>
        </Table>
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