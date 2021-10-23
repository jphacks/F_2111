package main

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func main() {
	e := gin.New()
	e.Use(gin.Logger())
	e.Use(gin.Recovery())

	v1 := e.Group("/api/v1")
	v1.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "hello world",
		})
	})

	if err := e.Run(":8080"); err != nil {
		if err != nil {
			log.Fatal(err.Error())
		}
	}
}
