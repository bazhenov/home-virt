frontend/build:
	npm --prefix ./frontend run-script build

statik: frontend/build
	statik -src=./frontend/build

home-virt: statik
	go build

all: home-virt

clean:
	rm -rf home-virt ./statik ./frontend/build
