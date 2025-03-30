import pandas as pd
import re

def drop_columns(df):
    to_drop = ["Malware Indicators", "Alerts/Warnings", "Firewall Logs", "IDS/IPS Alerts",
               "Timestamp", "Source Port", "Destination Port", "Payload Data",
               "User Information", "Proxy Information"]
    df = df.drop(columns=to_drop, errors='ignore')
    return df

def clean_columns(df):
    # Extract and sanitize first octets
    df["Source IP FirstOctet"] = pd.to_numeric(
        df["Source IP Address"].str.split('.').str[0], errors='coerce')
    df["Destination IP FirstOctet"] = pd.to_numeric(
        df["Destination IP Address"].str.split('.').str[0], errors='coerce')

    # Fill missing values
    df["Source IP FirstOctet"] = df["Source IP FirstOctet"].fillna(0)
    df["Destination IP FirstOctet"] = df["Destination IP FirstOctet"].fillna(0)

    df = df.drop(columns=["Source IP Address", "Destination IP Address"], errors='ignore')

    # Location and device info parsing
    df[["City", "Region"]] = df["Geo-location Data"].str.split(', ', expand=True)
    df["Browser"] = df["Device Information"].str.split('/').str[0]

    mobile_os = ["Android", "iOS", "HarmonyOS", "Windows Phone", "KaiOS", "Tizen", 
                 "Ubuntu Touch", "Plasma Mobile"]
    desktop_os = ["Windows", "Mac OS", "Linux", "Chrome OS", "BSD", "Ubuntu", 
                  "Elementary OS", "Fedora", "Zorin OS", "Deepin", "macOS Server", "Haiku OS"]
    all_os = mobile_os + desktop_os
    os_regex = '|'.join(map(re.escape, all_os))
    df["Operating System"] = df["Device Information"].str.extract(f'({os_regex})', flags=re.IGNORECASE)

    df = df.drop(columns=["Geo-location Data", "Device Information"], errors='ignore')

    # Ensure numeric for binning
    df["Anomaly Scores"] = pd.to_numeric(df["Anomaly Scores"], errors="coerce")
    df["Packet Length"] = pd.to_numeric(df["Packet Length"], errors="coerce")

    # Safe binning
    bins = [0, 25, 50, 80, 100]
    bin_labels = ["25-0", "50-25", "80-50", "100-80"]
    if df["Anomaly Scores"].nunique() >= 2:
        df["Anomaly Score Category"] = pd.cut(df["Anomaly Scores"], bins=bins, labels=bin_labels, right=True)
    else:
        df["Anomaly Score Category"] = "100-80"
    df.loc[df["Anomaly Score Category"].isna(), "Anomaly Score Category"] = "100-80"

    percentiles = [0, 0.2, 0.5, 0.8, 1.0]
    qcut_labels = ["short", "little short", "little long", "long"]
    if df["Packet Length"].nunique() >= 4:
        df["Packet Length Category"] = pd.qcut(df["Packet Length"], q=percentiles, labels=qcut_labels, duplicates='drop')
    else:
        df["Packet Length Category"] = "long"

    df = df.drop(columns=["Anomaly Scores", "Packet Length"], errors='ignore')

    #Reorder columns to the exact sequence for the model :
    desired_columns = ['Protocol', 'Packet Type', 'Traffic Type', 'Attack Signature',
       'Action Taken', 'Network Segment', 'Log Source', 'City', 'Region',
       'Browser', 'Operating System', 'Severity Level',
       'Anomaly Score Category', 'Packet Length Category',
       'Source IP FirstOctet', 'Destination IP FirstOctet']
    df = df.reindex(columns=desired_columns)

    return df

def preprocess_pipeline(df):
    df = drop_columns(df)
    df = clean_columns(df)

    return df





# def encode_columns(df):
#     ordinal_cols = [
#   "Severity Level", "Anomaly Score Category", "Packet Length Category",
#   "City", "Region", "Browser", "Operating System",
#   "Protocol", "Packet Type", "Traffic Type",
#   "Attack Signature", "Action Taken", "Network Segment", "Log Source"
#     ]

#     numeric_cols = ["Source IP FirstOctet", "Destination IP FirstOctet"]

#     # Ensure numeric columns are float
#     for col in numeric_cols:
#         df[col] = pd.to_numeric(df[col], errors='coerce')

#     transformer = ColumnTransformer(
#         transformers=[
#             ('num', StandardScaler(), numeric_cols),
#             ('ord', OrdinalEncoder(), ordinal_cols)
#         ],
#         remainder='drop'
#     )

#     X_transformed = transformer.fit_transform(df)
#     feature_names = numeric_cols + ordinal_cols
#     df_encoded = pd.DataFrame(X_transformed, columns=feature_names)
#     return df_encoded

#with out  encoding because it 's already included in the pipeline

# def preprocess_pipeline(df):
#     df = drop_columns(df)
#     df = clean_columns(df)
#     df = encode_columns(df)
#     return df

# testing function:
    