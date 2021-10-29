package database

import (
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/jmoiron/sqlx"
	"github.com/jphacks/F_2111/domain/entity"
	"github.com/jphacks/F_2111/fixture"
	"mime/multipart"
	"strconv"
	"strings"
)

type PhotoRepository struct {
	db              *sqlx.DB
	creds           *credentials.Credentials
	searchCondition *fixture.PhotoSearchCondition
}

func NewPhotoRepository(db *sqlx.DB, creds *credentials.Credentials, searchCondition *fixture.PhotoSearchCondition) *PhotoRepository {
	return &PhotoRepository{
		db:              db,
		creds:           creds,
		searchCondition: searchCondition,
	}
}

func (r *PhotoRepository) Create(photo *entity.Photo) error {
	stmt, err := r.db.Preparex("INSERT INTO photos (id, url, title, description, make, model, lens_model, fnumber, flash, focal_length, photo_graphic_sensitivity, exposure_bias_value, shutter_speed_value, white_balance, gps_latitude, gps_longitude, gps_altitude, gps_img_direction_ref, gps_img_direction, datetime_original) values (?, ?, ?, ?, ? , ? , ? ,? ,? , ? , ? ,? , ? ,? ,?, ? ,?,?,?,?)")
	if err != nil {
		return err
	}
	defer func() {
		if closeErr := stmt.Close(); closeErr != nil {
			err = closeErr
		}
	}()
	_, err = stmt.Exec(photo.ID, photo.URL, photo.Title, photo.Description, photo.Make, photo.Model, photo.LensModel, photo.FNumber, photo.Flash, photo.FocalLength, photo.PhotoGraphicSensitivity, photo.ExposureBiasValue, photo.ShutterSpeedValue, photo.WhiteBalance, photo.GPSLatitude, photo.GPSLongitude, photo.GPSAltitude, photo.GPSImgDirectionRef, photo.GPSImgDirection, photo.DatetimeOriginal)
	if err != nil {
		return err
	}
	err = r.db.QueryRowx("SELECT created_at, updated_at FROM photos WHERE id = ?", photo.ID).StructScan(photo)
	return err
}

func (r *PhotoRepository) FindAll(withDetail bool, pageSize int) ([]*entity.Photo, error) {
	var photos []*entity.Photo
	var query string
	var params []interface{}

	if withDetail {
		query = "SELECT id, url, title, description, make, model, lens_model, fnumber, flash, focal_length, photo_graphic_sensitivity, exposure_bias_value, shutter_speed_value, white_balance, gps_latitude, gps_longitude, gps_altitude, gps_img_direction_ref, gps_img_direction, datetime_original, created_at, updated_at FROM photos"
	} else {
		query = "SELECT id, url FROM photos"
	}
	if pageSize != 0 {
		query += " LIMIT ?"
		params = append(params, strconv.Itoa(pageSize))
	}

	stmt, err := r.db.Preparex(query)
	if err != nil {
		return photos, err
	}
	err = stmt.Select(&photos, params...)
	if err != nil {
		return photos, err
	}

	return photos, err
}

