#!/bin/sh -ex

cd /opt/cf-proxy
java -jar cf-proxy-2.0.0-SNAPSHOT.jar &
PID=$!
sleep 2

found=0
for x in `seq 10` ; do
	sleep $(expr 2 \* $x)
	if netstat -ln | grep 5682 ; then
		netstat -ln | grep 8080
		found=1
		break
	fi
done

kill $PID

if [ $found -ne 1 ] ; then
	echo "Could not find ports 5682 and 8080"
	exit 1
fi
