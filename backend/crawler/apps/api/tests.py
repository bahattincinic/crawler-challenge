from django.test import TestCase

from rest_framework import status

from products.models import Product


class ProductsAPITestCase(TestCase):
    fixtures = ['products.json']

    def test_product_list(self):
        response = self.client.get('/api/v1/products/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), Product.objects.count())


class CompareAPITestCase(TestCase):
    def test_similarity(self):
        html_document = '''
            <h1 class="title">First Document</h1>
            <ul class="menu">
                <li class="active">Documents</li>
                <li>Extra</li>
            </ul>
        '''

        p1 = Product.objects.create(
            name='test', image='http://example.com',
            html_content=html_document.strip(),
            remote_url='http://example2.com'
        )
        p2 = Product.objects.create(
            name='test', image='http://example.com',
            html_content=html_document.strip(),
            remote_url='http://example3.com'
        )

        response = self.client.post('/api/v1/compare/', {
            'from_product': p1.id,
            'to_product': p2.id
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['similarity'], 1)

    def test_invalid_product(self):
        response = self.client.post('/api/v1/compare/', {
            'from_product': 33333,
            'to_product': 555555
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
