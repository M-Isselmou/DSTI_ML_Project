from flask import Flask, request, jsonify 
from flask_cors import CORS
import joblib
import pandas as pd
import os
from Preprocessing_pipeline import preprocess_pipeline  # import the new global preprocessing function

app = Flask(__name__)
CORS(app)
MODEL_PATH = "./model/cyber_attack_lr_model.joblib"
model = joblib.load(MODEL_PATH)


@app.route("/predict", methods=["POST"])
def predict():
    try:
        init_data = request.get_json()

        # Create a dictionary mapping the frontend keys (camelCase)
        data = {
            "Source IP Address": init_data.get("sourceIP"),
            "Destination IP Address": init_data.get("destIP"),
            "Source Port": init_data.get("sourcePort"),
            "Destination Port": init_data.get("destPort"),
            "Protocol": init_data.get("protocol"),
            "Packet Length": init_data.get("packetLength"),
            "Packet Type": init_data.get("packetType"),
            "Traffic Type": init_data.get("trafficType"),
            "Payload Data": init_data.get("payload"),
            "Malware Indicators": init_data.get("malwareIndicators"),
            "Anomaly Scores": init_data.get("anomalyScore"),
            "Alerts/Warnings": init_data.get("alerts"),
            "Attack Type": init_data.get("attackType"),
            "Attack Signature": init_data.get("attackSignature"),
            "Action Taken": init_data.get("actionTaken"),
            "Severity Level": init_data.get("severity"),
            "User Information": init_data.get("userInfo"),
            "Device Information": init_data.get("deviceInfo"),
            "Network Segment": init_data.get("networkSegment"),
            "Geo-location Data": init_data.get("geoLocation"),
            "Proxy Information": init_data.get("proxyInfo"),
            "Firewall Logs": init_data.get("firewallLogs"),
            "IDS/IPS Alerts": init_data.get("idsAlerts"),
            "Log Source": init_data.get("logSource"),
        }

        # Build a DataFrame with the desired columns
        df = pd.DataFrame([data])
        # print("Raw DataFrame:\n", df.to_json())

        # Apply your preprocessing
        processed_df = preprocess_pipeline(df)
        # print("Processed DataFrame:\n", processed_df.to_json())

        # Predict with your model
        prediction = model.predict(processed_df)[0]
        # print("Prediction:", prediction)

        # Return the result in JSON format
        return jsonify({"prediction": (prediction)})

        
    except Exception as e:
        print("❌ Prediction error:", str(e))
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)