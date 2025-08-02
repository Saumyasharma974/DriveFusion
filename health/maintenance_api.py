from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load the saved model
model = joblib.load("maintenance_model.pkl")

@app.route("/")
def home():
    return "🚗 Predictive Maintenance API is Running!"

@app.route("/predict_maintenance", methods=["POST"])
def predict_failure():
    try:
        data = request.get_json()

        # Expected input keys
        features = ['engine_temp', 'brake_status', 'battery_level', 'fuel_level']

        # Extract in correct order
        input_data = [[
            data['engine_temp'],
            data['brake_status'],
            data['battery_level'],
            data['fuel_level']
        ]]

        # Create a DataFrame with column names
        df_input = pd.DataFrame(input_data, columns=features)

        # Predict
        prediction = model.predict(df_input)

        # Return result
        return jsonify({
            "vehicle_failure": int(prediction[0]),
            "message": "🔧 Failure expected!" if prediction[0] else "✅ Vehicle is healthy!"
        })

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
