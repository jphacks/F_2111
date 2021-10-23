import { useCallback, useState } from 'react';
import { Box, Button,Input } from '@chakra-ui/react';
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

  const [title,setTitle] = useState<string>("");
  const handleTitleInsert = (event: any) => {
    setTitle(event.target.value);
  }

  const [description,setDescription] = useState<string>("");
  const handleDescriptionInsert = (event: any) => {
    setDescription(event.target.value);
  }

  const handleSubmit = () => {
    const submitData = {
        res: {
            title: title,
            description: description
        }
    }
    console.log("Submitted!");
  }

  return (
    <>
      <h1>投稿ページ</h1>
      <h4>Title</h4>
      <Input type="text" value={title} onChange={handleTitleInsert}/>
      <h4>Description</h4>
      <Input type="text" value={description} onChange={handleDescriptionInsert}/>
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