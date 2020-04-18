from rest_framework import routers

from .views import CompareViewSet, ProductViewSet


router = routers.DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'compare', CompareViewSet)


urlpatterns = router.urls
