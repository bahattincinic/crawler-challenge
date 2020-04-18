from rest_framework import serializers

from products.models import Product


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ('id', 'name', 'image',
                  'remote_url', 'created_at', 'updated_at',)


class CompareSerializer(serializers.Serializer):
    from_product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all()
    )
    to_product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all()
    )
