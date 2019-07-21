# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-08-07 09:11
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homepage', '0003_product_is_recommended'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='gender',
            field=models.IntegerField(choices=[(0, '男'), (1, '女')], default=0, verbose_name='性别'),
        ),
        migrations.AddField(
            model_name='message',
            name='username',
            field=models.CharField(blank=True, max_length=10, null=True, verbose_name='姓名'),
        ),
        migrations.AddField(
            model_name='position',
            name='welfare',
            field=models.TextField(blank=True, null=True, verbose_name='福利待遇'),
        ),
    ]
