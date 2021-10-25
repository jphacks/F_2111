import { useState } from 'react';
import {
  Heading,
  Text,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
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

  // Dropzonの設定
  const { getRootProps, getInputProps, open, isDragActive, acceptedFiles } =
    useDropzone({
      accept: 'image/*',
      noClick: true,
    });

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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    if (e.target.name === 'title') setInsertTitle(true);
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // S3にファイルをUpload
  const uploadFile = () => {

    const uuid: string = crypto.randomUUID();
    const params = {
      Body: acceptedFiles[0],
      Bucket: AWS_S3_BUCKET,
      Key: `${uuid}-${acceptedFiles[0].name}`,
      ACL: 'public-read',
    };
    console.log(params);
    myBucket.putObject(params).send((err) => {
      if (err) console.log(err);
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
          <Box style={{ marginTop: "10px", marginBottom: "10px" }}>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              name="title"
              placeholder="かっこいいタイトル"
              value={state.title}
              onChange={handleChange}
            />
            <FormErrorMessage>タイトルを書いてください</FormErrorMessage>
          </Box>
        </FormControl>
        <FormControl id="description">
          <Box style={{ marginTop: "10px", marginBottom: "10px" }}>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              placeholder="分かりやすい説明..."
              value={state.description}
              onChange={handleChange}
              height="100px"
            />
          </Box>
        </FormControl>
        <FormControl id="images" isRequired>
          <FormLabel>Upload Images</FormLabel>
          <Box {...getRootProps()} padding="20px" borderWidth="1px" borderRadius="lg" border="1px" textAlign="center">
            <Input {...getInputProps()} />
            <Box marginBottom="10px">
              {isDragActive ? (
                <Text>画像ファイルを追加する</Text>
              ) : (
                <Text>画像ファイルをドロップしてください</Text>
              )}
            </Box>
            <Button type="submit" onClick={open} size="sm">
              Select files
            </Button>
          </Box>
          <Box marginTop="10px">
            <Heading size="sm">Added Image</Heading>
            <Text>
              { acceptedFiles.length !==0 &&
               `${acceptedFiles[0].name} - ${acceptedFiles[0].size} bytes`
              }
            </Text>
          </Box>
      </FormControl>
      <FormControl id="submit">
        <Box style={{ marginTop: "10px", marginBottom: "10px" }}>
          <Button
            type="submit"
            onClick={handleSubmit}
            isDisabled={state.title === '' || acceptedFiles.length === 0}
          >
            Submit
          </Button>
        </Box>
      </FormControl>
    </FormControl>
    </>
  );
};

export default Upload;
