# AI-Driven Chronic Care Patient Risk Prediction Dashboard
## Access the dashboard at https://predictmyhealth.netlify.app/

## Overview

This project delivers a secure, clinician-friendly dashboard for chronic care patient management, leveraging AI-based risk prediction to identify and proactively manage patient deterioration. Designed for hospitals, clinics, and care teams, it integrates data-driven alerts, role-based access, and actionable clinical insights.

## Features

- **Patient Risk Scoring:** 90-day deterioration probabilities, color-coded risk levels (High/Medium/Low)
- **Real-Time Analytics:** Vital sign trends, feature importance for every prediction
- **Alerts \& Notifications:** Prioritization, escalation workflow, bulk actions
- **Patient Search \& Detail View:** Filter by risk level, medical condition, visit history; see detailed timelines and interventions
- **Model Performance:** View AUROC, AUPRC, calibration metrics, and confusion matrix
- **User Roles:** Doctor, Nurse, Admin—access tailored to clinical roles
- **Mobile Responsive \& Accessibility:** Usable on tablets/phones; supports high-contrast and screen readers
- **HIPAA Compliance Notice:** Security indicators and audit tracking


## Limitations and Real-World Solutions

- **Alert Fatigue:** Implements smart prioritization and customizable thresholds
- **Data Privacy:** Shows encryption status and logs user actions for compliance
- **Network Reliability:** Supports offline mode with auto-sync on reconnection
- **Scalability:** Load balancing status, optimized for high patient volumes
- **Integration:** API structure ready for EMR/HL7 FHIR integration


## Getting Started

### 1. Prerequisites

- Modern browser (Chrome, Edge, Firefox)
- Local or cloud web server (optional for development)
- For backend integration (optional): Python 3.8+, Node.js, or compatible stack


### 2. Installation

Clone/download the repository or the dashboard package.

```bash
# Unzip the dashboard files
unzip chronic-care-risk-dashboard.zip
cd chronic-care-risk-dashboard

# For local web hosting
python -m http.server 8000
# Or
npx http-server -p 8000

# Access the dashboard at https://predictmyhealth.netlify.app/
```


### 3. File Structure

- `index.html` — Main dashboard interface
- `style.css` — Styling for dashboard elements
- `app.js` — Client-side logic and data rendering


### 4. Sample Data

Included sample patients with varying risk levels, complete with vitals, risk factors, and clinical intervention timelines for demonstration purposes.

### 5. Usage

- Log in and view key metrics on the main dashboard
- Search and filter patients; click for detailed risk and clinical insight panels
- Review alerts, acknowledge or escalate as necessary
- Explore analytics and download reports
- Customize interface and accessibility settings per user preference


## Advanced Configuration

For backend EMR integration, authentication, and live clinical deployment, reference your hospital IT or API documentation for setup.
See example API endpoints in `app.js` comments for connecting predictions and alerts to your own system.

## Support \& Contribution

For questions, feature requests, or contributions, please contact the development team or submit issues via your project tracker.

***

## License

Intended for educational, hackathon, and clinical prototype purposes. For commercial or production deployment, ensure compliance with local healthcare data regulations and security standards.
