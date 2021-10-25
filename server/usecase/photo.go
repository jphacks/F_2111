package usecase

import (
	"fmt"
	"os"

	"github.com/jphacks/F_2111/domain/dto"
	"github.com/jphacks/F_2111/domain/entity"
	"github.com/jphacks/F_2111/domain/repository"
)

type PhotoUseCase struct {
	photoRepository repository.Photo
}

func NewPhotoUseCase(photoRepository repository.Photo) *PhotoUseCase {
	return &PhotoUseCase{photoRepository: photoRepository}
}

func (p *PhotoUseCase) CreatePhoto(photoDTO *dto.PhotoDTO) (*dto.PhotoDTO, error) {

	region := os.Getenv("AWS_REGION")
	bucketName := os.Getenv("AWS_S3_BUCKET_NAME")

	_, err := p.photoRepository.DownloadFromS3(photoDTO.ID, region, bucketName)
	if err != nil {
		return nil, fmt.Errorf("download from s3: %w", err)
	}
	//TODO: exifを抜き出す

	photo := &entity.Photo{}
	photo.ConvertFromDTO(photoDTO)

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
