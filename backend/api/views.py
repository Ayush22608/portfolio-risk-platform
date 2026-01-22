import os
import joblib
import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import PortfolioInputSerializer

# Load trained ML model
MODEL_PATH = os.path.join(
    os.path.dirname(__file__), "..", "ml", "model.joblib"
)
model = joblib.load(MODEL_PATH)


class PortfolioPredictionView(APIView):
    def post(self, request):
        serializer = PortfolioInputSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data

        # Convert risk appetite to numeric
        risk_map = {
            "low": 0,
            "medium": 1,
            "high": 2
        }

        # Create input dataframe (IMPORTANT FIX)
        features = pd.DataFrame([{
            "investment_horizon": data["investment_horizon"],
            "risk_appetite": risk_map[data["risk_appetite"]],
            "volatility": 0.012,
            "momentum": 0.02,
            "trend": 0.001
        }])

        # ML prediction
        predicted_return = model.predict(features)[0]

        # -------------------------------
        # SMART RISK LOGIC (FIXED)
        # -------------------------------
        risk_score = (
            predicted_return * 0.6 +
            data["investment_horizon"] * 0.2 +
            risk_map[data["risk_appetite"]] * 5
        )

        if risk_score < 10:
            risk_level = "Low"
            confidence = "High"
        elif risk_score < 18:
            risk_level = "Medium"
            confidence = "Moderate"
        else:
            risk_level = "High"
            confidence = "Speculative"

        # -------------------------------
        # INVESTMENT PROJECTION
        # -------------------------------
        projected_value = data["investment_amount"] * (
            1 + predicted_return / 100
        ) ** data["investment_horizon"]

        return Response({
            "risk_level": risk_level,
            "expected_return": round(float(predicted_return), 2),
            "projected_value": round(projected_value, 2),
            "model_used": "RandomForestRegressor",
            "confidence": confidence
        })
