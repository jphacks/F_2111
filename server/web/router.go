package web

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jphacks/F_2111/config"
	"github.com/jphacks/F_2111/usecase"
	"github.com/jphacks/F_2111/web/handler"
)

func NewServer(photoUC *usecase.PhotoUseCase) (e *gin.Engine) {
	e = gin.New()
	e.Use(gin.Logger())
	e.Use(gin.Recovery())

	corsConfig := cors.DefaultConfig()
	if config.IsLocal() {
		corsConfig.AllowOrigins = []string{"*"}
	} else {
		corsConfig.AllowOrigins = []string{"https://baetoru.com"}
	}

	e.Use(cors.New(corsConfig))

	photoHandler := handler.NewPhotoHandler(photoUC)

	v1 := e.Group("/api/v1")

	v1.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "hello world",
		})
	})

	photos := v1.Group("/photos")
	photos.GET("", photoHandler.GetPhotos)
	photos.GET("/search", photoHandler.SearchPhotos)
	photos.GET(":id", photoHandler.GetPhoto)
	photos.POST("", photoHandler.StorePhoto)
	photos.GET("/search/condition", photoHandler.GetPhotoSearchCondition)
	return
}
