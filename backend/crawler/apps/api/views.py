from rest_framework import viewsets
from rest_framework.response import Response

from html_similarity import similarity

from api.serializers import CompareSerializer
from products.models import Product
from .serializers import ProductSerializer


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CompareViewSet(viewsets.GenericViewSet):
    queryset = Product.objects.all()
    serializer_class = CompareSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        from_product: Product = serializer.validated_data['from_product']
        to_product: Product = serializer.validated_data['to_product']

        result = similarity(from_product.html_content,
                            to_product.html_content)

        return Response(
            data={'similarity': result}
        )

