package entity

import (
	"fmt"
	"github.com/dsoprea/go-exif/v3"
	exifcommon "github.com/dsoprea/go-exif/v3/common"
	"github.com/jphacks/F_2111/constant"
	"github.com/jphacks/F_2111/pkg/util"
	"time"

	"github.com/jphacks/F_2111/domain/dto"
)

type Photo struct {
	ID                      string     `db:"id"`
	URL                     string     `db:"url"`
	Title                   string     `db:"title"`
	Description             string     `db:"description"`
	Make                    *string    `db:"make"`
	Model                   *string    `db:"model"`
	LensModel               *string    `db:"lens_model"`
	FNumber                 *float64   `db:"fnumber"`
	Flash                   *uint16    `db:"flash"`
	FocalLength             *float64   `db:"focal_length"`
	PhotoGraphicSensitivity *uint16    `db:"photo_graphic_sensitivity"`
	ExposureBiasValue       *float64   `db:"exposure_bias_value"`
	ShutterSpeedValue       *float64   `db:"shutter_speed_value"`
	WhiteBalance            *uint16    `db:"white_balance"`
	GPSLatitude             *float64   `db:"gps_latitude"`
	GPSLongitude            *float64   `db:"gps_longitude"`
	GPSAltitude             *float64   `db:"gps_altitude"`
	GPSImgDirectionRef      *string    `db:"gps_img_direction_ref"`
	GPSImgDirection         *float64   `db:"gps_img_direction"`
	DatetimeOriginal        *time.Time `db:"datetime_original"`
	CreatedAt               time.Time  `db:"created_at"`
	UpdatedAt               time.Time  `db:"updated_at"`
}

func NewPhoto(id string, url string, title string, description string, make string, model string, lensModel string, fNumber float64, flash uint16, focalLength float64, photoGraphicSensitivity uint16, exposureBiasValue float64, shutterSpeedValue float64, whiteBalance uint16, gpsLatitude float64, gpsLongitude float64, gpsAltitude float64, gpsImgDirectionRef string, gpsImgDirection float64, datetimeOriginal time.Time) *Photo {
	return &Photo{
		ID:                      id,
		URL:                     url,
		Title:                   title,
		Description:             description,
		Make:                    &make,
		Model:                   &model,
		LensModel:               &lensModel,
		FNumber:                 &fNumber,
		Flash:                   &flash,
		FocalLength:             &focalLength,
		PhotoGraphicSensitivity: &photoGraphicSensitivity,
		ExposureBiasValue:       &exposureBiasValue,
		ShutterSpeedValue:       &shutterSpeedValue,
		WhiteBalance:            &whiteBalance,
		GPSLatitude:             &gpsLatitude,
		GPSLongitude:            &gpsLongitude,
		GPSAltitude:             &gpsAltitude,
		GPSImgDirectionRef:      &gpsImgDirectionRef,
		GPSImgDirection:         &gpsImgDirection,
		DatetimeOriginal:        &datetimeOriginal,
		CreatedAt:               time.Time{},
		UpdatedAt:               time.Time{},
	}
}

func (p *Photo) ConvertToDTO() *dto.PhotoDTO {
	return &dto.PhotoDTO{
		ID:          p.ID,
		URL:         p.URL,
		Title:       p.Title,
		Description: p.Description,
		Exif: dto.Exif{
			Make:                    p.Make,
			Model:                   p.Model,
			LensModel:               p.LensModel,
			FNumber:                 p.FNumber,
			Flash:                   p.Flash,
			FocalLength:             p.FocalLength,
			PhotoGraphicSensitivity: p.PhotoGraphicSensitivity,
			ExposureBiasValue:       p.ExposureBiasValue,
			ShutterSpeedValue:       p.ShutterSpeedValue,
			WhiteBalance:            p.WhiteBalance,
			GPSLatitude:             p.GPSLatitude,
			GPSLongitude:            p.GPSLongitude,
			GPSAltitude:             p.GPSAltitude,
			GPSImgDirectionRef:      p.GPSImgDirectionRef,
			GPSImgDirection:         p.GPSImgDirection,
			DatetimeOriginal:        p.DatetimeOriginal,
		},
		CreatedAt: p.CreatedAt,
		UpdatedAt: p.UpdatedAt,
	}
}

func (p *Photo) ConvertFromDTO(photoDTO *dto.PhotoDTO) {
	p.ID = photoDTO.ID
	p.URL = photoDTO.URL
	p.Title = photoDTO.Title
	p.Description = photoDTO.Description
	p.Make = photoDTO.Exif.Make
	p.Model = photoDTO.Exif.Model
	p.LensModel = photoDTO.Exif.LensModel
	p.FNumber = photoDTO.Exif.FNumber
	p.Flash = photoDTO.Exif.Flash
	p.FocalLength = photoDTO.Exif.FocalLength
	p.PhotoGraphicSensitivity = photoDTO.Exif.PhotoGraphicSensitivity
	p.ExposureBiasValue = photoDTO.Exif.ExposureBiasValue
	p.ShutterSpeedValue = photoDTO.Exif.ShutterSpeedValue
	p.WhiteBalance = photoDTO.Exif.WhiteBalance
	p.GPSLatitude = photoDTO.Exif.GPSLatitude
	p.GPSLongitude = photoDTO.Exif.GPSLongitude
	p.GPSAltitude = photoDTO.Exif.GPSAltitude
	p.GPSImgDirectionRef = photoDTO.Exif.GPSImgDirectionRef
	p.GPSImgDirection = photoDTO.Exif.GPSImgDirection
	p.DatetimeOriginal = photoDTO.Exif.DatetimeOriginal
	p.CreatedAt = photoDTO.CreatedAt
	p.UpdatedAt = photoDTO.UpdatedAt
}

