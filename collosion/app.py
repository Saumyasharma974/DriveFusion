from flask import Flask, request, jsonify
import joblib
import pandas as pd
import traceback  # for detailed error tracing

app = Flask(__name__)

try:
    model = joblib.load('collision_model.pkl')  # make sure this file exists
    print("✅ Model loaded successfully")
except Exception as e:
    print("❌ Error loading model:", e)
    exit(1)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        print("\n📥 Received JSON data:", data)

        # Make sure all 4 expected keys are present
        required_keys = ['x_accel', 'y_accel', 'z_accel', 'gps_speed']
        for key in required_keys:
            if key not in data:
                return jsonify({"error": f"Missing field: {key}"}), 400

        # Convert to DataFrame
        df = pd.DataFrame([data])
        print("🧾 Converted to DataFrame:\n", df)

        # Prediction
        prediction = model.predict(df)[0]
        print("🔮 Prediction:", prediction)

        return jsonify({'collision_detected': int(prediction)})

    except Exception as e:
        print("❌ Exception in /predict route:")
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
