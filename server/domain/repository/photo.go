package repository

import (
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/jphacks/F_2111/domain/entity"
)

type Photo interface {
	FindAll(withDetail bool, pageSize int) ([]*entity.Photo, error)
	FindByID(id string) (*entity.Photo, error)
	//FindByPermalink(permalink string) (*entity.Photo, error)
	Create(photo *entity.Photo) error
	//Update(photo *entity.Photo) error
	//Delete(id string) error
	//Count(condition string, params []interface{}) (int, error)
	DownloadFromS3(id, region, bucketName string) (*s3.GetObjectOutput, error)
}
