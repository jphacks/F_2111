package usecase

import (
	"fmt"
	"github.com/dsoprea/go-exif/v3"
	exifcommon "github.com/dsoprea/go-exif/v3/common"
	"github.com/jphacks/F_2111/domain/dto"
	"github.com/jphacks/F_2111/domain/entity"
	"github.com/jphacks/F_2111/domain/repository"
	"os"
	"strings"
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

	strs := strings.Split(photoDTO.URL, "/")
	id := strs[len(strs)-1]

	obj, err := p.photoRepository.DownloadFromS3(id, region, bucketName)
	if err != nil {
		return nil, fmt.Errorf("download from s3: %w", err)
	}

	rawExif, err := exif.SearchAndExtractExifWithReader(obj.Body)
	if err != nil {
		return nil, fmt.Errorf("extract exif: %w", err)
	}
	im, err := exifcommon.NewIfdMappingWithStandard()
	if err != nil {
		return nil, fmt.Errorf(": %w", err)
	}

	ti := exif.NewTagIndex()

	_, index, err := exif.Collect(im, ti, rawExif)
	if err != nil {
		return nil, fmt.Errorf(": %w", err)
	}

	ifd := index.RootIfd

	photo := &entity.Photo{}
	photo.ConvertFromDTO(photoDTO)
	err = photo.FillExif(ifd)
	if err != nil {
		return nil, fmt.Errorf("failed to fill exif: %w", err)
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
