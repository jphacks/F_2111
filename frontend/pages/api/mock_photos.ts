import type { NextApiRequest, NextApiResponse } from 'next'

export const mockJson = [
  {
    id: 1,
    title: 'hogehoge', 
    url: '/a.JPG', 
  },
  {
    id: 2,
    title: 'fugafuga',
    url: '/b.JPG',
  },
  {
    id: 3,
    title: 'piyo',
    url: '/c.JPG',
  },
]

type Props = {
  res: {
    id: number;
    url: string;
    exif?: any;
    title: string;
    description?: string;
    info?: any;
  }[]
}

export default function handler(
  _: NextApiRequest,
  res: NextApiResponse<Props>
): void {
  res.status(200).json({
    res: mockJson
  });
}