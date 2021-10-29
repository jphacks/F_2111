package fixture

import (
	"encoding/json"
	"os"
)

type PhotoSearchCondition struct {
	FNumber     RangeCondition `json:"fnumber"`
	FocalLength RangeCondition `json:"focal_length"`
}

func NewPhotoSearchCondition(photoConditionJsonPath string) (*PhotoSearchCondition, error) {
	photoSearchCondition := &PhotoSearchCondition{}
	jsonText, err := os.ReadFile(photoConditionJsonPath)
	if err != nil {
		return nil, err
	}
	err = json.Unmarshal(jsonText, photoSearchCondition)
	if err != nil {
		return nil, err
	}
	return photoSearchCondition, nil
}

type PhotoSearchConditionRangeID struct {
	FNumber     *int
	FocalLength *int
}
