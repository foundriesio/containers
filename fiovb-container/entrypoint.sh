#!/bin/sh -e

while true; do
	echo "Bootcount is $(fiovb_printenv bootcount)" || true
	echo "= $(date) ============================="
	sleep 10
done
