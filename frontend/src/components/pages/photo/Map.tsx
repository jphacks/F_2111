import { useEffect, useRef, ReactElement } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { Box } from '@chakra-ui/layout';

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <>{status}...</>;
  if (status === Status.FAILURE) return <>{status}...</>;

  return null as any;
};

const MapComponent = ({
  center,
  zoom,
  rotation,
  title,
  lat,
  lng,
}: {
  center: any;
  zoom: number;
  rotation: number;
  title: string;
  lat: number;
  lng: number;
}): JSX.Element => {
  const mapRef = useRef(null);
  const panoRef = useRef(null);
  // @ts-ignore
  const place = new google.maps.LatLng(lat, lng);
  useEffect(() => {
    // https://developers.google.com/maps/documentation/javascript/examples/marker-simple?hl=ja
    // @ts-ignore
    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
    });
    // @ts-ignore
    const pano = new google.maps.StreetViewPanorama(panoRef.current, {
      position: center,
      pov: {
        heading: rotation,
        pitch: 0,
      },
    });

    map.setStreetView(pano);
  }, [center, zoom]);

  return (
    <Box height="50vh" width="80vw" margin="50px auto">
      <Box ref={mapRef} id="map" float="left" height="100%" width="50%" />
      <Box ref={panoRef} id="pano" float="left" height="100%" width="50%" />
    </Box>
  );
};

export const Map = ({
  lat,
  lng,
  directionRef,
  direction,
  title,
}: {
  lat: number;
  lng: number;
  directionRef: string;
  direction: number;
  title: string;
}): JSX.Element => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY ?? '';
  const center = { lat, lng };
  const icon = '/pin.png';
  // TODO: directionRefを考慮して真北に変換する必要がある
  const rotation = direction;
  const zoom = 15;
  return (
    <Wrapper apiKey={API_KEY} render={render}>
      <MapComponent
        center={center}
        zoom={zoom}
        rotation={rotation}
        title={title}
        lat={lat}
        lng={lng}
      />
    </Wrapper>
  );
};
