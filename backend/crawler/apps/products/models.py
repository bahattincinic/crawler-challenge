from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=255)
    image = models.URLField()
    html_content = models.TextField()
    remote_url = models.URLField(unique=True)

    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    def __str__(self):
        return self.name
