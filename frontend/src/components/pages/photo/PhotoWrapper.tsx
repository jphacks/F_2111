import { Box, Container, Text, Heading, Image as Img } from '@chakra-ui/react';
import Image from 'next/image';
import { Wrapper } from '@googlemaps/react-wrapper';
import { Map } from './Map';
import { InfoTable } from './InfoTable';
import { Render } from './Render';
import { PhotoType } from '../../../types';

const Style = {
  Box: { marginTop: '10px', marginBottom: '25px' },
  Container: {
    paddingTop: "20px",
    backgroundColor: "rgb(255 199 142 / 70%)",
    backdropFilter: "blur(2px)",
    height: "100%",
    paddingBottom: "10px",
    textAlign: "-webkit-center"
  },
  Heading: {
    fontSize: "200%",
    fontWeight: "700",
    paddingBottom: "2px",
    marginBottom: "10px",
    borderBottom: "1px",
    borderBottomWidth: "2px",
    borderColor: "orange",
    textAlign: "center"
  },
  ImageBox: {
    background: "white",
    width: "90%",
    padding: "10px",
    borderWidth: "2px",
    borderColor: "orange",
    borderRadius: "5px",
    textAlign: "center",
    marginBottom: "10px",
  },
  Image: {
    position: "fixed",
    height: "100vh",
    opacity: "20%",
  }
};

export const PhotoWrapper = (photo: PhotoType): JSX.Element => (
  <Wrapper
    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY ?? ''}
    render={Render}
  >
    <Container maxWidth={{ base: "110vh" }} style={Style.Container}>
      <Heading style={Style.Heading}>写真詳細ページ</Heading>
      <Box style={Style.ImageBox}>
        <Image
          src={photo.url}
          height={400}
          width={400}
          quality={100}
          priority
        />
        <Text>タイトル：　{photo.title}</Text>
      </Box>
      <Box style={Style.Box}>
        {photo.exif?.gpsLatitude && photo.exif?.gpsLongitude ? (
          <Map
            lat={photo.exif?.gpsLatitude ?? 0}
            lng={photo.exif?.gpsLongitude ?? 0}
            directionRef={photo.exif?.gpsImgDirectionRef ?? ''}
            direction={photo.exif?.gpsImgDirection ?? 0}
            title={photo.title}
          />
        ) : (
          <Box textAlign="center" margin="50px 0">
            <Text fontSize="1.2rem">
              この写真には位置情報がありません。
            </Text>
          </Box >
        )}
      </Box>
      <Box style={Style.Box}>
        <InfoTable {...photo} />
      </Box>
    </Container >
  </Wrapper>
)