type Props = {
  id: string;
  title: string;
  description?: string;
}

export const postData = async (data: Props) => {
  return await fetch('', {
    method: 'POST', 
    body: JSON.stringify(data), 
    headers: { 'Content-Type': 'application/json' },
  });
}