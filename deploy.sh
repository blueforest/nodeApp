#!/bin/bash#!/bin/bash
#sh bin/build.sh
export PATH=/usr/local/bin:/bin:/usr/bin:$PATH
export NODE_ENV="production"
export PORT=80
NODEJS=/usr/local/bin/node
STDOUT_LOG=/home/admin/nodeApp/logs/nodejs_stdout.log


ACTION=$1
usage() {
  echo "Usage: {start|stop|restart}"
  exit 1;
}


if [ $# -lt 1 ]; then
  usage
fi


start()
{
        $NODEJS --harmony  bin/app.js >$STDOUT_LOG 2>&1 &
        echo "app start"
}
stop()
{
        ps -ef |grep node|grep -v grep|awk '{print $2}'|xargs kill -9
        echo "App stopped."
}

case "$ACTION" in
  start)
    start
  ;;
  stop)
    stop
  ;;
  restart)
    stop
    start
  ;;
esac