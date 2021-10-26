import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { PhotoType } from '../../../types';

export const InfoTable = (res: PhotoType): JSX.Element => (
    <Table 
      variant="simple" 
      width="100vmax"
      margin="40px auto 0">
    <Thead>
      <Tr>
        <Th>項目</Th>
        <Th>説明</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Th>撮影日時</Th>
        <Td>{res.exif?.datetime ?? ''}</Td>
      </Tr>
      <Tr>
        <Th>コメント</Th>
        <Td>{res?.description}</Td>
      </Tr>
      <Tr>
        <Th>カメラメーカー</Th>
        <Td>{res.exif?.maker ?? ''}</Td>
      </Tr>
      <Tr>
        <Th>カメラ情報</Th>
        <Td>{res.exif?.camera ?? ''}</Td>
      </Tr>
      <Tr>
        <Th>レンズ情報</Th>
        <Td>{res.exif?.lens ?? ''}</Td>
      </Tr>
      <Tr>
        <Th>フラッシュ</Th>
        <Td>{res.exif?.flash ?? ''}</Td>
      </Tr>
      <Tr>
        <Th>場所</Th>
        <Td>{res.exif?.place ?? ''}</Td>
      </Tr>
      <Tr>
        <Th>方角</Th>
        <Td>{res.exif?.compass ?? ''}</Td>
      </Tr>
      <Tr>
        <Th>F値</Th>
        <Td>{res.exif?.fvalue ?? ''}</Td>
      </Tr>
      <Tr>
        <Th>ISO</Th>
        <Td>{res.exif?.iso ?? ''}</Td>
      </Tr>
      <Tr>
        <Th>シャッタースピード</Th>
        <Td>{res.exif?.speed ?? ''}</Td>
      </Tr>
    </Tbody>
  </Table>
  )