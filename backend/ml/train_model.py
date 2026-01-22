import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score, mean_absolute_error

# Load data
df = pd.read_csv("ml/real_training_data.csv")

# ✅ DROP NaN values (IMPORTANT)
df = df.dropna()

X = df[
    ["investment_horizon", "risk_appetite", "volatility", "momentum", "trend"]
]
y = df["expected_return"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Model
model = RandomForestRegressor(
    n_estimators=400,
    max_depth=12,
    random_state=42
)

model.fit(X_train, y_train)

# Evaluation
preds = model.predict(X_test)
print("R2 Score:", round(r2_score(y_test, preds), 3))
print("MAE:", round(mean_absolute_error(y_test, preds), 2))

# Save model
joblib.dump(model, "ml/model.joblib")
print("✅ Model trained and saved")
