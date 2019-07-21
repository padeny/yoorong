from datetime import datetime
import re
from tastypie.resources import Resource, ModelResource, ALL, ALL_WITH_RELATIONS
from tastypie.authorization import Authorization
from tastypie import fields
from tastypie.serializers import Serializer
from tastypie.exceptions import NotFound
from homepage.models import News, Product, Position, Message


class NewsResource(ModelResource):

    class Meta:
        queryset = News.objects.all()
        resource_name = 'news'
        authorization = Authorization()
        allow_methods = ['get']
        serializer = Serializer(formats=['json', 'jsonp'])


class ProductResource(ModelResource):

    class Meta:
        queryset = Product.objects.all()
        resource_name = 'product'
        authorization = Authorization()
        allow_methods = ['get']
        serializer = Serializer(formats=['json', 'jsonp'])
        filtering = {
                "category": ALL,
                "is_recommended": ALL
                }


class PositionResource(ModelResource):

    class Meta:
        queryset = Position.objects.all()
        resource_name = 'position'
        authorization = Authorization()
        allow_methods = ['get']
        serializer = Serializer(formats=['json', 'jsonp'])


class MessageResource(ModelResource):

    class Meta:
        queryset = Message.objects.all()
        resource_name = 'message'
        authorization = Authorization()
        allow_methods = ['get', 'post']
        serializer = Serializer(formats=['json', 'jsonp'])
        always_return_data = True


class BaseJsonModel(object):
    '''
    We need a generic object to shove data in/get data from for modelResource.
    '''
    def __init__(self, initial=None):
        self.__dict__['_data'] = {}

        if hasattr(initial, 'items'):
            self.__dict__['_data'] = initial

    def __getattr__(self, name):
        return self._data.get(name, None)

    def __setattr__(self, name, value):
        self.__dict__['_data'][name] = value

    def to_dict(self):
        return self._data


class CategoryResource(Resource):
    category_list = fields.ListField(attribute='category_list')
    category_count = fields.IntegerField(attribute='category_count')

    class Meta:
        resource_name = 'category'
        object_class = BaseJsonModel
        fields = ['category_list', 'category_count']
        allowed_methods = ['get']
        include_resource_uri = False
        serializer = Serializer(formats=['json', 'jsonp'])

    def get_object_list(self, request=None, **kwargs):
        tmp = Product.objects.values_list('category',flat=True)
        category_list = sorted(list(set(tmp)))
        category_count = len(category_list)

        result = BaseJsonModel()
        result.category_list = category_list
        result.category_count = category_count
        return [result]

    def obj_get_list(self, bundle, **kwargs):
        return self.get_object_list(bundle.request)


class ProductNameResource(Resource):
    name_list = fields.ListField(attribute='name_list')

    class Meta:
        resource_name = "product_name"
        object_class = BaseJsonModel
        fields = ['name_list']
        allowed_methods = ['get']
        include_resource_uri = False
        serializer = Serializer(formats=['json', 'jsonp'])

    def get_object_list(self, request=None, **kwargs):
        tmp = Product.objects.values_list("id", "name")
        name_list = []
        for _id, name in tmp:
            name_list.append({
                    "id": _id,
                    "product_name": name
                })
        result = BaseJsonModel()
        result.name_list = name_list
        return [result]
    
    def obj_get_list(self, bundle, **kwargs):
        return self.get_object_list(bundle.request)