func (r *PhotoRepository) FindAllByCondition(withDetail bool, pageSize int, page int, rangeID *fixture.PhotoSearchConditionRangeID) ([]*entity.Photo, error) {
	var photos []*entity.Photo
	var query string
	var conditions []string
	var params []interface{}

	if rangeID.FNumber != nil {
		fNumber, err := fixture.GetRange(r.searchCondition.FNumber, *rangeID.FNumber)
		if err != nil {
			return nil, fmt.Errorf("fnumberRangeID invalid, %v : %v", rangeID.FNumber, err)
		}

		if fNumber.Min != -1 {
			conditions = append(conditions, "fnumber >= ?")
			params = append(params, fNumber.Min)
		}
		if fNumber.Max != -1 {
			conditions = append(conditions, "fnumber < ?")
			params = append(params, fNumber.Max)
		}
	}

	if rangeID.FocalLength != nil {
		focalLength, err := fixture.GetRange(r.searchCondition.FocalLength, *rangeID.FocalLength)
		if err != nil {
			return nil, fmt.Errorf("focalLengthRangeID invalid, %v : %v", rangeID.FocalLength, err)
		}

		if focalLength.Min != -1 {
			conditions = append(conditions, "focal_length >= ?")
			params = append(params, focalLength.Min)
		}
		if focalLength.Max != -1 {
			conditions = append(conditions, "focal_length < ?")
			params = append(params, focalLength.Max)
		}
	}

	if rangeID.PhotoGraphicSensitivity != nil {
		photoGraphicSensitivity, err := fixture.GetRange(r.searchCondition.PhotoGraphicSensitivity, *rangeID.PhotoGraphicSensitivity)
		if err != nil {
			return nil, fmt.Errorf("photoGraphicSensitivityRangeID invalid, %v : %v", rangeID.PhotoGraphicSensitivity, err)
		}

		if photoGraphicSensitivity.Min != -1 {
			conditions = append(conditions, "photo_graphic_sensitivity >= ?")
			params = append(params, photoGraphicSensitivity.Min)
		}
		if photoGraphicSensitivity.Max != -1 {
			conditions = append(conditions, "photo_graphic_sensitivity < ?")
			params = append(params, photoGraphicSensitivity.Max)
		}
	}

	if rangeID.ShutterSpeedValue != nil {
		shutterSpeedValue, err := fixture.GetRange(r.searchCondition.ShutterSpeedValue, *rangeID.ShutterSpeedValue)
		if err != nil {
			return nil, fmt.Errorf("shutterSpeedValueRangeID invalid, %v : %v", rangeID.ShutterSpeedValue, err)
		}

		// fixme
		if shutterSpeedValue.Min < -100 {
			conditions = append(conditions, "shutter_speed_value >= ?")
			params = append(params, shutterSpeedValue.Min)
		}
		// fixme
		if shutterSpeedValue.Max > 100 {
			conditions = append(conditions, "shutter_speed_value < ?")
			params = append(params, shutterSpeedValue.Max)
		}
	}

	if withDetail {
		query = "SELECT id, url, title, description, make, model, lens_model, fnumber, flash, focal_length, photo_graphic_sensitivity, exposure_bias_value, shutter_speed_value, white_balance, gps_latitude, gps_longitude, gps_altitude, gps_img_direction_ref, gps_img_direction, datetime_original, created_at, updated_at FROM photos "
	} else {
		query = "SELECT id, url FROM photos "
	}

	if len(conditions) != 0 {
		query += " WHERE "
	}

	searchCondition := strings.Join(conditions, " AND ")

	var limitOffSet string

	if pageSize != 0 {
		limitOffSet = " LIMIT ? OFFSET ? "
		params = append(params, strconv.Itoa(pageSize), strconv.Itoa(pageSize*page))
	}

	stmt, err := r.db.Preparex(query + searchCondition + limitOffSet)
	if err != nil {
		return photos, err
	}
	err = stmt.Select(&photos, params...)
	if err != nil {
		return photos, err
	}

	return photos, err
}

func (r *PhotoRepository) FindByID(id string) (*entity.Photo, error) {
	photo := &entity.Photo{}

	stmt, err := r.db.Preparex("SELECT id, url, title, description, make, model, lens_model, fnumber, flash, focal_length, photo_graphic_sensitivity, exposure_bias_value, shutter_speed_value, white_balance, gps_latitude, gps_longitude, gps_altitude, gps_img_direction_ref, gps_img_direction, datetime_original, created_at, updated_at FROM photos WHERE id = ? ")
	if err != nil {
		return photo, err
	}

	err = stmt.Get(photo, id)
	if err != nil {
		return photo, err
	}

	return photo, err
}

func (r *PhotoRepository) DownloadFromS3(id, region, bucketName string) (*s3.GetObjectOutput, error) {
	sess, err := session.NewSession(&aws.Config{
		Credentials: r.creds,
		Region:      aws.String(region),
	})
	if err != nil {
		return nil, fmt.Errorf("failed to create session: %w", err)
	}

	svc := s3.New(sess)

	obj, err := svc.GetObject(&s3.GetObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(id),
	})
	if err != nil {
		return nil, fmt.Errorf("download photo id: %s, err: %w", id, err)
	}

	return obj, nil
}

func (r *PhotoRepository) UploadToS3(file multipart.File, key, region, bucketName string) (string, error) {
	sess, err := session.NewSession(&aws.Config{
		Credentials: r.creds,
		Region:      aws.String(region),
	})
	if err != nil {
		return "", fmt.Errorf("failed to create session: %w", err)
	}

	uploader := s3manager.NewUploader(sess)

	output, err := uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(key),
		Body:   file,
	})
	if err != nil {
		return "", fmt.Errorf("upload photo id: %s, err: %w", key, err)
	}

	return output.Location, nil
}

func (r *PhotoRepository) GetSearchCondition() *fixture.PhotoSearchCondition {
	return r.searchCondition
}
