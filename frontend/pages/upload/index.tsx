import { useState } from 'react';
import {
  Heading,
  Text,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import AWS from 'aws-sdk';

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
  const onDrop = (acceptedFiles: File[]) => {
    console.log('acceptedFiles:', acceptedFiles);
    const tempImage = uploadImage;
    acceptedFiles.forEach((file: File) => {
      tempImage.map((image) => image.name).includes(file.name) ?
        console.log(`${file.name} is Duplicate`) :
        tempImage.push(file);
    });
    setUploadImage(tempImage);
    console.log('uploadImage:', uploadImage);
  };

  // Dropzonの設定
  const { getRootProps, getInputProps, open, isDragActive } =
    useDropzone({
      onDrop,
      accept: 'image/*',
      noClick: true,
    });

  // Drop成功したファイル＆サイズ集
  const files = uploadImage.map((file: File) => (
    <li key={file.name}>
      <Text>
        {file.name} - {file.size} bytes
      </Text>
    </li>
  ));

  // 投稿内容の変数
  const [state, setState] = useState<{
    id: number;
    title: string;
    description?: string;
  }>({
    id: 0,
    title: '',
    description: '',
  });

  const [insertTitle, setInsertTitle] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'title') setInsertTitle(true);
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // S3にファイルをUpload
  const uploadFile = () => {
    if (uploadImage === []) return;

    const uuid: string = crypto.randomUUID();
    uploadImage.forEach((image: File) => {
      const params = {
        Body: image,
        Bucket: AWS_S3_BUCKET,
        Key: `${uuid}-${image.name}`,
        ACL: 'public-read',
      };
      console.log(params);
      myBucket.putObject(params).send((err) => {
        if (err) console.log(err);
      });
    });
  };
  
  // 投稿時のAction
  const handleSubmit = () => {
    const submitData = {
      title: state.title,
      description: state.description,
    };
    uploadFile();
    console.log('Submitted!', submitData);
  };

  // TODO: UI設計
  return (
    <>
      <Heading>投稿ページ</Heading>
      <FormControl id="post">
        <FormControl
          id="title"
          isRequired
          isInvalid={insertTitle && state.title === ''}
        >
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            name="title"
            placeholder="かっこいいタイトル"
            value={state.title}
            onChange={handleChange}
          />
          <FormErrorMessage>タイトルを書いてください</FormErrorMessage>
        </FormControl>
        <FormControl id="description">
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            name="description"
            placeholder="分かりやすい説明"
            value={state.description}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="images" isRequired>
          <FormLabel>Upload Images</FormLabel>
          <Box {...getRootProps()} height="100px" border="1px">
            <Input {...getInputProps()} />
            {isDragActive ? (
              <Text>Drop the files here ...</Text>
            ) : (
              <Text>Drag 'n' drop some files here</Text>
            )}
            <Button type="submit" onClick={open}>
              Select files
            </Button>
          </Box>
          <Text>Added Images</Text>
          <ul>{files}</ul>
        </FormControl>
        <FormControl id="submit">
          <Button
            type="submit"
            onClick={handleSubmit}
            isDisabled={state.title === '' || uploadImage.length === 0}
          >
            Submit
          </Button>
        </FormControl>
      </FormControl>
    </>
  );
};

export default Upload;
