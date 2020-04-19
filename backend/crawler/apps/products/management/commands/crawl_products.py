from django.core.management.base import BaseCommand

from products.crawler import Crawler, CrawlerDataImport


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument(
            '--category-url',
            dest='category_url',
            help='Category page of website'
        )

    def handle(self, *args, **options) -> None:
        crawler = Crawler()
        products = crawler.execute(options['category_url'])

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
