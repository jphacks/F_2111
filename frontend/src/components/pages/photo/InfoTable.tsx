import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
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
        <Td>{res.exif?.datetimeOriginal ?? ''}</Td>
      </Tr>
      <Tr>
        <Th>コメント</Th>
        <Td>{res?.description}</Td>
      </Tr>
      <Tr>
        <Th>カメラメーカー</Th>
        <Td>{res.exif?.make ?? ''}</Td>
      </Tr>
      <Tr>
        <Th>カメラ情報</Th>
        <Td>{res.exif?.model ?? ''}</Td>
      </Tr>
      <Tr>
        <Th>レンズ情報</Th>
        <Td>{res.exif?.lensModel ?? ''}</Td>
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
        <Td>{res.exif?.fnumber ?? ''}</Td>
      </Tr>
      <Tr>
        <Th>ISO</Th>
        <Td>{res.exif?.photoGraphicSensitivity ?? ''}</Td>
      </Tr>
      <Tr>
        <Th>シャッタースピード</Th>
        <Td>{res.exif?.shutterSpeedValue ?? ''}</Td>
      </Tr>
      <Tr>
        <Th>ホワイトバランス</Th>
        <Td>{res.exif?.whiteBalance ?? ''}</Td>
      </Tr>
    </Tbody>
  </Table>
);
