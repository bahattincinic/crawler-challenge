from django.test import TestCase

from products.crawler import CrawlerDataImport, CrawlerResponse
from products.models import Product


class DataImportTestCase(TestCase):

    def test_create(self):
        importer = CrawlerDataImport()
        item = CrawlerResponse(
            url='http://create.com', image='http://example.com',
            content='<html></html>', name='Test'
        )

        response = importer.execute([item])

        self.assertEqual(response['created'], 1)
        self.assertEqual(response['updated'], 0)

    def test_update(self):
        importer = CrawlerDataImport()
        p1 = Product.objects.create(
            name='test', image='http://update.com',
            html_content='<html></html>', remote_url='http://example.com'
        )

        item = CrawlerResponse(
            url=p1.remote_url, image=p1.image,
            content=p1.html_content, name=p1.name
        )

        response = importer.execute([item])

        self.assertEqual(response['created'], 0)
        self.assertEqual(response['updated'], 1)
