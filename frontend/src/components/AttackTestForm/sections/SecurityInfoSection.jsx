import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '../FormGroup';

const SecurityInfoSection = ({ formData, handleChange }) => (
  <>
    <h5 className="mt-4">Security Info</h5>

    <FormGroup 
      label="Traffic Type" 
      name="trafficType" 
      type="select" 
      md={4}
      value={formData.trafficType} 
      onChange={handleChange} 
      options={['HTTP', 'DNS', 'FTP']}
      required 
    />

    <FormGroup 
      label="Anomaly Score" 
      name="anomalyScore" 
      type="text" 
      md={4}
      value={formData.anomalyScore} 
      onChange={handleChange} 
      required 
    />

    <FormGroup 
      label="Severity Level" 
      name="severity" 
      type="select" 
      md={4}
      value={formData.severity} 
      onChange={handleChange} 
      options={['Low', 'Medium', 'High']}
      required 
    />
  </>
);

SecurityInfoSection.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default SecurityInfoSection;
