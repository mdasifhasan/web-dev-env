package main

import (
	"testing"
	"net/http/httptest"
	"net/http"
)

func TestHandleRoot(t *testing.T){
	t.Run("Test Get Request on Root", func(t *testing.T) {
		request := httptest.NewRequest(http.MethodGet, "/", nil)
		response := httptest.NewRecorder()

		handler := http.HandlerFunc(handleRoot)
		handler.ServeHTTP(response, request)

		if status := response.Code; status != http.StatusOK {
			t.Errorf("handler returned wrong status: %v want: %v", status, http.StatusOK)
		}

		expected := "Yes, server is ready to serve!"
		if body := response.Body.String(); body != expected {
			t.Errorf("handler returned wrong message: %v want: %v", body, expected)
		}
	})

	t.Run("Test Get Request on /api", func(t *testing.T) {
		request := httptest.NewRequest(http.MethodGet, "/api", nil)
		response := httptest.NewRecorder()

		handler := http.HandlerFunc(handleRoot)
		handler.ServeHTTP(response, request)

		if status := response.Code; status != http.StatusOK {
			t.Errorf("handler returned wrong status: %v want: %v", status, http.StatusOK)
		}

		expected := "Yes, server is ready to serve!"
		if body := response.Body.String(); body != expected {
			t.Errorf("handler returned wrong message: %v want: %v", body, expected)
		}
	})
}