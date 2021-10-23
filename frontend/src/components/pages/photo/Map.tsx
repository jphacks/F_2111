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
  }: {
    // @ts-ignore
    center: google.maps.LatLngLiteral;
    zoom: number;
  }): JSX.Element => {
    const ref = useRef(null);

    useEffect(() => {
        // @ts-ignore
      new window.google.maps.Map(ref.current, {
        center,
        zoom,
      });
    });
  
    return <div style={{ height: '50vh', width: '50vw', margin: '50px auto' }}ref={ref} id="map" />;
  }

export const Map = ({
  lat, lng 
}: {
  lat: number;
  lng: number;
}): JSX.Element => {
  const API_KEY = '';
  const center = { lat, lng };
  const zoom = 10;

  return (
    <Wrapper apiKey={API_KEY} render={render}>
        <MapComponent center={center} zoom={zoom} />
    </Wrapper>
  )
};