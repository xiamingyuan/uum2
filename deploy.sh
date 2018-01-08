#!/bin/bash

echo "************start..."

mvn -P test clean package
scp ./target/mi-uum.war root@10.117.130.45:/usr/local/web/jetty-uum/webapps/root.war
ssh root@10.117.130.45 "/usr/local/web/jetty-uum/bin/jetty.sh restart"

echo "************finish"
