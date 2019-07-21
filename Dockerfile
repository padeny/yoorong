FROM python:3.5-alpine

LABEL maintainer="padeny.yang@gmail.com"

ENV TZ "Asia/Shanghai"

RUN echo "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.10/main" > /etc/apk/repositories

RUN apk add --update --no-cache g++ gcc linux-headers pcre-dev openssl \
    python3-dev jpeg-dev \
    && rm -rf /var/cache/apk/*

WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip3 install -i https://pypi.doubanio.com/simple -r requirements.txt

EXPOSE 8083
CMD ["uwsgi", "--ini", "./yoorong/uwsgi.ini"]
