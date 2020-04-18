from django.core.management.base import BaseCommand

from products.crawler import Crawler, CrawlerDataImport


class Command(BaseCommand):

    def handle(self, *args, **options):
        crawler = Crawler()
        products = crawler.execute()

        self.stdout.write(
            self.style.SUCCESS(f"{len(products)} products crawled")
        )

        importer = CrawlerDataImport()
        importer.execute(products)

        self.stdout.write(
            self.style.SUCCESS("Import has been completed.")
        )
