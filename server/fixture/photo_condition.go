package fixture

import (
	"encoding/json"
	"os"
)

type PhotoSearchCondition struct {
	FNumber                 RangeCondition `json:"fnumber"`
	FocalLength             RangeCondition `json:"focal_length"`
	PhotoGraphicSensitivity RangeCondition `json:"photo_graphic_sensitivity"`
	ShutterSpeedValue       RangeCondition `json:"shutter_speed_value"`
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
	FNumber                 *int
	FocalLength             *int
	PhotoGraphicSensitivity *int
	ShutterSpeedValue       *int
}
