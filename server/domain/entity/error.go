package entity

import "errors"

var (
	ErrInternalServerError = errors.New("internal server error")

	ErrPhotoNotFound = errors.New("photo not found")
)
