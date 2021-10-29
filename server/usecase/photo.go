package usecase

import (
	"fmt"
	"github.com/jphacks/F_2111/fixture"
	"mime/multipart"
	"net/url"

	"github.com/google/uuid"
	"github.com/jphacks/F_2111/domain/dto"
	"github.com/jphacks/F_2111/domain/entity"
	"github.com/jphacks/F_2111/domain/repository"
	"github.com/jphacks/F_2111/log"

	"os"
)

type PhotoUseCase struct {
	photoRepository repository.Photo
}

func NewPhotoUseCase(photoRepository repository.Photo) *PhotoUseCase {
	return &PhotoUseCase{photoRepository: photoRepository}
}

func (p *PhotoUseCase) CreatePhoto(photoDTO *dto.PhotoDTO, image multipart.File, header *multipart.FileHeader) (*dto.PhotoDTO, error) {
	logger := log.GetLogger()
	region := os.Getenv("AWS_REGION")
	bucketName := os.Getenv("AWS_S3_BUCKET_NAME")

	photoDTO.ID = uuid.New().String()
	filename := url.QueryEscape(header.Filename)

	key := photoDTO.ID + "-" + filename
	var err error
	photoDTO.URL, err = p.photoRepository.UploadToS3(image, key, region, bucketName)
	if err != nil {
		return nil, fmt.Errorf("upload to s3: %w", err)
	}

	photo := &entity.Photo{}
	photo.ConvertFromDTO(photoDTO)
	err = photo.FillExif(image)
	if err != nil {
		logger.Infof("failed to fill exif: %v", err)
	}

	err = p.photoRepository.Create(photo)
	if err != nil {
		return nil, fmt.Errorf("create new photo: %w", err)
	}

	return photo.ConvertToDTO(), err
}

func (p *PhotoUseCase) GetPhotos(withDetail bool, pageSize int) (photoDTOs []*dto.PhotoDTO, err error) {
	var photos []*entity.Photo
	photos, err = p.photoRepository.FindAll(withDetail, pageSize)
	if err != nil {
		err = fmt.Errorf("get photos: %w", err)
		return
	}

	for _, photo := range photos {
		photoDTOs = append(photoDTOs, photo.ConvertToDTO())
	}

	return
}

func (p *PhotoUseCase) SearchPhotos(withDetail bool, pageSize int, page int, rangeID *fixture.PhotoSearchConditionRangeID) (photoDTOs []*dto.PhotoDTO, err error) {
	var photos []*entity.Photo
	photos, err = p.photoRepository.FindAllByCondition(withDetail, pageSize, page, rangeID)
	if err != nil {
		err = fmt.Errorf("get photos: %w", err)
		return
	}

	for _, photo := range photos {
		photoDTOs = append(photoDTOs, photo.ConvertToDTO())
	}

	return
}

func (p *PhotoUseCase) GetPhoto(id string) (photoDTO *dto.PhotoDTO, err error) {
	var photo *entity.Photo
	photo, err = p.photoRepository.FindByID(id)
	if err != nil {
		err = fmt.Errorf("get photo: %w", err)
		return
	}
	photoDTO = photo.ConvertToDTO()
	return
}

func (p *PhotoUseCase) GetPhotoSearchCondition() *fixture.PhotoSearchCondition {
	return p.photoRepository.GetSearchCondition()
}
