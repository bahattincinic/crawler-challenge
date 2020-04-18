import asyncio
import itertools
from typing import List
from dataclasses import dataclass

import aiohttp

from bs4 import BeautifulSoup

from django.conf import settings

from products.models import Product


@dataclass
class CrawlerResponse:
    url: str
    image: str
    content: str
    name: str


class Crawler(object):

    async def _fetch_url(self, url: str) -> str:
        """
        This function returns given url HTML response.
        """
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                html = await response.text()
                return html

    async def _fetch_category_links(self, url: str) -> List[str]:
        content: str = await self._fetch_url(url)
        soup = BeautifulSoup(content, 'html.parser')
        urls = []

        product_markups = soup.find_all('div', class_='gallery-item')
        for product_markup in product_markups:
            link = product_markup.find('a')

            if 'product-link-to-pdp' not in link.get('class'):
                # Remove promotion banners
                continue

            if link and link.get('href'):
                urls.append(
                    f"https:{link.get('href')}"
                )

        return urls

    async def _fetch_product(self, url: str) -> CrawlerResponse:
        content: str = await self._fetch_url(url)
        soup = BeautifulSoup(content, 'html.parser')

        image = (soup.find('div', class_='product-img')
                 .find('img').get('data-src-desktop'))
        name = soup.find('h1').get_text()

        return CrawlerResponse(
            name=name,
            url=url,
            content=content,
            image=f'https:{image}'
        )

    def execute(self) -> List[CrawlerResponse]:
        loop = asyncio.get_event_loop()

        # fetch product links
        urls_task, _ = loop.run_until_complete(asyncio.wait([
            self._fetch_category_links(category_url)
            for category_url in settings.CRAWLER_ENDPOINTS
        ]))

        flatten_urls: List[str] = list(itertools.chain.from_iterable([
            url_task.result()
            for url_task in urls_task
        ]))

        # fetch product contents
        products, _ = loop.run_until_complete(asyncio.wait([
            self._fetch_product(url)
            for url in flatten_urls
        ]))

        loop.close()

        return [
            product.result()
            for product in products
        ]


class CrawlerDataImport(object):

    def process_item(self, item: CrawlerResponse) -> Product:
        instance = Product.objects.filter(remote_url=item.url).first()
        if not instance:
            instance = Product()

        instance.remote_url = item.url
        instance.html_content = item.content
        instance.image = item.image
        instance.name = item.name
        instance.save()

        return instance

    def execute(self, products: List[CrawlerResponse]) -> None:
        for item in products:
            self.process_item(item)
