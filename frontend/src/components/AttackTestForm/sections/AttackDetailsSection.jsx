import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '../FormGroup';

const AttackDetailsSection = ({ formData, handleChange }) => (
  <>
    <h5 className="mt-4">Attack Details</h5>

    
    <FormGroup 
      label="Attack Signature" 
      name="attackSignature" 
      type="select" 
      md={6}
      value={formData.attackSignature} 
      onChange={handleChange} 
      options={['Known Pattern A', 'Known Pattern B']}
      required 
    />

    <FormGroup 
      label="Action Taken" 
      name="actionTaken" 
      type="select" 
      md={6}
      value={formData.actionTaken} 
      onChange={handleChange} 
      options={['Logged', 'Blocked', 'Ignored']}
      required 
    />

    
  </>
);

AttackDetailsSection.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default AttackDetailsSection;
