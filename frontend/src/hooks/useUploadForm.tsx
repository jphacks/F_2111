import { useState } from 'react';
import { PhotoType } from '../types';
import { postData } from '../utils/postData';

type State = {
  title: string;
  description?: string;
};

export const useUploadForm = () => {
  const [state, setState] = useState<State>({
    title: '',
    description: '',
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  interface ResType {
    photo: PhotoType;
    submitError: boolean;
  }

  const handleSubmit = async ({
    file,
    state,
  }: {
    file: File | undefined;
    state: State;
  }): Promise<ResType> => {
    const formData = new FormData();
    const data = { ...state };
    // @ts-ignore
    formData.append('image', file);
    formData.append('data', JSON.stringify(data));
    const { photo } = await postData(formData).then(async (res) => res.json());
    return {
      photo,
      submitError: false,
    };
  };

  return {
    state,
    handleChange,
    handleSubmit,
  };
};
