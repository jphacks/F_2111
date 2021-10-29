FROM golang:1.17.2 AS build-reflex

RUN go install github.com/cespare/reflex@latest

FROM golang:1.17.2 AS build

COPY --from=build-reflex /go/bin/reflex /go/bin/reflex

ENV GOOS=linux
ENV GOARCH=amd64
ENV CGO_ENABLED=0
ENV GO111MODULE=on

WORKDIR /workdir

COPY . .

# 本来なら依存のダウンロードは「COPY . .」より先に行うべきだが，ホストの方で上書きするとうまく動かない場合があるようなのでこの順番にしている
RUN go mod tidy -v

ENV TZ=Asia/Tokyo