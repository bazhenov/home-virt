package main

import (
	"testing"
	"encoding/json"
	"strings"
	"github.com/digitalocean/go-libvirt"
)

func TestJsonEncoding(t *testing.T) {
	input := `{"Name":"windows-hell","UUID":[182,26,103,15,83,187,71,232,171,252,250,102,69,102,109,150],"ID":-1}`
	var domain libvirt.Domain
	json.NewDecoder(strings.NewReader(input)).Decode(&domain)
	vm := VmFromDomain(domain)

	bytes, _ := json.Marshal(vm)
	if string(bytes) != `{"name":"windows-hell","uuid":"b61a670f53bb47e8abfcfa6645666d96","is_running":false}` {
		t.Errorf("%v", string(bytes))
	}

	var vmCopy Vm
	e := json.Unmarshal(bytes, &vmCopy)
	if e != nil {
		t.Errorf("%s", e.Error())
	}
	if vm != vmCopy {
		t.Errorf("%x", vmCopy.Uuid)
		t.Errorf("JSON deserialization failed")
	}
}
