from flask import Flask, request, jsonify
import joblib
import pandas as pd
import traceback

app = Flask(__name__)

# Load the saved model
try:
    model = joblib.load("maintenance_model.pkl")
    print("✅ Maintenance model loaded successfully.")
except Exception as e:
    print("❌ Failed to load the maintenance model:", e)
    exit(1)

@app.route("/")
def home():
    return "🚗 Predictive Maintenance API is Running!"

@app.route("/predict_maintenance", methods=["POST"])
def predict_failure():
    try:
        data = request.get_json()
        print("\n📥 Incoming Request Data:", data)

        # Expected input keys
        expected_keys = ['engine_temp', 'brake_status', 'battery_level', 'fuel_level']
        
        # Validate keys
        for key in expected_keys:
            if key not in data:
                print(f"⚠️ Missing field: {key}")
                return jsonify({"error": f"Missing field: {key}"}), 400

        # Extract in correct order
        input_data = [[
            data['engine_temp'],
            data['brake_status'],
            data['battery_level'],
            data['fuel_level']
        ]]
        print("📊 Prepared Input Array:", input_data)

        # Create a DataFrame with column names
        df_input = pd.DataFrame(input_data, columns=expected_keys)
        print("🧾 Input DataFrame:\n", df_input)

        # Predict
        prediction = model.predict(df_input)[0]
        print("🔮 Prediction Output:", prediction)

        # Return result
        return jsonify({
            "vehicle_failure": int(prediction),
            "message": "🔧 Failure expected!" if prediction else "✅ Vehicle is healthy!"
        })

    except Exception as e:
        print("❌ Error in /predict_maintenance:")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
