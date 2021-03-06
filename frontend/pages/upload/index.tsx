import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  Heading,
  Text,
  Image,
  Box,
  Container,
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
  Box: { marginTop: '10px', marginBottom: '10px' },
  Box2: {
    marginTop: '10px',
    marginBottom: '10px',
    padding: "10px",
    border: "1px",
    borderColor: "orange",
    borderRadius: "5px",
    background: "white"
  },
  Container: {
    backgroundColor: "rgb(255 199 142 / 70%)",
    backdropFilter: "blur(2px)",
    paddingTop: "20px",
    paddingBottom: "10px"
  },
  Form: {
    paddingBottom: "2px",
    borderBottom: "1px",
    borderBottomWidth: "2px",
    width: "45%",
    borderColor: "orange",
    fontSize: "100%"
  },
  FormInput: {
    focusBorderColor: "Orange",
    borderColor: "orange",
    background: "white"
  },
  FormTextArea: {
    height: "100px",
    focusBorderColor: "Orange",
    borderColor: "orange",
    background: "white"
  },
  DDBox: {
    marginTop: '10px',
    marginBottom: '10px',
    padding: "20px",
    borderWidth: "2px",
    borderRadius: "20px",
    border: "1px",
    textAlign: "center",
    borderColor: "orange",
    background: "white"
  },
  Image: {
    position: "fixed",
    height: "100vh",
    opacity: "20%",
  }
};

const Upload = (): JSX.Element => {
  const { state, handleChange, handleSubmit } = useUploadForm();
  const router = useRouter();

  const toast = useToast();
  const pop = (Body: string, Status: 'success' | 'error') => {
    toast({
      title: Body,
      status: Status,
      duration: 3000,
      isClosable: true,
    });
  };

  const message = (Body: string, Status: 'success' | 'error') => (
    <Alert status={Status} size="small">
      <AlertIcon />
      <AlertTitle mr={2}>{Body}</AlertTitle>
    </Alert>
  );

  const [file, setFile] = useState<File>();
  const onDropAccepted = (acceptedFile: File[]) => {
    setFile(acceptedFile[0]);
    if (file === undefined) pop('???????????????????????????????????????', 'success');
    else pop('???????????????????????????', 'success');
  };
  const onDropRejected = () => {
    pop('??????????????????????????????????????????????????????', 'error');
  };
  // Dropzone?????????
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDropAccepted,
    onDropRejected,
    accept: 'image/*',
    noClick: true,
  });

  const { type, style, onChange, onClick, autoComplete, ref } = getInputProps();

  const [noTitle, setNoTitle] = useState<boolean>(false);
  const onChangeForm = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.target.name === 'title' && state.title === '') setNoTitle(true);
    handleChange(event);
  };

  const [clickSubmit, setClickSubmit] = useState<boolean>(false);
  const [errorSubmit, setErrorSubmit] = useState<boolean>(false);

  const onSubmitForm = async () => {
    const { id, error } = await handleSubmit({ file, state });
    setClickSubmit(true);
    setErrorSubmit(error);
    (error) ? setClickSubmit(false) : router.push(`/photo/${id}`);
  };

  // TODO: UI??????
  return (
    <>
      <Head>
        <title>?????? | baetoru.com</title>
        <meta name="description" content="Upload | baetoru.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:url" content="https://baetoru.tetsuzawa.com/upload" />
        <meta property="og:title" content="Upload | baetoru.com" />
        <meta property="og:description" content="????????????????????????????????????????????????????????????baetoru?????????" />
        <meta property="og:image" content="https://baetoru.tetsuzawa.com/Logo.jpg" />
        <meta property="twitter:url" content="https://baetoru.tetsuzawa.com/upload" />
        <meta property="twitter:title" content="Upload | baetoru.com" />
        <meta property="twitter:description" content="????????????????????????????????????????????????????????????baetoru?????????" />
        <meta property="twitter:image" content="https://baetoru.tetsuzawa.com/Logo.jpg" />
        <meta name="description" content="?????? | baetoru.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="/Background.jpg"
        display={{ base: "none", sm: "fixed" }}
        style={{
          position: "fixed",
          height: "100vh",
          opacity: "20%",
        }}
      />
      <Container style={Style.Container} height={file === undefined ? "100vh" : "100%"}>
        <Heading marginBottom="10px">???????????????</Heading>
        <FormControl id="post">
          <FormControl
            id="title"
            isRequired
            isInvalid={noTitle && state.title === ''}
          >
            <Box style={Style.Box}>
              <FormLabel {...Style.Form}>Title</FormLabel>
              <Input
                type="text"
                name="title"
                placeholder="???????????????????????????"
                value={state.title}
                onChange={onChangeForm}
                {...Style.FormInput}
              />
              <FormErrorMessage>????????????????????????????????????</FormErrorMessage>
            </Box>
          </FormControl>
          <FormControl id="description">
            <Box style={Style.Box}>
              <FormLabel {...Style.Form}>Description</FormLabel>
              <Textarea
                name="description"
                placeholder="????????????????????????..."
                value={state.description}
                onChange={onChangeForm}
                {...Style.FormTextArea}
              />
            </Box>
          </FormControl>
          <FormControl id="images" isRequired>
            <FormLabel {...Style.Form}>Upload Images</FormLabel>
            <Box
              style={{
                marginTop: '10px',
                marginBottom: '10px',
                padding: "20px",
                borderWidth: "2px",
                borderRadius: "20px",
                border: "1px",
                textAlign: "center",
                borderColor: "orange",
                background: "white"
              }} {...getRootProps()}
            >
              <Input
                type={type}
                multiple={false}
                onChange={onChange}
                onClick={onClick}
                autoComplete={autoComplete}
                tabIndex={-1}
                ref={ref}
                style={style}
              />
              <Box style={Style.Box}>
                {isDragActive ? (
                  <Text display={{ base: "none", sm: "inherit" }}>?????????????????????????????????</Text>
                ) : (
                  <Text display={{ base: "none", sm: "inherit" }}>???????????????????????????????????????????????????</Text>
                )}
                <Button type="submit" colorScheme="orange" variant="solid" onClick={open} size="sm">
                  Select files
                </Button>
              </Box>
            </Box>
            <Box style={Style.Box}>
              <Heading size="sm">[Added Image]</Heading>
              {file !== undefined ? (
                <Box {...Style.Box2}>
                  <Image
                    src={URL.createObjectURL(file)}
                    width={300}
                    quality={100}
                    padding="10px"
                    border="1px"
                  />
                  <Text>
                    {file.name} - {file.size} bytes
                  </Text>
                </Box>
              ) : (
                <Text>??????????????????????????????</Text>
              )}
            </Box>
          </FormControl>
          <FormControl id="submit">
            <Box style={Style.Box}>
              <Button
                type="submit"
                onClick={onSubmitForm}
                variant="solid"
                colorScheme="pink"
                isLoading={clickSubmit}
                isDisabled={state.title === '' || file === undefined}
              >
                Submit
              </Button>
            </Box>
          </FormControl>
        </FormControl>
        {errorSubmit && message('??????????????????????????????????????????', 'error')}
      </Container>
    </>
  );
};

export default Upload;
