import joblib
import pandas as pd

# Step 1: Load the trained model
model = joblib.load('collision_model.pkl')

# Step 2: Create test data with column names
test_data = pd.DataFrame([{
    'x_accel': 3.0,
    'y_accel': 2.5,
    'z_accel': 11.0,
    'gps_speed': 10
}])

# Step 3: Make prediction
prediction = model.predict(test_data)


# Step 4: Display result
print("✅ Collision Detected!" if prediction[0] == 1 else "✅ No Collision.")
