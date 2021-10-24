import { useCallback, useState } from 'react';
import { Box, Button, Input } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const AWS_S3_BUCKET = 'baetoru-public';
const AWS_REGION = 'ap-northeast-1';

const myBucket = new AWS.S3({
  params: { Bucket: AWS_S3_BUCKET },
  region: AWS_REGION,
});

const Upload = () => {
  // Uploadしたファイルの保存
  const [uploadImage, setUploadImage] = useState<Array<File>>([]);

  // DropBoxにFileDrop時のAction
  const onDrop = useCallback((acceptedFiles) => {
    console.log('acceptedFiles:', acceptedFiles);
    const tempImage = uploadImage;
    acceptedFiles.forEach((file: File) => {
      tempImage.map((image) => image.name).includes(file.name)
        ? console.log(`${file.name} is Duplicate`)
        : tempImage.push(file);
    });
    setUploadImage(tempImage);
    console.log('uploadImage:', uploadImage);
  }, []);

  // Dropzonの設定
  const { getRootProps, getInputProps, open, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      accept: 'image/*',
      multiple: true,
      noClick: true,
    });

  // Drop成功したファイル＆サイズ集
  const files = uploadImage.map((file: File) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  // 投稿Title
  const [title, setTitle] = useState<string>('');
  const handleTitleInsert = (event: any) => {
    setTitle(event.target.value);
  };

  // 投稿Description
  const [description, setDescription] = useState<string>('');
  const handleDescriptionInsert = (event: any) => {
    setDescription(event.target.value);
  };

  // 投稿時のAction
  const handleSubmit = () => {
    const submitData = {
      res: {
        title: title,
        description: description,
      },
    };
    if (title === '') window.alert('タイトルを記入してください！');
    else {
      uploadFile();
      console.log('Submitted!', submitData);
    }
  };

  // S3にファイルをUpload
  const uploadFile = () => {
    if (uploadImage === []) return;

    const uuid = uuidv4();
    uploadImage.forEach((image, index) => {
      let fileType = image.type.split('/', 2)[1];
      const params = {
        Body: image,
        Bucket: AWS_S3_BUCKET,
        Key: `${uuid}_${index}.${fileType}`,
        ACL: 'public-read',
      };
      console.log(params);
      myBucket.putObject(params).send((err) => {
        if (err) console.log(err);
      });
    });
  };

  // TODO: UI設計
  return (
    <>
      <h1>投稿ページ</h1>
      <h4>Title</h4>
      <Input type="text" value={title} onChange={handleTitleInsert} />
      <h4>Description</h4>
      <Input
        type="text"
        value={description}
        onChange={handleDescriptionInsert}
      />
      <Box {...getRootProps()} height="100px" border="1px">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here</p>
        )}
        <Button onClick={open}>Select files</Button>
      </Box>
      <h4>Added Images</h4>
      <ul>{files}</ul>
      <Button onClick={handleSubmit}>Submit</Button>
    </>
  );
};

export default Upload;
