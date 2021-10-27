type Props = {
  id: string;
  title: string;
  description?: string;
};

export const postData = async (data: Props) => {
  return await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/v1/photos`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });
};
