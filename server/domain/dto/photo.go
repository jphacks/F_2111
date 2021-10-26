package dto

import "time"

type PhotoDTO struct {
	ID          string    `json:"id"`
	URL         string    `json:"url"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Exif        Exif      `json:"exif"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type Exif struct {
	Make                    *string    `json:"make"`
	Model                   *string    `json:"model"`
	LensModel               *string    `json:"lens_model"`
	FNumber                 *float64   `json:"fnumber"`
	Flash                   *uint16    `json:"flash"`
	FocalLength             *float64   `json:"focal_length"`
	PhotoGraphicSensitivity *uint16    `json:"photo_graphic_sensitivity"`
	ExposureBiasValue       *float64   `json:"exposure_bias_value"`
	ShutterSpeedValue       *float64   `json:"shutter_speed_value"`
	WhiteBalance            *uint16    `json:"white_balance"`
	GPSLatitude             *float64   `json:"gps_latitude"`
	GPSLongitude            *float64   `json:"gps_longitude"`
	GPSAltitude             *float64   `json:"gps_altitude"`
	GPSImgDirectionRef      *string    `json:"gps_img_direction_ref"`
	GPSImgDirection         *float64   `json:"gps_img_direction"`
	DatetimeOriginal        *time.Time `json:"datetime_original"`
}
