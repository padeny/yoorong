from django.contrib import admin
from django.forms import ModelForm
from django.contrib.admin import ModelAdmin
from suit_redactor.widgets import RedactorWidget
from homepage.models import *


#class ProductForm(ModelForm):
#    class Meta:
#        widgets = {
#            'name': RedactorWidget(editor_options={'lang': 'en'}),
#            'introduction': RedactorWidget(editor_options={'lang': 'en'}),
#            'detail': RedactorWidget(editor_options={'lang': 'en'})
#        }


class ProductAdmin(admin.ModelAdmin):
#    form = ProductForm
#    fieldsets = [
#      ('产品名称', {'classes': ('full-width',), 'fields': ('name',)}),
#      ('产品简介', {'classes': ('full-width',), 'fields': ('introduction',)}),
#      ('产品详情', {'classes': ('full-width',), 'fields': ('detail',)}),
#    ]
    
    actions=['really_delete_selected']

    def get_actions(self, request):
        actions = super(ProductAdmin, self).get_actions(request)
        del actions['delete_selected']
        return actions

    def really_delete_selected(self, request, queryset):
        for obj in queryset:
            obj.delete()

        if queryset.count() == 1:
            message_bit = "1 entry was"
        else:
            message_bit = "%s entries were" % queryset.count()
        self.message_user(request, "%s successfully deleted." % message_bit)
    really_delete_selected.short_description ="删除选中的产品" 


admin.site.register(Product, ProductAdmin)
admin.site.register([News, Position, Message])
