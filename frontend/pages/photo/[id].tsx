import { NextApiRequest } from 'next';
import Head from 'next/head';
import { PhotoWrapper } from '../../src/components/pages/photo/PhotoWrapper';
import { PhotoProps, PhotoType } from '../../src/types';


const Photo = (props: PhotoProps): JSX.Element => {
  const { photo } = props;
  return (
    <>
      <Head>
        <title>{photo.title} | baetoru.com</title>
        <meta name="description" content={`${photo.title} | baetoru.com`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PhotoWrapper {...photo}></PhotoWrapper>
    </>
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
