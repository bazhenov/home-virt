#!/bin/sh

find . -maxdepth 1 -name \*.go | entr -s 'clear; go test'
