package util

func Contains(slice []uint16, target uint16) bool {
	for _, v := range slice {
		if v == target {
			return true
		}
	}
	return false
}
