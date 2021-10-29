import { useEffect, useRef, ReactElement } from 'react';
import { Box } from '@chakra-ui/layout';

const MapComponent = ({
  center,
  zoom,
  rotation,
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
    <Box
      height={{ base: "40vh", sm: "50vh" }}
      marginBottom={{ base: "45vh", sm: "7px" }}
      display={{ sm: "-webkit-box" }}
      {...{ "-webkit-box-pack": "center" }}
    >
      <Box
        id="map"
        ref={mapRef}
        height="100%"
        width={{ sm: "47%" }}
        marginRight={{ sm: "10px", }}
        marginBottom={{ base: "10px" }}
      />
      <Box
        id="pano"
        ref={panoRef}
        height="100%"
        width={{ sm: "47%" }}
        marginBottom={{ base: "10px" }}
      />
    </Box>
  );
};

export const Map = ({
  lat,
  lng,
  direction,
  title,
}: {
  lat: number;
  lng: number;
  directionRef: string;
  direction: number;
  title: string;
}): JSX.Element => {
  const center = { lat, lng };
  const rotation = direction;
  const zoom = 15;
  return (
    <MapComponent
      center={center}
      zoom={zoom}
      rotation={rotation}
      title={title}
      lat={lat}
      lng={lng}
    />
  );
};
