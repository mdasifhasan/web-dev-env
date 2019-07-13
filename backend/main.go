package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func handleRoot(writer http.ResponseWriter, request *http.Request) {
	fmt.Println("new request from host", request.Host)
	response := "Yes, server is ready to serve!"
	fmt.Fprintf(writer, response)
}

func main() {
	http.HandleFunc("/", handleRoot)
	port := os.Getenv("PORT")
	if port == "" {
		port = "4000"
	}
	fmt.Println("server listening on port " + port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
