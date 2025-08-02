# Step-by-step ML model training for accident detection

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# Step 1: Load the data
df = pd.read_csv('accident_100.csv')  # file must be in same folder

# Step 2: Select features and label
X = df[['x_accel', 'y_accel', 'z_accel', 'gps_speed']]  # inputs
y = df['collision_detected']  # output

# Step 3: Split into training and testing
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 4: Train the model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Step 5: Evaluate the model
y_pred = model.predict(X_test)
print("Model Accuracy:", accuracy_score(y_test, y_pred))

# Step 6: Save the model
joblib.dump(model, 'collision_model.pkl')
print("Model saved as 'collision_model.pkl'")
