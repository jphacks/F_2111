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
    title,
    lat, 
    lng,
  }: {
    // @ts-ignore
    center: google.maps.LatLngLiteral;
    zoom: number;
    icon: string;
    title: string;
    lat: number;
    lng: number;
  }): JSX.Element => {
    const mapRef = useRef(null);
    const panoRef = useRef(null);

    // @ts-ignore
    const place = new google.maps.LatLng(lat, lng)
    const createCard = () => {
      return `
      <div>
        <p style="padding-bottom: 5px; font-size: 1rem">${title}</p>
        <img src="${icon}" style="height: 100px; width: 150px;"/>
      </div>
      `;
    }

    useEffect(() => {
      // https://developers.google.com/maps/documentation/javascript/examples/marker-simple?hl=ja
      // @ts-ignore
      const map = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
      })

      // @ts-ignore
      const pano = new google.maps.StreetViewPanorama(panoRef.current, {
        position: center,
        pov: {
          heading: 34,
          pitch: 0,
        },
      });

      // @ts-ignore
      const card = new google.maps.InfoWindow();
      card.setContent(createCard());
      card.setPosition(place);
      card.open(map);

      map.setStreetView(pano);
    }, [center, zoom]);
  
    return (
      <Box height="50vh" width="80vw" margin="50px auto">
        <Box ref={mapRef} id="map" float="left" height="100%" width="50%" />
        <Box ref={panoRef} id="pano" float="left" height="100%" width="50%" />
      </Box>
    );
  }

export const Map = ({
  lat, 
  lng,
  image, 
  title,
}: {
  lat: number;
  lng: number;
  image: string;
  title: string;
}): JSX.Element => {
  const API_KEY = '';
  const center = { lat, lng };
  const icon = image;
  const zoom = 15;

  return (
    <Wrapper apiKey={API_KEY} render={render}>
        <MapComponent 
          center={center} 
          zoom={zoom} 
          icon={icon} 
          title={title}
          lat={lat} 
          lng={lng}
        />
    </Wrapper>
  )
};