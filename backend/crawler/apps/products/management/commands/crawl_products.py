from django.core.management.base import BaseCommand

from products.crawler import Crawler, CrawlerDataImport


class Command(BaseCommand):

    def handle(self, *args, **options) -> None:
        crawler = Crawler()
        products = crawler.execute()

        self.stdout.write(
            self.style.SUCCESS(f"{len(products)} products crawled")
        )

        importer = CrawlerDataImport()
        results = importer.execute(products)

        self.stdout.write(
            self.style.SUCCESS(f"Import has been completed. "
                               f"Updated {results['updated']} products, "
                               f"Created {results['created']} products.")
        )
