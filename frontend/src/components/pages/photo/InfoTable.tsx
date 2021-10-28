import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { PhotoType } from '../../../types';

export const InfoTable = (res: PhotoType): JSX.Element => {
  let flashStr = '';
  if (res.exif?.flash !== undefined && res.exif.flash !== null) {
    {
      /* TODO: より多くの情報に対応する 赤目発光ありとか */
    }
    flashStr = res.exif?.flash & 1 ? 'ストロボ発光あり' : 'ストロボ発光なし';
  }

  let whiteStr = '';
  if (res.exif?.whiteBalance !== undefined && res.exif.whiteBalance !== null) {
    whiteStr =
      res.exif?.whiteBalance & 1
        ? 'ホワイトバランス自動'
        : 'ホワイトバランスマニュアル';
  }

  return (
    <Table variant="simple" width="100vmax" margin="40px auto 0">
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
          <Td>{flashStr}</Td>
        </Tr>
        <Tr>
          <Th>場所</Th>
          <Td>{''}</Td>
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
          <Td>{whiteStr}</Td>
        </Tr>
      </Tbody>
    </Table>
  );
};
