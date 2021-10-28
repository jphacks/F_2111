import type { NextApiRequest, NextApiResponse } from 'next'
// import { PhotoProps } from '../../../src/types';
// import { mockJson } from '../mock_photos';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  // const { id } = req.query;
  // const response = mockJson.find(m => m.id === Number(id)) ?? { id: 0, title: '', url: '' };
  // res.status(200).json({
  //     res: response
  // });
  res.status(200).json({
    res: {
      
    }
  })
}
