export type HogeProps = {
  hoge: string;
  piyo: number;
}

export type PhotoType = {
  id: number;
  url: string;
  exif?: any;
  title: string;
  description?: string;
}

export type PhotosProps = {
  res: PhotoType[]
}

export type PhotoProps = {
  res: PhotoType
}