# AI-Based Smart EV Monitoring & Emergency Response System 🚗⚡

An integrated MERN + ML + Sensor-based solution for real-time EV monitoring, predictive maintenance, accident detection, and emergency response.

## 🔍 Problem Statement

As EV adoption increases, they still face challenges:

- Lack of real-time vehicle health and battery monitoring
- No smart route planning considering battery range and terrain
- Delayed emergency response after accidents
- Poor predictive maintenance and breakdown forecasting

---

## 🎯 Objectives

Build a **web-based dashboard** that:

- Monitors EV and battery health live
- Predicts accidents and component failures using ML
- Provides a battery-aware route planner
- Sends emergency alerts via SMS/Email
- Displays a visual dashboard for trips, alerts, and analytics

---

## 🚀 Features

### 🔧 Vehicle & Battery Health Monitoring
- Live stats: battery %, motor temperature, brakes
- Predictive maintenance using ML models

### 🚨 Accident Detection Module
- Detects accidents using accelerometer and GPS (simulated)
- Sends geolocation-based alerts via SMS/Email

### 🗺️ Battery-Aware Route Planner
- ML-based range prediction
- Warns if route exceeds current charge
- Suggests charging stations (via OpenChargeMap)

### 📊 EV Dashboard
- Real-time monitoring
- Trip history and health analytics
- Emergency timeline

### 📩 Alert System
- Uses **Twilio** and **Nodemailer**
- Sends alerts for low battery, accidents, and faults

---

## 🧰 Tech Stack

| Layer        | Technologies                             |
|--------------|------------------------------------------|
| Frontend     | React.js, Tailwind CSS, Leaflet.js, Recharts |
| Backend      | Node.js, Express.js                      |
| Database     | MongoDB                                  |
| ML Models    | Python (Scikit-learn, Flask API), optional TensorFlow.js |
| Sensors      | Simulated data (CSV/Generator)           |
| APIs         | OpenChargeMap, Google Maps               |
| Alerts       | Twilio, Nodemailer                       |

---

## 🧠 ML Models Used

- **Accident Detection**: Random Forest / SVM
- **Battery Estimation**: Linear Regression
- **Component Failure Prediction**: Logistic Regression

Inputs include: accelerometer, speed, temperature, GPS, usage time, etc.

---

## 📆 Implementation Timeline

| Phase | Task                                      | Duration |
|-------|-------------------------------------------|----------|
| 1     | Sensor data simulation                    | 1 week   |
| 2     | ML model training                         | 1 week   |
| 3     | Backend & Flask API integration           | 1 week   |
| 4     | Frontend dashboard + data visualization   | 1 week   |
| 5     | Alert system integration & testing        | 1 week   |
| 6     | Final demo + polish                       | 2-3 days |

---

## 🎯 Expected Outcomes

- Fully functional EV monitoring dashboard
- ML-powered accident and battery prediction
- Real-time SMS/Email alerts
- Battery-aware navigation with charge stops
- Rich visual analytics for evaluation

---

## 🔮 Future Scope

- Integration with real EV hardware (OBD-II)
- Fleet monitoring for logistics companies
- Mobile app with voice assistant

---

## 📸 Screenshots

> *(Include screenshots/gifs of dashboard, alert examples, and route planner here)*

---

## 🤝 Contributions

Open to contributions. Feel free to fork the repo and submit pull requests for enhancements or bug fixes.

---

## 📜 License

This project is licensed under the MIT License. See `LICENSE` for more details.

---

## 🙋‍♂️ Contact

For queries or collaboration:  
**Your Name** – [your.email@example.com]  
**LinkedIn** – [linkedin.com/in/your-profile]  
