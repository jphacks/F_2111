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
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:url" content={`https://baetoru.tetsuzawa.com/photo/${photo.id}`}/>
        <meta property="og:title" content={`${photo.title} | baetoru.com`} />
        <meta property="og:description" content={`${photo.description}`} />
        <meta property="og:image" content={`${photo.url}`} />
        <meta property="twitter:url" content={`https://baetoru.tetsuzawa.com/photo/${photo.id}`} />
        <meta property="twitter:title" content={`${photo.title} | baetoru.com`} />
        <meta property="twitter:description" content={`${photo.description}`} />
        <meta property="twitter:image" content={`${photo.url}`} />
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
