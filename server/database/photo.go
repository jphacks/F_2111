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
	"mime/multipart"
	"strconv"
)

type PhotoRepository struct {
	db    *sqlx.DB
	creds *credentials.Credentials
}

func NewPhotoRepository(db *sqlx.DB, creds *credentials.Credentials) *PhotoRepository {
	return &PhotoRepository{
		db:    db,
		creds: creds,
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
