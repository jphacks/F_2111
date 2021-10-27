export type HogeProps = {
  hoge: string;
  piyo: number;
}

export type PhotoType = {
  id: number;
  url: string;
  exif?: ExifType;
  title: string;
  description?: string;
}

export type ExifType = {
  make?: string;
  model?: string;
  lensModel?: string;
  fnumber?: number;
  flash?: number;
  focalLength?: number;
  photoGraphicSensitivity?: number;
  exposureBiasValue?: number;
  shutterSpeedValue?: number;
  whiteBalance?: number;
  gpsLatitude?: number;
  gpsLongitude?: number;
  gpsAltitude?: number;
  gpsImgDirectionRef?: string;
  gpsImgDirection?: number;
  datetimeOriginal?: string;
  place?: string;
  compass?: string;
}

export type PhotosProps = {
  photos: PhotoType[]
}

export type PhotoProps = {
  photo: PhotoType
}