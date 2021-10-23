package usecase

import (
	"fmt"

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
	var photo *entity.Photo
	var err error
	photo = entity.NewPhoto()
	photo.ConvertFromDTO(photoDTO)

	err = p.photoRepository.Create(photo)
	if err != nil {
		return nil, fmt.Errorf("create new photo: %w", err)
	}

	return photo.ConvertToDTO(), err
}
