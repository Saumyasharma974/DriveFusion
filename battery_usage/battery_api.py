from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load trained battery model
try:
    model = joblib.load("battery_model.pkl")  # Ensure this path is correct
    print("✅ Model loaded successfully!")
except Exception as e:
    print("❌ Failed to load model:", e)
    model = None

@app.route("/")
def home():
    return "🔋 Battery Usage Prediction API is Running!"

@app.route("/predict_battery", methods=["POST"])
def predict_battery():
    if model is None:
        return jsonify({"error": "Model not loaded properly"}), 500

    try:
        data = request.get_json()
        print("📥 Received data:", data)

        # Required input fields
        features = ['speed', 'distance', 'temperature']

        # Check for missing fields
        missing_fields = [f for f in features if f not in data]
        if missing_fields:
            return jsonify({
                "error": f"Missing input fields: {', '.join(missing_fields)}"
            }), 400

        # Prepare data for prediction
        input_data = [[data['speed'], data['distance'], data['temperature']]]
        df_input = pd.DataFrame(input_data, columns=features)
        print("📊 Input DataFrame:\n", df_input)

        # Predict
        prediction = model.predict(df_input)[0]
        print("🔮 Predicted Battery Usage:", prediction)

        return jsonify({
            "battery_used": round(prediction, 2),
            "message": "⚡ Battery usage estimated successfully!"
        })

    except Exception as e:
        print("❌ Error during prediction:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5002,debug=True)
