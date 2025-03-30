// import le fichier geolocation_constants.js
import { GEOLOCATION_OPTIONS } from './geolocation_constants';

// Ne pas redéclarer GEOLOCATION_OPTIONS ici, déjà importé
export const FORM_INITIAL_STATE = {
  sourceIP: '',
  destIP: '',
  sourcePort: '',
  destPort: '',
  protocol: 'TCP',
  packetLength: '',
  packetType: 'Data',
  trafficType: 'HTTP',
  anomalyScore: 0,
  severity: 'High',
  deviceInfo: 'Windows/Chrome',
  geoLocation: 'Paris, Île-de-France',
  attackSignature: 'Known Pattern A',
  actionTaken: 'Logged',
  networkSegment: 'Segment A',
  logSource: 'Server',
  attackType: 'Malware',
};

//  Pas besoin de redéclarer GEOLOCATION_OPTIONS ici
export const PROTOCOL_OPTIONS = ['TCP', 'UDP', 'ICMP'];
export const PACKET_TYPE_OPTIONS = ['Data', 'Control'];
export const TRAFFIC_TYPE_OPTIONS = ['HTTP', 'DNS', 'FTP'];
export const MALWARE_OPTIONS = ['IoC Detected', 'IoC Not Detected'];
export const ALERT_OPTIONS = ['Alert Triggered', 'Alert Not Triggered'];
export const SIGNATURE_OPTIONS = ['Known Pattern A', 'Known Pattern B'];
export const ACTION_OPTIONS = ['Logged', 'Blocked', 'Ignored'];
export const SEVERITY_OPTIONS = ['Low', 'Medium', 'High'];
export const SEGMENT_OPTIONS = ['Segment A', 'Segment B', 'Segment C'];
export const FIREWALL_OPTIONS = ['Log Data', 'No Logs'];
export const IDS_OPTIONS = ['Alert Data', 'No Alerts'];
export const LOG_SOURCE_OPTIONS = ['Server', 'Firewall'];
