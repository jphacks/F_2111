import { useState } from 'react';
import { uploadFile } from '../utils/upLoadFile';
import { postData } from '../utils/postData';

type State = {
  id: string;
  title: string;
  description?: string;
};

export const useUploadForm = () => {
  const [state, setState] = useState<State>({
    id: '',
    title: '',
    description: '',
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async ({
    file,
    state,
  }: {
    file: File | undefined;
    state: State;
  }) => {
    const formData = new FormData();
    // const { uuid, url, submitError } = await uploadFile(file);
    const data = { ...state };
    formData.append('data', JSON.stringify(data));
    formData.append('image', file);
    await postData(formData).then((res) => res.json());
    return {
      uuid: '',
      submitError: false,
    };
  };

  return {
    state,
    handleChange,
    handleSubmit,
  };
};
