export type HogeProps = {
  hoge: string;
  piyo: number;
};

export type PhotoType = {
  id: number;
  url: string;
  exif?: ExifType;
  title: string;
  description?: string;
};

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
};

export type PhotosProps = {
  photos: PhotoType[];
};

export type PhotoProps = {
  photo: PhotoType;
};


export type Range = {
  id: number
  min: number
  max: number
}

export type RangeCondition = {
  prefix: string
  suffix: string
  ranges: Range[]
}

export type PhotoSearchCondition = {
  fnumber: RangeCondition
  focalLength: RangeCondition
  photoGraphicSensitivityRangeId: RangeCondition
  shutterSpeedValueRangeId: RangeCondition
}

export type PhotoSearchParams = {
  fnumberRangeId: string
  focalLengthRangeId: string
  photoGraphicSensitivityRangeId: string
  shutterSpeedValueRangeId: string
  page: number
  perPage: number
}

export type PhotoSearchResponse = {
  photos: PhotoType[]
}
