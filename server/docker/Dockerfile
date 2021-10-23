FROM golang:1.17.2 AS build

ENV GOOS=linux
ENV GOARCH=amd64
ENV CGO_ENABLED=0
ENV GO111MODULE=on

WORKDIR /workdir

COPY go.mod  ./
RUN go mod download

COPY . .
RUN go build -o baetoru .

FROM gcr.io/distroless/static-debian10:latest

ENV TZ=Asia/Tokyo

COPY --from=build /workdir/baetoru /baetoru

ENTRYPOINT ["/baetoru"]