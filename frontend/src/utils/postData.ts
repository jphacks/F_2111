type Props = {
  id: string;
  title: string;
  description?: string;
  file?: File;
}

export const postData = async (props: Props) => {
  const formData = new FormData();
  if (!props.file) {
    return {

    }
  }

  formData.append('image', props.file);

  // TODO リンクを環境変数にする
  return await fetch(`http://localhost:3000/api/uploadFile`, {
    method: 'POST', 
    body: {
      ...formData, 
      ...props,
    },
  });
}
