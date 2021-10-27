import AWS from 'aws-sdk';

const AWS_S3_BUCKET = 'baetoru-public';
const AWS_REGION = 'ap-northeast-1';

const myBucket = new AWS.S3({
  credentials: new AWS.Credentials({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY ?? '',
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY ?? '',
  }),
  params: { Bucket: AWS_S3_BUCKET },
  region: AWS_REGION,
});

export const uploadFile = (file: File) => {
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
        submitError,
      };
    })
    .catch(() => {
      submitError = true;
      return {
        uuid,
        url,
        submitError,
      };
    });
};
