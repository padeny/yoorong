## Setup

1. `./start.sh build`

2. migrate 'db.sqlite3' and 'upload/product_images'

3. `./start.sh start`


## Clean up needless product_image

    `./start.sh manage.py image_cleanup`


## Update frontend

    Replace `static` and `template` in the frontend directory and then,

    `./start.sh reload nginx`
