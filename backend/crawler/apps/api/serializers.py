from rest_framework import serializers

from products.models import Product


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ('id', 'name', 'price', 'image', 'html_content',
                  'remote_url', 'created_at', 'updated_at',)
