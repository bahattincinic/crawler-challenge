from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=36, decimal_places=2)
    image = models.ImageField(upload_to='products/')
    html_content = models.TextField()
    remote_url = models.URLField()

    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    def __str__(self):
        return self.name
