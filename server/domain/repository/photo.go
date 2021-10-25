package repository

import "github.com/jphacks/F_2111/domain/entity"

type Photo interface {
	//FindByID(id string) (*entity.Photo, error)
	FindAll(withDetail bool) ([]*entity.Photo, error)
	//FindByPermalink(permalink string) (*entity.Photo, error)
	Create(photo *entity.Photo) error
	//Update(photo *entity.Photo) error
	//Delete(id string) error
	//Count(condition string, params []interface{}) (int, error)
}
