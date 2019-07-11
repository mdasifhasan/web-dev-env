package main

import (
	"fmt"
	"net/http"
	"log"
)

func handleRoot(writer http.ResponseWriter, request *http.Request) {
	fmt.Println("new request from host", request.Host)
	fmt.Fprintf(writer, "Yes, server is ready to serve!")
}

func main(){
	fmt.Println("starting server...")
	http.HandleFunc("/", handleRoot)
	log.Fatal(http.ListenAndServe(":8080", nil))
}