import AWS from 'aws-sdk';

const AWS_S3_BUCKET = 'baetoru-public';
const AWS_REGION = 'ap-northeast-1';

const myBucket = new AWS.S3({
  params: { Bucket: AWS_S3_BUCKET },
  region: AWS_REGION,
});

export const uploadFile = (file: File) => {
  // @ts-ignore
  const uuid = String(crypto.randomUUID());
  const params = {
    Body: file,
    Bucket: AWS_S3_BUCKET,
    Key: `${uuid}-${file?.name}`,
    ACL: 'public-read',
  };

  let submitError = false;
  myBucket.putObject(params).send((err) => {
    if (err) {
      submitError = true;
    }
  });

  return {
    uuid, 
    submitError, 
  }
};
