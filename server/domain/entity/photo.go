package entity

import (
	"time"

	"github.com/jphacks/F_2111/domain/dto"
)

type Photo struct {
	ID          string    `db:"id"`
	URL         string    `db:"url"`
	Title       string    `db:"title"`
	Description string    `db:"description"`
	CreatedAt   time.Time `db:"created_at"`
	UpdatedAt   time.Time `db:"updated_at"`
}

func NewPhoto() *Photo {
	return &Photo{
		ID:          "",
		URL:         "",
		Title:       "",
		Description: "",
		CreatedAt:   time.Time{},
		UpdatedAt:   time.Time{},
	}
}

func (p *Photo) ConvertToDTO() *dto.PhotoDTO {
	return &dto.PhotoDTO{
		ID:          p.ID,
		URL:         p.URL,
		Title:       p.Title,
		Description: p.Description,
		CreatedAt:   p.CreatedAt,
		UpdatedAt:   p.UpdatedAt,
	}
}

func (p *Photo) ConvertFromDTO(photoDTO *dto.PhotoDTO) {
	p.ID = photoDTO.ID
	p.URL = photoDTO.URL
	p.Title = photoDTO.Title
	p.Description = photoDTO.Description
	p.CreatedAt = photoDTO.CreatedAt
	p.UpdatedAt = photoDTO.UpdatedAt
}
