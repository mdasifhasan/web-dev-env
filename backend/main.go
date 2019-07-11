package main

import (
	"fmt"
	"log"
	"net/http"
)

func handleRoot(writer http.ResponseWriter, request *http.Request) {
	fmt.Println("new request from host", request.Host)
	response := "Yes, server is ready to serve!"
	fmt.Fprintf(writer, response)
}

func main() {
	fmt.Println("starting server...")
	http.HandleFunc("/", handleRoot)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
