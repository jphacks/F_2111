package main

import (
	"github.com/aws/aws-sdk-go/aws/credentials"
	"os"
	"time"

	"github.com/jphacks/F_2111/database"
	"github.com/jphacks/F_2111/log"
	"github.com/jphacks/F_2111/usecase"
	"github.com/jphacks/F_2111/web"
)

func main() {
	logger := log.GetLogger()
	logger.Infof("Initialized logger")
	time.Local = time.FixedZone("JST", 9*60*60)

	db, err := database.NewDB()
	if err != nil {
		logger.Fatal(err)
	}
	defer db.Close()

	accessKey := os.Getenv("AWS_ACCESS_KEY")
	secretKey := os.Getenv("AWS_SECRET_KEY")
	creds := credentials.NewStaticCredentials(accessKey, secretKey, "")

	photoRepository := database.NewPhotoRepository(db, creds)
	photoUC := usecase.NewPhotoUseCase(photoRepository)

	e := web.NewServer(photoUC)

	if err := e.Run(":8080"); err != nil {
		logger.Fatal(err.Error())
	}
}
