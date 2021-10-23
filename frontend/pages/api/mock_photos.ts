import type { NextApiRequest, NextApiResponse } from 'next'

export const mockJson = [
  {
    id: 1,
    title: 'hogehoge', 
    url: '/a.JPG', 
    exif: {
      lat: 35.68, 
      lng: 139.68,
    }
  },
  {
    id: 2,
    title: 'fugafuga',
    url: '/b.JPG',
    exif: {
      lat: 35, 
      lng: 139,
    }
  },
  {
    id: 3,
    title: 'piyo',
    url: '/c.JPG',
    exif: {
      lat: -1.283333, 
      lng: 39.816667,
    }
  },
  {
    id: 4, 
    title: 'kyoto', 
    url: 'http://baetoru-public.s3-website-ap-northeast-1.amazonaws.com/sample.jpg',
    exif: {
      lat: 130, 
      lng: 0,
    }
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