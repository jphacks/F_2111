package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jphacks/F_2111/domain/dto"
	"github.com/jphacks/F_2111/domain/entity"
	"github.com/jphacks/F_2111/log"
	"github.com/jphacks/F_2111/usecase"
)

type PhotoHandler struct {
	photoUC *usecase.PhotoUseCase
}

func NewPhotoHandler(photoUC *usecase.PhotoUseCase) *PhotoHandler {
	return &PhotoHandler{
		photoUC: photoUC,
	}
}

func (p *PhotoHandler) StorePhoto(c *gin.Context) {
	logger := log.GetLogger()

	type photoReq struct {
		ID          string `json:"id" binding:"required"`
		URL         string `json:"url" binding:"required"`
		Title       string `json:"title" binding:"required"`
		Description string `json:"description" binding:"required"`
	}
	var req photoReq
	if err := c.ShouldBindJSON(&req); err != nil {
		logger.Errorf("failed to bind: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	photoDTO := &dto.PhotoDTO{
		ID:          req.ID,
		URL:         req.URL,
		Title:       req.Title,
		Description: req.Description,
	}

	photo, err := p.photoUC.CreatePhoto(photoDTO)
	if err != nil {
		logger.Errorf("store photo: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": entity.ErrInternalServerError.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"photo": photo,
	})
}
