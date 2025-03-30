# %%
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import re
from sklearn.preprocessing import StandardScaler, OrdinalEncoder, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

cyberdata=pd.read_csv("cybersecurity_attacks.csv")

def drop_col(cyberdata):
    cyberdata_drop=cyberdata
    drop_cols = cyberdata_drop[["Malware Indicators", "Alerts/Warnings", "Firewall Logs", "IDS/IPS Alerts","Timestamp","Source Port",	"Destination Port",
                                "Payload Data","User Information","Proxy Information"]]
    cyberdata_drop = cyberdata_drop.drop(columns=drop_cols)
    return cyberdata_drop

def clear_col(cyberdata):
    cyberdata["Source IP FirstOctet"] = cyberdata["Source IP Address"].str.split('.').str[0]
    cyberdata["Destination IP FirstOctet"] = cyberdata["Destination IP Address"].str.split('.').str[0]
    cyberdata = cyberdata.drop(columns=["Source IP Address", "Destination IP Address"])
    cyberdata[["City", "Region"]] = cyberdata["Geo-location Data"].str.split(', ', expand=True)
    cyberdata["Browser"] = cyberdata["Device Information"].str.split('/').str[0]
    mobile_os = ["Android", "iOS", "HarmonyOS", "Windows Phone", "KaiOS", "Tizen", "Ubuntu Touch", "Plasma Mobile"]
    desktop_os = ["Windows", "Mac OS", "Linux", "Chrome OS", "BSD", "Ubuntu", "Elementary OS", "Fedora", "Zorin OS", "Deepin", "macOS Server", "Haiku OS"]
    all_os = mobile_os + desktop_os
    os_regex = '|'.join(map(re.escape, all_os))  
    cyberdata["Operating System"] = cyberdata["Device Information"].str.extract(f'({os_regex})', flags=re.IGNORECASE)
    cyberdata = cyberdata.drop(columns=["Geo-location Data", "Device Information"])
    bins = [0, 25, 50, 80, 100]
    labels = ["25-0", "50-25", "80-50", "100-80"]
    cyberdata["Anomaly Score Category"] = pd.cut(
        cyberdata["Anomaly Scores"],
        bins=bins,
        labels=labels,
        right=False 
    )
    percentiles = [0, 0.2, 0.5, 0.8, 1.0] 
    labels = ["short", "little short", "little long", "long"]
    cyberdata.loc[17975, "Anomaly Score Category"] = "100-80"
    
    cyberdata["Packet Length Category"] = pd.qcut(
        cyberdata["Packet Length"],
        q=percentiles,
        labels=labels
    )
    cyberdata = cyberdata.drop(columns=["Anomaly Scores", "Packet Length"])
    
    return cyberdata

def encode_col(cyberdata):
    ordinal_cols = ["Severity Level", "Anomaly Score Category", "Packet Length Category","City", "Region", 
        "Browser", "Operating System",
        "Protocol", "Packet Type", "Traffic Type", "Attack Type", "Attack Signature",
        "Action Taken", "Network Segment", "Log Source"
    ]
    numerical_cols = ["Source IP FirstOctet",	"Destination IP FirstOctet"]
    
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numerical_cols),
            ('ord', OrdinalEncoder(), ordinal_cols),
        ],
        remainder='passthrough'
    )
    transformed_data = preprocessor.fit_transform(cyberdata)
    feature_names = []
    for name, transformer, cols in preprocessor.transformers_:
        if name == 'num':
            feature_names.extend(cols) 
        elif name == 'ord':
            feature_names.extend(cols) 
        else:
            feature_names.extend(cols)

    transformed_df = pd.DataFrame(transformed_data, columns=feature_names)
    return transformed_df



def run_logistic_regression(cyberdata):
    if "Attack Type" not in cyberdata.columns:
        return pd.DataFrame({"Error": ["'Attack Type' column does not exist"]})

    features = cyberdata.select_dtypes(include=['number']).drop(columns=["Attack Type"], errors='ignore')
    target = cyberdata["Attack Type"]

    X_train, X_test, y_train, y_test = train_test_split(
        features, target, 
        test_size=0.2, 
        random_state=42, 
        stratify=target
    )

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    model = LogisticRegression(max_iter=1000)
    model.fit(X_train_scaled, y_train)

    y_pred = model.predict(X_test_scaled)
    accuracy = accuracy_score(y_test, y_pred)
    classification_rep = classification_report(y_test, y_pred, output_dict=True)
    accuracy_df = pd.DataFrame({"Metric": ["Accuracy"], "Value": [accuracy]})
    report_df = pd.DataFrame(classification_rep).transpose()
    
    return accuracy_df, report_df




