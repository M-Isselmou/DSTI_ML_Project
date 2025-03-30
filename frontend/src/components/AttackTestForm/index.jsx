import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Button, Row, Alert } from 'react-bootstrap';
import NetworkInfoSection from './sections/NetworkInfoSection';
import PacketDetailsSection from './sections/PacketDetailsSection';
import SecurityInfoSection from './sections/SecurityInfoSection';
import AttackDetailsSection from './sections/AttackDetailsSection';
import AdditionalInfoSection from './sections/AdditionalInfoSection';
import SystemInfoSection from './sections/SystemInfoSection';

const REQUIRED_FIELDS = [
  'protocol',
  'packetType',
  'trafficType',
  'attackType',
  'attackSignature',
  'actionTaken',
  'severity',
  'networkSegment',
  'logSource',
  'sourceIP',
  'destIP',
  'geoLocation',
  'deviceInfo',
  'anomalyScore',
  'packetLength',
];

const FIELD_LABELS = {
  protocol: 'Protocol',
  packetType: 'Packet Type',
  trafficType: 'Traffic Type',
  attackType: 'Attack Type',
  attackSignature: 'Attack Signature',
  actionTaken: 'Action Taken',
  severity: 'Severity Level',
  networkSegment: 'Network Segment',
  logSource: 'Log Source',
  sourceIP: 'Source IP',
  destIP: 'Destination IP',
  geoLocation: 'Geo-location Data',
  deviceInfo: 'Device Information',
  anomalyScore: 'Anomaly Score',
  packetLength: 'Packet Length',
};

const AttackTestForm = ({ formData, handleChange, handleSubmit }) => {
  const [error, setError] = useState('');

  const validateForm = () => {
    for (const field of REQUIRED_FIELDS) {
      const value = formData[field];
      if (value === undefined || value === null || value.toString().trim() === '') {
        return `Please fill the required field: ${FIELD_LABELS[field] || field}`;
      }
    }
    return '';
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
    } else {
      setError('');
      handleSubmit(e);
    }
  };

  return (
    <Card className="glass-card">
      <Card.Header className="bg-transparent border-bottom border-secondary">
        <h5 className="text-uppercase mb-0" style={{ color: '#ff2d55' }}>
          Threat Analysis Console
        </h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleFormSubmit}>
          <Row className="g-3">
            <NetworkInfoSection formData={formData} handleChange={handleChange} />
            <PacketDetailsSection formData={formData} handleChange={handleChange} />
            <SecurityInfoSection formData={formData} handleChange={handleChange} />
            <AttackDetailsSection formData={formData} handleChange={handleChange} />
            <AdditionalInfoSection formData={formData} handleChange={handleChange} />
            <SystemInfoSection formData={formData} handleChange={handleChange} />

            {error && (
              <Alert variant="danger" className="mt-3 w-100 text-center">
                {error}
              </Alert>
            )}

            <div className="text-center mt-4">
              <Button 
                variant="primary" 
                type="submit" 
                className="btn-custom"
                size="lg"
              >
                Analyze Attack Pattern
              </Button>
            </div>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

AttackTestForm.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default AttackTestForm;
