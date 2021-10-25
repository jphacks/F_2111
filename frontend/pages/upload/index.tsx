import Head from 'next/head'
import { useState } from 'react';
import {
  Heading,
  Text,
  Image,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Button,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useUploadForm } from '../../src/hooks/useUploadForm';


const Style = {
  Box: { marginTop: "10px", marginBottom: "10px" }
};

const Upload = (): JSX.Element => {
  const {
    state, 
    handleChange,
    handleSubmit
  } = useUploadForm();

  const toast = useToast()
  const pop = (Body: string, Status: "success" | "error") => {
    toast({
      title: Body,
      status: Status,
      duration: 3000,
      isClosable: true,
    });
  };

  const message = (Body: string, Status: "success" | "error") => (
    <Alert status={Status} size="small">
      <AlertIcon />
      <AlertTitle mr={2}>{Body}</AlertTitle>
    </Alert>
  );

  const [file, setFile] = useState<File>();
  const onDropAccepted = (acceptedFile: File[]) => {
    setFile(acceptedFile[0]);
    if (file === undefined) pop("画像をアップロードしました", "success");
    else pop("画像を更新しました", "success");
  };
  const onDropRejected = () => {
    pop("このファイルはアップロードできません", "error");
  };
  // Dropzoneの設定
  const { getRootProps, getInputProps, open, isDragActive } =
    useDropzone({
      onDropAccepted,
      onDropRejected,
      accept: 'image/*',
      noClick: true,
    });
    
  const { 
    type, 
    style, 
    onChange, 
    onClick,
    autoComplete, 
    ref,
  } = getInputProps();

  const [insertTitle, setInsertTitle] = useState<boolean>(false);
  const onChangeForm = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleChange(event);
  };

  const [clickSubmit, setClickSubmit] = useState<boolean>(false);
  const [errorSubmit, setErrorSubmit] = useState<boolean>(false);

  const onSubmitForm = async () => {
    const submitError = handleSubmit({ file, state })
    setClickSubmit(true);
    setErrorSubmit(submitError);
  };

  // TODO: UI設計
  return (
    <>
      <Head>
        <title>投稿ページ</title>
      </Head>
      <Heading>投稿ページ</Heading>
      <FormControl id="post">
        <FormControl
          id="title"
          isRequired
          isInvalid={insertTitle && state.title === ''}
        >
          <Box style={Style.Box}>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              name="title"
              placeholder="かっこいいタイトル"
              value={state.title}
              onChange={onChangeForm}
            />
            <FormErrorMessage>タイトルを書いてください</FormErrorMessage>
          </Box>
        </FormControl>
        <FormControl id="description">
          <Box style={Style.Box}>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              placeholder="分かりやすい説明..."
              value={state.description}
              onChange={onChangeForm}
              height="100px"
            />
          </Box>
        </FormControl>
        <FormControl id="images" isRequired>
          <FormLabel>Upload Images</FormLabel>
          <Box {...getRootProps()} style={Style.Box} padding="20px" borderWidth="1px" borderRadius="lg" border="1px" textAlign="center">
            <Input type={type} multiple={false} onChange={onChange} onClick={onClick} autoComplete={autoComplete} tabIndex={-1} ref={ref} style={style} />
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
          <Box style={Style.Box}>
            <Heading size="sm">Added Image</Heading>
            {file !== undefined && (
              <>
                <Image src={URL.createObjectURL(file)} width={200} quality={100} />
                <Text>
                  {file.name} - {file.size} bytes
                </Text>
              </>
            )}
          </Box>
        </FormControl>
        <FormControl id="submit">
          <Box style={Style.Box}>
            <Button
              type="submit"
              onClick={onSubmitForm}
              isLoading={clickSubmit}
              isDisabled={state.title === '' || file === undefined}
            >
              Submit
            </Button>
          </Box>
        </FormControl>
      </FormControl>
      {errorSubmit && message("予期せぬエラーが起こりました", "error")}
    </>
  );
};

export default Upload;
