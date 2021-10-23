import { useCallback, useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';

const Upload = () => {
  const [uploadImage, setUploadImage] = useState<Array<File>>([]);

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

  const { getRootProps, getInputProps, isDragActive, open, acceptedFiles } =
    useDropzone({
      onDrop,
      accept: 'image/*',
      multiple: true,
      noClick: true,
    });

  const files = uploadImage.map((file: File) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  const handleSubmit = () => {
    console.log("Submitted!");
  }

  return (
    <>
      <h4>Title</h4>
      <h4>Description</h4>
      <Box {...getRootProps()} height="100px" border="1px">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here</p>
        )}
        <Button onClick={open}>Select files</Button>
      </Box>
      <h4>Files</h4>
      <ul>{files}</ul>
      <Button onClick={handleSubmit}>Submit</Button>
    </>
  );
};

export default Upload;