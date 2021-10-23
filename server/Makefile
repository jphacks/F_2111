.PHONY: lint
lint:
	go fmt ./...
	golangci-lint run --out-format=github-actions --enable=golint,gosec,prealloc,gocognit,bodyclose,gofmt