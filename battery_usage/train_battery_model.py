import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

# Step 1: Load dataset
data = pd.read_csv("battery_data.csv")

# Step 2: Prepare input and output
X = data[['speed', 'distance', 'temperature']]
y = data['battery_used']

# Step 3: Train model
model = LinearRegression()
model.fit(X, y)

# Step 4: Save model
joblib.dump(model, "battery_model.pkl")
print("✅ Battery model trained and saved successfully.")
