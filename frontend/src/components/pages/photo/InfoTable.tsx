import { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, useBreakpointValue } from '@chakra-ui/react';
import { getShutterSpeed } from '../../../utils/getShutterSpeed';
import { PhotoType } from '../../../types';

const Style = {
  head1: {
    backgroundColor: "white",
    fontSize: "25px",
    paddingTop: "15px",
    paddingBottom: "10px",
    width: "40%",
  },
  head2: {
    backgroundColor: "white",
    paddingTop: "15px",
    paddingBottom: "10px",
    fontSize: "25px",
  },
  th: {
    textAlign: "left",
    backgroundColor: "white",
    fontSize: "15px",
    width: "40%"
  },
  td: {
    backgroundColor: "white"
  }
};

type Date = {
  date: string,
  time: string,
  utc: string
}

export const InfoTable = (res: PhotoType): JSX.Element => {
  const [flashStr, setFlashStr] = useState('');
  const [whiteStr, setWhiteStr] = useState('');
  const [placeStr, setPlaceStr] = useState('');

  const isRes = useBreakpointValue({ sm: "md", base: "sm" })
  const [date, setDate] = useState<Date>({
    date: "",
    time: "",
    utc: "",
  });

  const getDate = () => {
    if (res.exif?.datetimeOriginal === undefined) return;
    let tempDate = res.exif?.datetimeOriginal?.split("T").join(",").split("+").join(",").split(",")
    setDate({ date: tempDate[0], time: tempDate[1], utc: tempDate[2] })
  }
  const init = async () => {
    if (res.exif?.flash !== undefined && res.exif.flash !== null) {
      {
        /* TODO: より多くの情報に対応する 赤目発光ありとか */
      }
      const f = res.exif?.flash & 1 ? 'ストロボ発光あり' : 'ストロボ発光なし';
      setFlashStr(f);
    }

    if (res.exif?.whiteBalance !== undefined && res.exif.whiteBalance !== null) {
      const w =
        res.exif?.whiteBalance & 1
          ? 'ホワイトバランス自動'
          : 'ホワイトバランスマニュアル';
      setWhiteStr(w);
    }

    if (
      res.exif?.gpsLatitude !== undefined &&
      res.exif.gpsLatitude !== null &&
      res.exif?.gpsLongitude !== undefined &&
      res.exif.gpsLongitude !== null
    ) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat: res.exif.gpsLatitude, lng: res.exif.gpsLongitude } }, (results: any, status: string) => {
        if (status === google.maps.GeocoderStatus.OK) {
          setPlaceStr(results[0].formatted_address)
        }
      });
    }
    getDate();
  }
  useEffect(() => {
    init();
  }, []);
  return (
    <Table size={isRes} colorScheme="teal">
      <Thead>
        <Tr >
          <Th style={Style.head1}>項目</Th>
          <Th style={Style.head2}>説明</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Th style={Style.th}>撮影日時</Th>
          <Td style={Style.td}>
            {res.exif?.datetimeOriginal !== undefined ?
              `${date.date}　${date.time}` : ''
            }
          </Td>
        </Tr>
        <Tr>
          <Th style={Style.th}>コメント</Th>
          <Td style={Style.td}>{res?.description}</Td>
        </Tr>
        <Tr>
          <Th style={Style.th}>カメラメーカー</Th>
          <Td style={Style.td}>{res.exif?.make ?? ''}</Td>
        </Tr>
        <Tr>
          <Th style={Style.th}>カメラ情報</Th>
          <Td style={Style.td}>{res.exif?.model ?? ''}</Td>
        </Tr>
        <Tr>
          <Th style={Style.th}>レンズ情報</Th>
          <Td style={Style.td}>{res.exif?.lensModel ?? ''}</Td>
        </Tr>
        <Tr>
          <Th style={Style.th}>フラッシュ</Th>
          <Td style={Style.td}>{flashStr}</Td>
        </Tr>
        <Tr>
          <Th style={Style.th}>場所</Th>
          <Td style={Style.td}>{placeStr}</Td>
        </Tr>
        <Tr>
          <Th style={Style.th}>F値</Th>
          <Td style={Style.td}>{res.exif?.fnumber ?? ''}</Td>
        </Tr>
        <Tr>
          <Th style={Style.th}>ISO</Th>
          <Td style={Style.td}>{res.exif?.photoGraphicSensitivity ?? ''}</Td>
        </Tr>
        <Tr>
          <Th style={Style.th}>シャッタースピード</Th>
          <Td style={Style.td}>{getShutterSpeed(res.exif?.shutterSpeedValue)}</Td>
        </Tr>
        <Tr>
          <Th style={Style.th}>ホワイトバランス</Th>
          <Td style={Style.td}>{whiteStr}</Td>
        </Tr>
      </Tbody>
    </Table>
  );
};