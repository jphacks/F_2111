import { Box, chakra } from '@chakra-ui/react';
import Image from 'next/image';
import { Wrapper } from '@googlemaps/react-wrapper';
import { Map } from './Map';
import { InfoTable } from './InfoTable';
import { Render } from './Render';
import {  PhotoType } from '../../../types';

export const PhotoWrapper = (photo: PhotoType) => {
  return (
    <Wrapper
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY ?? ''}
          render={Render}
        >
      <Box textAlign="center" margin="auto">
        <Box padding="40px 0" background="#333333" width="100vmax">
          <Box
            boxShadow="8px 8px 8px rgba(0,0,0,0.7)"
            height={400}
            width={600}
            margin="0 auto 20px"
            borderRadius="5px"
            overflow="hidden"
          >
            <Image
              src={photo.url}
              height={400}
              width={600}
              quality={80}
              priority
            />
          </Box>
          <chakra.h1 fontSize="2rem" textColor="white" fontWeight="800">
            {photo.title}
          </chakra.h1>
        </Box>
        <InfoTable {...photo} />
      </Box>
      {photo.exif?.gpsLatitude && photo.exif?.gpsLongitude ? (
        <Map
          lat={photo.exif.gpsLatitude ?? 0}
          lng={photo.exif.gpsLongitude ?? 0}
          directionRef={photo.exif.gpsImgDirectionRef ?? ''}
          direction={photo.exif.gpsImgDirection ?? 0}
          title={photo.title}
        />
      ) : (
        <Box textAlign="center" margin="50px 0">
          <chakra.h1 fontSize="1.2rem">
            この写真には位置情報がありません。
          </chakra.h1>
        </Box>
      )}
    </Wrapper>
  );
}