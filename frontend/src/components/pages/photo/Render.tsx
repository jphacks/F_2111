import { ReactElement } from 'react';
import { Status } from '@googlemaps/react-wrapper';

export const Render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <>{status}...</>;
  if (status === Status.FAILURE) return <>{status}...</>;
  
  return <></>;
};