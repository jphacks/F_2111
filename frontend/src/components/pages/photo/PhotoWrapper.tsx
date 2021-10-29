import { Box, Container, Text, Heading } from '@chakra-ui/react';
import Image from 'next/image';
import { Wrapper } from '@googlemaps/react-wrapper';
import { Map } from './Map';
import { InfoTable } from './InfoTable';
import { Render } from './Render';
import { PhotoType } from '../../../types';

export const PhotoWrapper = (photo: PhotoType): JSX.Element => (
  <Wrapper
    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY ?? ''}
    render={Render}
  >
    <Container maxWidth={{ base: "110vh" }}>
      <Heading>写真詳細ページ</Heading>
      <Box textAlign="center">
        <Image
          src={photo.url}
          height={400}
          width={400}
          quality={100}
          priority
        />
        <Box padding="10px" marginBottom="10px">
          <Text>{photo.title}</Text>
        </Box>
      </Box>
      <Box>
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
      <Box>
        <InfoTable {...photo} />
      </Box>
    </Container >
  </Wrapper>
)