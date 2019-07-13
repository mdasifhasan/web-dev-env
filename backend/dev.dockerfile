FROM golang:1.12-alpine3.10 as build

WORKDIR /app

# COPY . ./
# RUN CGO_ENABLED=0 GOOS=linux go build main.go

# FROM scratch
# COPY --from=build /app /app
# WORKDIR /app
# CMD ["./main"]

ENV CGO_ENABLED 0
ENV GOOS linux
CMD ["go", "run", "main.go"]