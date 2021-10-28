type Props = {
  id: string;
  title: string;
  description?: string;
}

export const postData = async (formData: FormData) => {
  return await fetch('http://app:8080/api/v1/photos', {
  // return await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/v1/photos`, {
    method: 'POST', 
    body: formData, 
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}