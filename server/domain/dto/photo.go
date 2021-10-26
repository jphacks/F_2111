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
	LensModel               *string    `json:"lensModel"`
	FNumber                 *float64   `json:"fnumber"`
	Flash                   *uint16    `json:"flash"`
	FocalLength             *float64   `json:"focalLength"`
	PhotoGraphicSensitivity *uint16    `json:"photoGraphicSensitivity"`
	ExposureBiasValue       *float64   `json:"exposureBiasValue"`
	ShutterSpeedValue       *float64   `json:"shutterSpeedValue"`
	WhiteBalance            *uint16    `json:"whiteBalance"`
	GPSLatitude             *float64   `json:"gpsLatitude"`
	GPSLongitude            *float64   `json:"gpsLongitude"`
	GPSAltitude             *float64   `json:"gpsAltitude"`
	GPSImgDirectionRef      *string    `json:"gpsImgDirectionRef"`
	GPSImgDirection         *float64   `json:"gpsImgDirection"`
	DatetimeOriginal        *time.Time `json:"datetimeOriginal"`
}
