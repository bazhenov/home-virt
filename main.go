package main

import (
	"fmt"
	"time"
	"net"
	"log"
	"github.com/digitalocean/go-libvirt"
	"net/http"
	"github.com/rakyll/statik/fs"
	"encoding/json"
	_ "me/bazhenov/home-virt/statik"
)

type UUID libvirt.UUID

type Vm struct {
	Name			string	`json:"name"`
	Uuid			UUID		`json:"uuid"`
	IsRunning bool		`json:"is_running"`
}

func (uuid UUID) MarshalJSON() ([]byte, error) {
	return json.Marshal(fmt.Sprintf("%x", uuid))
}

func VmFromDomain(domain libvirt.Domain) Vm {
	return Vm { Name: domain.Name, Uuid: UUID(domain.UUID), IsRunning: domain.ID > 0 }
}

func main() {
	lv := initLibVirt();
	srv := initHttpServer(lv)
	srv.ListenAndServe()
}

func VmsFromDomains(domains []libvirt.Domain) []Vm {
	vms := make([]Vm, 0)
	for _, domain := range domains {
		vms = append(vms, VmFromDomain(domain))
	}
	return vms
}

func handleVmList(lv *libvirt.Libvirt) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		domains, err := lv.Domains()
		if err != nil {
			w.WriteHeader(500)
			w.Write([]byte(err.Error()))
		}
		encoder := json.NewEncoder(w)
		encoder.Encode(VmsFromDomains(domains))
	}
}

func initHttpServer(lv *libvirt.Libvirt) http.Server {
	handler := http.NewServeMux()

	statikFS, err := fs.New()
  if err != nil {
    log.Fatal(err)
  }

  handler.Handle("/", http.FileServer(statikFS))
	handler.HandleFunc("/api/vm/list", handleVmList(lv))

	return http.Server {
		Addr: ":8080",
		Handler: handler,
	}
}

func initLibVirt() *libvirt.Libvirt {
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
	return l
}
