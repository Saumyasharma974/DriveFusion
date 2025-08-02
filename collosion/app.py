from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)
model = joblib.load('collision_model.pkl')  # your trained model

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    df = pd.DataFrame([data])
    prediction = model.predict(df)[0]
    return jsonify({'collision_detected': int(prediction)})

if __name__ == '__main__':
    app.run(port=5000)
