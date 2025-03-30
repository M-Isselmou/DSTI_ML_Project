Cybersecurity Attack Type Detection
Project Overview:

This project aims to chalenge the cybersecurity attacks dataset by classifying attacks into three categories: Malware, DDoS, and Intrusion. 
Using a dataset containing 40,000 records of network traffic, we developed and evaluated machine learning models to predict attack types based on features such as IP addresses, ports, protocols, packet details, and severity levels.
The project includes exploratory data analysis (EDA), feature engineering, model training, evaluation, and deployment of a web application for real-time predictions.
 
Dataset
The dataset consists of 25 attributes:
•	Key Features: Attack Type, Protocol, Source/Destination IPs & Ports, Packet Length, Severity Level.
•	Size: 40,000 rows of raw data.
 
Key Graphs
1. Attack Type Distribution
Attack Types Associated with 'Alert Triggered'
Description: This bar chart shows the frequency of Malware, DDoS, and Intrusion attacks triggering alerts. Each type has approximately 6,000 to 7,000 occurrences.
1. Attack Type Distribution in Log Data
Attack Types Associated with 'Log Data'
Description: Similar distribution is observed in log data for Malware, DDoS, and Intrusion attacks.
1. Top Source IP Prefixes for Malware
Top Source IP Prefixes for Malware
Description: The bar chart highlights the top 10 most frequent source IP prefixes associated with Malware attacks. The prefix "201" is the most common.
 
Machine Learning Pipeline
Steps
1.	Exploratory Data Analysis (EDA):
o	Visualized attack type distributions.
o	Analyzed protocol usage and geographical origins.
2.	Feature Engineering:
o	Encoded IP addresses and protocols.
o	Extracted time-based features from timestamps.
o	Categorized anomaly scores into risk levels.
o   Divided features into three types: numerical, nominal, and ordinal, and encoded them accordingly.
3.	Model Training & Evaluation:
o	Models used: Random Forest, Logistic Regression, Neural Network.
o	Metrics: Accuracy, Precision, Recall, F1-score.
4.	Deployment:
o	A Flask-based web application was developed for real-time predictions.
 
Results
Model Performance Comparison on test:
•	Logistic Regression:
o	Accuracy: 33.38%
•   Xgboost Classifier:
o   Accuracy: 34%
o	Balanced performance across all attack types.
•	Neural Network:
o	Accuracy: 33.04%.

Feature Importance:
Key predictors include anomaly scores and packet lengths.
 
Web Application
The project includes a web application built using Flask:
•	Accepts user inputs (e.g., IP addresses, ports).
•	Predicts attack types in real-time.
•	Displays results in a user-friendly interface.
 
Conclusion
Both models achieved similar accuracy on test (~33% even the train values can be high is some cases (overfitting) ), highlighting the complexity of the problem due to the synthetic dataset where generated network traffic data can exhibit overlapping or very similar feature distributions across different attack types and it confirms the static analysis during data exploring.

Future Improvements:
- Reduce noise by removing or abstracting high-cardinality features.
- Perform targeted feature selection.
- Conduct extensive hyperparameter tuning.
- Integrate real-world network data to improve generalization.
- Explore deep learning architectures such as CNNs and LSTMs.
 
Installation
1.	Clone the repository:
git clone https:https://github.com/M-Isselmou/DSTI_ML_Project

2.	Install docker (to run the application)

3.	Build docker images
docker compose -f compose.yml build

4.	Run the docker containers:
docker compose -f compose.yml up

5.	For model analysis and the machines learing NotesBooks:
•Create virtual envirements:
python -m venv .venv
•install requiremnts:
pip install -r requirements.txt
 
Contact
For questions or collaboration opportunities:
•	Isselmou Maouloud
•	Othmane Khettar
•	Yassine Fendi
•	Charles Effah
