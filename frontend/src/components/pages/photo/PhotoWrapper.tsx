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
    width: "70%",
    padding: "15px",
    borderWidth: "2px",
    borderColor: "orange",
    borderRadius: "5px",
    textAlign: "center",
    marginBottom: "10px",
  },
  MapBox: {
    padding: "10px",
  },
  TableBox: {
    padding: "10px",
    backgroundColor: "#fbaf51"
  },
  Image: {
    position: "fixed",
    height: "100vh",
    opacity: "20%",
  },
  Sub: {
    marginRight: "auto",
    textAlign: "left",
    paddingBottom: "2px",
    marginBottom: "15px",
    borderBottom: "1px",
    borderBottomWidth: "4px",
    width: {
      sm: "20%",
      base: "45%",
    },
    borderColor: "orange",
    fontSize: "200%"
  }
};

export const PhotoWrapper = (photo: PhotoType): JSX.Element => (
  <Wrapper
    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY ?? ''}
    render={Render}
  >
    <Img
      src="/Background.jpg"
      display={{ base: "none", sm: "fixed" }}
      position="fixed"
      style={{
        height: "100vh",
        opacity: "20%",
      }}
    />
    <Container
      maxWidth={{ base: "110vh" }}
      style={{
        paddingTop: "20px",
        backgroundColor: "rgb(255 199 142 / 70%)",
        backdropFilter: "blur(2px)",
        height: "100%",
        paddingBottom: "10px",
        textAlign: "center"
      }}
    >
      <Heading
        textAlign="center"
        style={{
          fontSize: "200%",
          fontWeight: 700,
          paddingBottom: "2px",
          marginBottom: "10px",
          borderBottom: "1px",
          borderColor: "orange",
        }}>写真詳細ページ</Heading>
      <Text
        width={{
          sm: "20%",
          base: "45%",
        }}
        borderBottom="1px"
        borderBottomWidth="4px"
        borderColor="orange"
        style={{
          marginRight: "auto",
          textAlign: "left",
          paddingBottom: "2px",
          marginBottom: "15px",
          fontSize: "200%"
        }}>写真</Text>
      <Box
        textAlign="center"
        style={{
          background: "white",
          padding: "15px",
          borderWidth: "2px",
          borderColor: "orange",
          borderRadius: "5px",
          marginBottom: "10px",
        }}>
        <Image
          src={photo.url}
          height={400}
          width={400}
          quality={100}
          priority
        />
        <Text>タイトル：　{photo.title}</Text>
      </Box>
      <Text
        width={{
          sm: "20%",
          base: "45%",
        }}
        borderBottom="1px"
        borderBottomWidth="4px"
        borderColor="orange"
        style={{
          marginRight: "auto",
          textAlign: "left",
          paddingBottom: "2px",
          marginBottom: "15px",
          fontSize: "200%"
        }}>位置情報</Text>
      <Box style={Style.MapBox}>
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
      <Text
        width={{
          sm: "20%",
          base: "45%",
        }}
        borderBottom="1px"
        borderBottomWidth="4px"
        borderColor="orange"
        style={{
          marginRight: "auto",
          textAlign: "left",
          paddingBottom: "2px",
          marginBottom: "15px",
          fontSize: "200%"
        }}>詳細</Text>
      <Box style={Style.TableBox}>
        <InfoTable {...photo} />
      </Box>
    </Container >
  </Wrapper>
)