//nolint:gocognit
func (p *Photo) FillExif(ifd *exif.Ifd) error {
	targetTagIDs := []uint16{
		constant.TagIDMake,
		constant.TagIDModel,
		constant.TagIDLensModel,
		constant.TagIDFNumber,
		constant.TagIDFlash,
		constant.TagIDFocalLength,
		constant.TagIDPhotoGraphicSensitivity,
		constant.TagIDExposureBiasValue,
		constant.TagIDShutterSpeedValue,
		constant.TagIDWhiteBalance,
		constant.TagIDGPSImgDirectionRef,
		constant.TagIDGPSImgDirection,
		constant.TagIDDatetimeOriginal,
	}

	ifdTagEntries := ifd.DumpTags()
	for _, tag := range ifdTagEntries {
		if util.Contains(targetTagIDs, tag.TagId()) {
			v := tag.TagId()
			//Rationalから変換する時にfloat64で割るだけで良いのか不安だけど，go-exifもそうしてるので一旦これでいく
			switch v {
			case constant.TagIDMake:
				tagValue, err := tag.Value()
				if err != nil {
					return err
				}
				if val, ok := tagValue.(string); ok {
					p.Make = &val
				}
			case constant.TagIDModel:
				tagValue, err := tag.Value()
				if err != nil {
					return err
				}
				if val, ok := tagValue.(string); ok {
					p.Model = &val
				}
			case constant.TagIDLensModel:
				tagValue, err := tag.Value()
				if err != nil {
					return err
				}
				if val, ok := tagValue.(string); ok {
					p.LensModel = &val
				}
			case constant.TagIDFNumber:
				tagValue, err := tag.Value()
				if err != nil {
					return err
				}
				if val, ok := tagValue.([]exifcommon.Rational); ok {
					floatVal := float64(val[0].Numerator) / float64(val[0].Denominator)
					p.FNumber = &floatVal
				}
			case constant.TagIDFlash:
				tagValue, err := tag.Value()
				if err != nil {
					return err
				}
				if val, ok := tagValue.([]uint16); ok {
					p.Flash = &val[0]
				}

			case constant.TagIDFocalLength:
				tagValue, err := tag.Value()
				if err != nil {
					return err
				}
				if val, ok := tagValue.([]exifcommon.Rational); ok {
					focalLength := &val[0]
					floatVal := float64(focalLength.Numerator) / float64(focalLength.Denominator)
					p.FocalLength = &floatVal

				}
			case constant.TagIDPhotoGraphicSensitivity:
				tagValue, err := tag.Value()
				if err != nil {
					return err
				}
				if val, ok := tagValue.([]uint16); ok {
					p.PhotoGraphicSensitivity = &val[0]
				}

			case constant.TagIDExposureBiasValue:
				tagValue, err := tag.Value()
				if err != nil {
					return err
				}
				if val, ok := tagValue.([]exifcommon.SignedRational); ok {
					exposureBias := &val[0]
					floatVal := float64(exposureBias.Numerator) / float64(exposureBias.Denominator)
					p.ExposureBiasValue = &floatVal
				}

			case constant.TagIDShutterSpeedValue:
				tagValue, err := tag.Value()
				if err != nil {
					return err
				}
				if val, ok := tagValue.([]exifcommon.SignedRational); ok {
					shutterSpeed := &val[0]
					floatVal := float64(shutterSpeed.Numerator) / float64(shutterSpeed.Denominator)
					p.ShutterSpeedValue = &floatVal
				}

			case constant.TagIDWhiteBalance:
				tagValue, err := tag.Value()
				if err != nil {
					return err
				}
				if val, ok := tagValue.([]uint16); ok {
					p.WhiteBalance = &val[0]
				}

			case constant.TagIDGPSImgDirectionRef:
				tagValue, err := tag.Value()
				if err != nil {
					return err
				}
				if val, ok := tagValue.(string); ok {
					p.GPSImgDirectionRef = &val
				}
			case constant.TagIDGPSImgDirection:
				tagValue, err := tag.Value()
				if err != nil {
					return err
				}
				if val, ok := tagValue.([]exifcommon.Rational); ok {
					direction := &val[0]
					floatVal := float64(direction.Numerator) / float64(direction.Denominator)
					p.GPSImgDirection = &floatVal
				}

			case constant.TagIDDatetimeOriginal:
				tagValue, err := tag.Value()
				if err != nil {
					return err
				}
				if val, ok := tagValue.(string); ok {
					layout := "2006:01:02 15:04:05"
					parsedTime, err := time.Parse(layout, val)
					if err != nil {
						return fmt.Errorf("failed to parse time: %w", err)
					}
					p.DatetimeOriginal = &parsedTime
				}

			}
		}
	}
	ifd, err := ifd.ChildWithIfdPath(exifcommon.IfdGpsInfoStandardIfdIdentity)
	if err != nil {
		return err
	}
	gpsInfo, err := ifd.GpsInfo()
	if err != nil {
		return err
	}
	latitudeVal := gpsInfo.Latitude.Decimal()
	p.GPSLatitude = &latitudeVal
	longitudeVal := gpsInfo.Longitude.Decimal()
	p.GPSLongitude = &longitudeVal
	altitudeVal := float64(gpsInfo.Altitude)
	p.GPSAltitude = &altitudeVal
	return nil
}
