package main

import (
	"fmt"
	"time"
	"net"
	"log"
	"github.com/digitalocean/go-libvirt"
	"net/http"
	//"encoding/json"
	//"os"
)

type UUID [16]byte

type Domain struct {
	Uuid UUID
}

func main() {
	initLibVirt();
}

func handleApiCall(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello")
}

func initHttpServer() http.Server {
	handler := http.NewServeMux()
	handler.HandleFunc("/api", handleApiCall)
	return http.Server {
		Addr: ":8080",
		Handler: handler,
	}
}

func initLibVirt() {
	libvirtSocket := "/var/run/libvirt/libvirt-sock"
	c, err := net.DialTimeout("unix", libvirtSocket, 2 * time.Second)
	if err != nil {
		log.Fatalf("Failed to dial libvirt: %v", err)
	}

	l := libvirt.New(c)
	if err := l.Connect(); err != nil {
		log.Fatalf("Unable to connect to libvirt: %v", err)
	}

	domains, err := l.Domains()
	if err != nil {
		log.Fatalf("Unable to list domains: %v", err)
	}

	for _, d := range domains {
		fmt.Printf("%3d. %s %x\n", d.ID, d.Name, d.UUID)
	}
}
