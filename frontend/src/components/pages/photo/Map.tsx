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
  
    return <div ref={ref} id="map" />;
  }

export const Map = () => {
  const API_KEY = '';
  const center = { lat: -34.397, lng: 150.644 };
  const zoom = 4;
  return (
    <Wrapper apiKey={API_KEY} render={render}>
        <MapComponent center={center} zoom={zoom} />
    </Wrapper>
  )
};