import { useEffect, useRef, ReactElement } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Box } from "@chakra-ui/layout";

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <>{status}...</>;
  if (status === Status.FAILURE) return <>{status}...</>;

  return null as any;
};

const MapComponent = ({
    center,
    zoom,
    icon,
  }: {
    // @ts-ignore
    center: google.maps.LatLngLiteral;
    zoom: number;
    icon: string;
  }): JSX.Element => {
    const mapRef = useRef(null);
    const panoRef = useRef(null);

    useEffect(() => {
      // https://developers.google.com/maps/documentation/javascript/examples/marker-simple?hl=ja
      // @ts-ignore
      const map = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
      })
      // @ts-ignore
      // const marker = new window.google.maps.Marker({
      //   position: center,
      //   map, 
      //   // icon
      // });

      // @ts-ignore
      const pano = new google.maps.StreetViewPanorama(panoRef.current, {
        position: center,
        pov: {
          heading: 34,
          pitch: 10,
        },
      });

      map.setStreetView(pano);
    }, [center, zoom]);
  
    return (
      <Box height="50vh" width="80vw" margin="50px auto">
        <Box ref={mapRef} id="map" style={{
          float: 'left',
          height: '100%',
          width: '50%',
        }}></Box>
        <Box ref={panoRef} id="pano" style={{
          float: 'left',
          height: '100%',
          width: '50%',
        }}></Box>
      </Box>
    );
  }

export const Map = ({
  lat, 
  lng,
  image, 
}: {
  lat: number;
  lng: number;
  image: string;
}): JSX.Element => {
  const API_KEY = '';
  const center = { lat, lng };
  const icon = image;
  const zoom = 10;

  return (
    <Wrapper apiKey={API_KEY} render={render}>
        <MapComponent center={center} zoom={zoom} icon={icon}/>
    </Wrapper>
  )
};