FROM python:3.7-stretch


COPY ./requirements/base.txt base.txt
COPY ./requirements/dev.txt requirements.txt
RUN pip install -r requirements.txt
RUN rm base.txt
RUN rm requirements.txt

ENV DJANGO_SETTINGS_MODULE "crawler.settings.dev"

WORKDIR /crawler
CMD [ "python" ]
