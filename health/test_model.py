import joblib
import pandas as pd

# Load the saved model
model = joblib.load('maintenance_model.pkl')

# Define test data WITH COLUMN NAMES as DataFrame
test_data = pd.DataFrame([
    [105, 0, 25, 15],
    [85, 1, 70, 50],
    [110, 1, 20, 10],
    [90, 1, 80, 40]
], columns=['engine_temp', 'brake_status', 'battery_level', 'fuel_level'])

# Predict for each row
for i, row in test_data.iterrows():
    input_df = pd.DataFrame([row])  # keeps column names
    prediction = model.predict(input_df)
    print(f"Test Sample {i+1}: Input = {row.values.tolist()}, Predicted Failure = {int(prediction[0])}")
