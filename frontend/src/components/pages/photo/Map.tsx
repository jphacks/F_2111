import { useEffect, useRef, ReactElement } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

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
    const ref = useRef(null);

    useEffect(() => {
      // https://developers.google.com/maps/documentation/javascript/examples/marker-simple?hl=ja
      // @ts-ignore
      const map = new window.google.maps.Map(ref.current, {
        center,
        zoom,
      })
      // @ts-ignore
      const marker = new window.google.maps.Marker({
        position: center,
        map, 
        icon
      });

    }, [center, zoom]);

  
    return <div style={{ height: '50vh', width: '50vw', margin: '50px auto' }} ref={ref} id="map" />;
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