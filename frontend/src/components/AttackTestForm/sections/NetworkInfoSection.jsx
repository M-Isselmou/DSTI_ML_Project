import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '../FormGroup';

const NetworkInfoSection = ({ formData, handleChange }) => (
  <>
    <h5 className="mt-4">Network Information</h5>

    <FormGroup 
      label="Protocol" 
      name="protocol" 
      type="select" 
      md={6}
      value={formData.protocol} 
      onChange={handleChange} 
      options={['TCP', 'UDP', 'ICMP']}
      required 
    />

    <FormGroup 
      label="Source IP" 
      name="sourceIP" 
      type="text" 
      md={6}
      value={formData.sourceIP} 
      onChange={handleChange} 
      required 
    />

    <FormGroup 
      label="Destination IP" 
      name="destIP" 
      type="text" 
      md={6}
      value={formData.destIP} 
      onChange={handleChange} 
      required 
    />
<FormGroup 
      label="Network Segment" 
      name="networkSegment" 
      type="select" 
      md={6}
      value={formData.networkSegment} 
      onChange={handleChange} 
      options={['Segment A', 'Segment B', 'Segment C']}
      required 
    />
    
  </>
);

NetworkInfoSection.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default NetworkInfoSection;
