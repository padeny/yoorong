import os
from os.path import isfile, join
from distutils.dir_util import copy_tree

from django.core.management.base import BaseCommand
from django.conf import settings

from homepage.models import Product


class Command(BaseCommand):
    help = """ttt"""

    def handle(self, *args, **options):
        image_list = [i for i in Product.objects.values_list('image', flat=True)]
        base_dir = settings.BASE_DIR

        images_location = os.path.join(base_dir, "upload/product_images/")
        il = images_location[:-1] if images_location[-1] == '/' else images_location
        copy_tree(images_location, il + ".bak")
        onlyfiles = ["product_images/"+f for f in os.listdir(images_location) if isfile(join(images_location, f))]
        for file_name in onlyfiles:
            if file_name not in image_list:
                file_path = os.path.join(base_dir, "upload/{}".format(file_name))
                os.remove(file_path)
        self.stdout.write(self.style.SUCCESS('清理成功, 另已备份在`$PWD/product_images.bak` .'))
