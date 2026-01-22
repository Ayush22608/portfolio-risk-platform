from rest_framework import serializers

class PortfolioInputSerializer(serializers.Serializer):
    investment_amount = serializers.FloatField()
    investment_horizon = serializers.IntegerField()
    risk_appetite = serializers.ChoiceField(
        choices=["low", "medium", "high"]
    )


class PortfolioOutputSerializer(serializers.Serializer):
    risk_level = serializers.CharField()
    expected_return = serializers.FloatField()
