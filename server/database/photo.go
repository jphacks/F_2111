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
	if err != nil {
		return err
	}
	err = r.db.QueryRowx("SELECT created_at, updated_at FROM photos WHERE id = ?", photo.ID).StructScan(photo)
	return err
}

func (r *PhotoRepository) FindAll(withDetail bool) ([]*entity.Photo, error) {
	var photos []*entity.Photo
	var query string
	if withDetail {
		//TODO: まだGPS情報をDBに保存していない．スキーマができたらそれを取得するクエリを使うようにする
		query = "SELECT id, url, title, description, created_at, updated_at FROM photos"
	} else {
		query = "SELECT id, url FROM photos"
	}
	stmt, err := r.db.Preparex(query)
	if err != nil {
		return photos, err
	}
	err = stmt.Select(&photos)
	if err != nil {
		return photos, err
	}
	return photos, err
}
