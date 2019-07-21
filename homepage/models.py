from django.db import models
from django.conf import settings
import os
from homepage.storage import OverwriteStorage 


class News(models.Model):
    title = models.CharField(max_length=100, verbose_name="新闻标题")
    content = models.TextField(verbose_name="新闻内容")
    author = models.CharField(max_length=50, blank=True, null=True,
                              verbose_name="作者")
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = '公司新闻'
        verbose_name_plural = "公司新闻"
    
    def __str__(self):
        return self.author + self.title if self.author else self.title

def content_file_name(instance, filename):
    file_name = instance.name
    base_dir = settings.BASE_DIR
    file_path = os.path.join(base_dir,"upload/product_images/{}".format(file_name))
    if os.path.exists(file_path):
        os.remove(file_path)
    return os.path.join("product_images", file_name)

class Product(models.Model):
    name = models.CharField(max_length=100, unique=True,
                            verbose_name="产品名称")
    #image = models.FileField(upload_to='product_images', storage=\
     #       OverwriteStorage(), null=True, blank=True, verbose_name="图片")
    image = models.FileField(upload_to=content_file_name, null=True,
                blank=True, verbose_name="图片")
    category = models.CharField(max_length=20, verbose_name="类别")
    introduction = models.TextField(verbose_name="产品简介")
    detail = models.TextField(verbose_name="详细信息")
    is_recommended = models.BooleanField(default=False, verbose_name="是否推荐")
    created_date = models.DateTimeField(auto_now_add=True, blank=True,
                                        null=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = '产品'
        verbose_name_plural = "产品"
    
    def __str__(self):
        return self.category + ":" + self.name

    def delete(self, *args, **kwargs):
        file_name = self.name
        base_dir = settings.BASE_DIR
        file_path = os.path.join(base_dir,"upload/product_images/{}".format(file_name))
        if os.path.exists(file_path):
            os.remove(file_path)
        super(Product, self).delete(*args, **kwargs)   


class Message(models.Model):
    GENDER_CHOICES = (
                         (0, '男'),
                         (1, '女'),
                     )
    username = models.CharField(max_length=10, blank=True, null=True,
                                verbose_name="姓名")
    gender = models.IntegerField(choices=GENDER_CHOICES, default=0, verbose_name="性别")
    contact_way = models.CharField(max_length=30, verbose_name="联系方式")

    message_content = models.TextField(verbose_name="留言内容")
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = '留言'
        verbose_name_plural = "留言"

    def __str__(self):
        return self.message_content


class Position(models.Model):
    name = models.CharField(max_length=30, verbose_name="职位")
    duty = models.TextField(verbose_name="岗位职责")
    requirements = models.TextField(verbose_name="任职要求")
    welfare = models.TextField(blank=True, null=True, verbose_name="福利待遇")
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = '职位'
        verbose_name_plural = "职位"
    
    def __str__(self):
        return self.name
