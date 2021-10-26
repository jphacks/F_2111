import { useState } from "react"
import { uploadFile } from '../utils/upLoadFile';
import { postData } from '../utils/postData';

type State = {
  id: string;
  title: string;
  description?: string;
}

export const useUploadForm = () => {
  const [state, setState] = useState<State>({
    id: '',
    title: '',
    description: '',
  });
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState({ ...state, [event.target.name]: event.target.value })
  };

  const handleSubmit = ({
    file, 
    state
  }: {
    file: File,
    setErrorSubmitState: (v: boolean) => void, 
    state: State,
  }) => {
    const { uuid, submitError } = uploadFile(file);
    const data = { ...state, id: uuid };
    postData(data).then(res => res.json());

    return submitError;
  };

  return {
    state, 
    handleChange, 
    handleSubmit,
  }
}