#!/bin/bash


export LANG=en_US.UTF-8

declare -r __PWD__=$(pwd)
declare -r __USER__=$(whoami)
declare VERSION=`date "+%Y%m%d%H%M%S"`

echo "${__USER__} build version@${VERSION} ..."
cd $(dirname -- "${0}")


git reset --hard
git pull origin HEAD
npm install

if [ ${?} -ne 0 ] ; then
    echo "failed to install node_modules!"
    exit 1;
fi
echo "node_modules installed."

envType=$1

declare __ENV__=${envType}

case $envType in
    daily )
    # 日常
    __ENV__="development"
    ;;
    # 生产
    publish )
    __ENV__="production"
    ;;
    * )
    # 默认为线上
    __ENV__="production"
    ;;
esac

echo $__ENV__ > .env


cd ${__PWD__}
echo "build successfully"

exit 0
