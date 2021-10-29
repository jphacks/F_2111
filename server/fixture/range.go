package fixture

import (
	"fmt"
)

type Range struct {
	ID  int64 `json:"id"`
	Min int64 `json:"min"`
	Max int64 `json:"max"`
}

type RangeCondition struct {
	Prefix string   `json:"prefix"`
	Suffix string   `json:"suffix"`
	Ranges []*Range `json:"ranges"`
}

func GetRange(cond RangeCondition, rangeID int) (*Range, error) {
	if rangeID < 0 || len(cond.Ranges) <= rangeID {
		return nil, fmt.Errorf("unexpected Range ID")
	}

	return cond.Ranges[rangeID], nil
}
