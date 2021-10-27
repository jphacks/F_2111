import type { NextApiRequest, NextApiResponse } from 'next'

import AWS from 'aws-sdk';

const AWS_S3_BUCKET = 'baetoru-public';
const AWS_REGION = 'ap-northeast-1';

const myBucket = new AWS.S3({
  credentials: new AWS.Credentials({
    accessKeyId: process.env.AWS_ACCESS_KEY ?? '',
    secretAccessKey: process.env.AWS_SECRET_KEY ?? '',
  }),
  params: { Bucket: AWS_S3_BUCKET },
  region: AWS_REGION,
});

type Props = {
  id: string;
  title: string;
  description?: string;
}

type BodyProps = {
  id: string;
  title: string;
  description?: string;
  image: File;
}

const uploadFile = (file: File | undefined) => {
  // @ts-ignore
  const uuid = String(crypto.randomUUID());
  const key = `${uuid}-${file?.name}`;
  const url = `https://${process.env.NEXT_PUBLIC_S3URL}/${key.replace(
    /[^\w\d_\-.]+/gi,
    '',
  )}`;
  const params = {
    Body: file,
    Bucket: AWS_S3_BUCKET,
    Key: key,
    ACL: 'public-read',
  };

  let submitError = false;
  const promise = myBucket.putObject(params).promise();
  return promise
    .then(() => {
      return {
        uuid,
        url,
      };
    })
    .catch(() => {
      return {
        uuid,
        url,
      };
    });
};

export const postData = async (data: Props) => {
  return await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/v1/photos`, {
    method: 'POST', 
    body: JSON.stringify(data), 
    headers: { 'Content-Type': 'application/json' },
  });
}

const post = async (props: BodyProps) => {
  const { uuid, url } = await uploadFile(props.image);
  const data = { 
    id: uuid, 
    url: url, 
    title: props.title, 
    description: props.description
  };
  postData(data);
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  if (req.method === 'POST') {
    post(req.body);
    res.status(201).json({
      res: {
        status: "created"
      }
    });
  }
}