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
    await postData({...state, file});
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
