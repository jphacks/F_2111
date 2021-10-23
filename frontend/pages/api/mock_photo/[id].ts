import type { NextApiRequest, NextApiResponse } from 'next'
import { mockJson } from '../mock_photos';

type Props = {
  res: {
    id: number;
    url: string;
    exif?: any;
    title: string;
    description?: string;
    info?: any;
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Props>
): void {
  const { id } = req.query;
  const response = mockJson.find(m => m.id === Number(id)) ?? { id: 0, title: '', url: '' };
  res.status(200).json({
      res: response
  });
}
