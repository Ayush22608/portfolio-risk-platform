from django.urls import path
from .views import PortfolioPredictionView

urlpatterns = [
    path("predict/", PortfolioPredictionView.as_view()),
]
