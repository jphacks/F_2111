type Props = {
  id: string;
  title: string;
  description?: string;
};

export const postData = async (formData: FormData) => {
  // Content-Type: multipart/form-data は明示的に書かなくて良い
  return await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/v1/photos`, {
    method: 'POST',
    body: formData,
  });
};
