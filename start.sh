#!/bin/bash

start() {
    docker-compose up -d
}

stop() {
    docker-compose down
}

restart() {
    stop
    start
}

reload(){
    docker-compose stop "$@"
    docker-compose rm -f "$@"
    docker-compose up -d "$@"
}

shell() {
    docker-compose run --rm web sh
}

build() {
    docker-compose build
}

manage.py() {
    docker-compose run --rm web ./manage.py "$@"
}

Action="$1"
shift
$Action "$@" || echo "usage: $0 start|stop|reload|restart|shell|build|manage.py"
