import yfinance as yf
import pandas as pd
import numpy as np

# Download data
ticker = "^NSEI"
data = yf.download(ticker, start="2010-01-01", end="2024-01-01")

# Fix column structure
if isinstance(data.columns, pd.MultiIndex):
    data.columns = data.columns.get_level_values(0)

# Log returns
data["log_return"] = np.log(data["Close"] / data["Close"].shift(1))

# Features
data["volatility"] = data["log_return"].rolling(60).std()
data["momentum_10"] = data["log_return"].rolling(10).sum()
data["ma_50"] = data["Close"].rolling(50).mean()

# Target
data["expected_return"] = data["log_return"].rolling(60).mean() * 252 * 100

data = data.dropna()

# Final dataset
df = pd.DataFrame()
df["investment_horizon"] = np.random.randint(1, 15, len(data))
df["risk_appetite"] = np.random.choice([0, 1, 2], len(data))
df["volatility"] = data["volatility"].values
df["momentum"] = data["momentum_10"].values
df["trend"] = data["ma_50"].pct_change().values
df["expected_return"] = data["expected_return"].values

df.to_csv("ml/real_training_data.csv", index=False)

print("✅ Dataset generated successfully")
print(df.head())
print("Rows:", len(df))
