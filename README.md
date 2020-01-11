## Setup

1. `cp .env.sample .env` and set environment variablev
2. `source .env`
3. `./start.sh build`
4. migrate 'db.sqlite3' and 'upload/product_images'
5. `./start.sh start`


## Clean up needless product_image

    `./start.sh manage.py image_cleanup`


## Update frontend

    Replace `static` and `templates` in the frontend directory and then,

    `./start.sh reload nginx`
