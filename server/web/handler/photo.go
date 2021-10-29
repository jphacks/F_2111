package handler

import (
	"encoding/json"
	"errors"
	"github.com/jphacks/F_2111/fixture"
	"net/http"
	"strconv"

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
		Title       string `json:"title" binding:"required"`
		Description string `json:"description"`
	}
	image, header, err := c.Request.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
	defer image.Close()
	jsonStr := c.Request.FormValue("data")
	var req photoReq
	json.Unmarshal([]byte(jsonStr), &req)

	photoDTO := &dto.PhotoDTO{
		Title:       req.Title,
		Description: req.Description,
	}

	photo, err := p.photoUC.CreatePhoto(photoDTO, image, header)
	if err != nil {
		logger.Errorf("store photo: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": entity.ErrInternalServerError.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"photo": photo,
	})
}

func (p *PhotoHandler) GetPhotos(c *gin.Context) {
	logger := log.GetLogger()

	var withDetail bool

	if c.Query("detail") != "" {
		var err error
		withDetail, err = strconv.ParseBool(c.Query("detail"))
		if err != nil {
			logger.Errorf("detail flag is invalid, %v : %v", c.Query("detail"), err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	}

	var pageSize int
	if c.Query("page-size") != "" {
		var err error
		pageSize, err = strconv.Atoi(c.Query("page-size"))
		if err != nil {
			logger.Errorf("page-size invalid, %v : %v", c.Query("page-size"), err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	}

	photos, err := p.photoUC.GetPhotos(withDetail, pageSize)
	if err != nil {
		logger.Errorf("get photos: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": entity.ErrInternalServerError.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"photos": photos,
	})
}

func (p *PhotoHandler) SearchPhotos(c *gin.Context) {
	logger := log.GetLogger()

	var withDetail bool

	if c.Query("detail") != "" {
		var err error
		withDetail, err = strconv.ParseBool(c.Query("detail"))
		if err != nil {
			logger.Errorf("detail flag is invalid, %v : %v", c.Query("detail"), err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	}

	var pageSize int
	if c.Query("page-size") != "" {
		var err error
		pageSize, err = strconv.Atoi(c.Query("page-size"))
		if err != nil {
			logger.Errorf("page-size invalid, %v : %v", c.Query("page-size"), err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	}

	var page int
	if c.Query("page") != "" {
		var err error
		page, err = strconv.Atoi(c.Query("page"))
		if err != nil {
			logger.Errorf("page invalid, %v : %v", c.Query("page"), err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	}

	// conditions
	searchConditionRangeID := &fixture.PhotoSearchConditionRangeID{}
	if c.Query("fnumberRangeID") != "" {
		fnumberRangeID, err := strconv.Atoi(c.Query("fnumberRangeID"))
		if err != nil {
			logger.Errorf("fnumberRangeID invalid, %v : %v", c.Query("fnumberRangeID"), err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		searchConditionRangeID.FNumber = &fnumberRangeID
	}

	if c.Query("focalLengthRangeID") != "" {
		focalLengthRangeID, err := strconv.Atoi(c.Query("focalLengthRangeID"))
		if err != nil {
			logger.Errorf("focalLengthRangeID invalid, %v : %v", c.Query("focalLengthRangeID"), err)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		searchConditionRangeID.FNumber = &focalLengthRangeID
	}

	photos, err := p.photoUC.SearchPhotos(withDetail, pageSize, page, searchConditionRangeID)
	if err != nil {
		logger.Errorf("get photos: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": entity.ErrInternalServerError.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"photos": photos,
	})
}

func (p *PhotoHandler) GetPhoto(c *gin.Context) {
	logger := log.GetLogger()
	id := c.Param("id")

	photo, err := p.photoUC.GetPhoto(id)
	if err != nil {
		if errors.Is(err, entity.ErrPhotoNotFound) {
			logger.Debug("get photo not found", err)
			c.JSON(http.StatusNotFound, gin.H{"error": entity.ErrPhotoNotFound.Error()})
			return
		}
		logger.Errorf("get photo: %w", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": entity.ErrInternalServerError.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"photo": photo,
	})
}

func (p *PhotoHandler) GetPhotoSearchCondition(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"photo_search_condition": p.photoUC.GetPhotoSearchCondition(),
	})
}
