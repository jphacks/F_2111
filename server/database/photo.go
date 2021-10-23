package database

import (
	"github.com/jmoiron/sqlx"
	"github.com/jphacks/F_2111/domain/entity"
)

type PhotoRepository struct {
	db *sqlx.DB
}

func NewPhotoRepository(db *sqlx.DB) *PhotoRepository {
	return &PhotoRepository{db: db}
}

func (r *PhotoRepository) Create(photo *entity.Photo) error {
	stmt, err := r.db.Preparex("INSERT INTO photos (id, url, title, description) values (?, ?, ?, ?)")
	if err != nil {
		return err
	}
	defer func() {
		if closeErr := stmt.Close(); closeErr != nil {
			err = closeErr
		}
	}()
	_, err = stmt.Exec(photo.ID, photo.URL, photo.Title, photo.Description)
	return err
}
