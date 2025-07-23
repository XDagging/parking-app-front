# 🚗 Park'd Up — AI-Powered Parking Risk Predictor

**Park'd Up** is a smart, location-based app that helps drivers make quick, informed decisions about where to park—even in places where it's technically illegal. By leveraging historical citation and availability data, Park'd Up predicts how likely you are to receive a ticket in a specific area at a specific time.

> ⚠️ **Disclaimer:** Park'd Up is intended for informational and educational use only. It does not encourage or endorse illegal parking. Always comply with local laws and regulations.

---

## 🌟 Features

- 📍 **Location-Aware**: Detects your current location to provide instant, hyperlocal analysis.
- 📈 **Ticket Risk Prediction**: Estimates your likelihood of being ticketed using machine learning.
- 🅿️ **Spot Availability Insights**: Highlights areas where open parking spots are more common—even if they bend the rules.
- ⏱ **Time-Sensitive Predictions**: Takes time of day and day of week into account for maximum accuracy.

---

## 🧠 How It Works

1. **Data Collection**  
   We used open source historical data, including:
   - Parking ticket records
   - Metered vs. unmetered zone data
   - Street sweeping and enforcement schedules (where available)

2. **Machine Learning Model**  
   The data was preprocessed and trained on a **Random Forest Classifier**, chosen for its accuracy and interpretability. Key features used include:
   - Latitude & Longitude
   - Time of Day
   - Day of Week
   - Type of violation
   - Location-specific citation frequency

3. **Real-Time Analysis**  
   When you open the app, Park'd Up analyzes your current location and compares it against historical trends to give you a risk score:  
   - ✅ Low Risk  
   - ⚠️ Medium Risk  
   - ❌ High Risk

---

## 📦 Tech Stack

- **Frontend**: React Native (Expo)
- **Backend**: Node.js + Express
- **ML Model**: Python (scikit-learn Random Forest Classifier)
- **Data Storage**: AWS S3 + SecureStore for credentials
- **APIs**: Custom API for real-time inference

---

## 📚 Sources

- City-level parking citation datasets (e.g., NYC Open Data, LA Open Data)
- Public GIS zoning and curb regulation files
- Meter availability APIs (where applicable)

---

## ⚖️ License

MIT License. See `LICENSE` file for details.

---

## 🙋 FAQ

**Q: Is this legal to use?**  
A: The app only uses publicly available data and provides informational predictions. It’s your responsibility to obey local laws.

**Q: Does this guarantee I won’t get a ticket?**  
A: No. Park'd Up predicts *likelihood*, not certainty. Enforcement patterns can change.

**Q: Will this work in every city?**  
A: Coverage is limited to cities with accessible historical parking citation data. More cities are being added.

---

## 🚀 Future Plans

- Integration with live city parking feeds
- Crowdsourced reporting of open spots
- Heatmaps of enforcement zones
- iOS and Android store releases

---

## 🤝 Contributing

We welcome contributions! If you're interested in helping us expand coverage or improve the model, feel free to submit a PR or open an issue.

---

## 👨‍💻 Created by Sebastian Hernandez-Tavares

