import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '../FormGroup';

const PacketDetailsSection = ({ formData, handleChange }) => (
  <>
    <h5 className="mt-4">Packet Details</h5>

    <FormGroup 
      label="Packet Type" 
      name="packetType" 
      type="select" 
      md={6}
      value={formData.packetType} 
      onChange={handleChange} 
      options={['Data', 'Control']}
      required 
    />
    <FormGroup 
          label="Packet Length" 
          name="packetLength" 
          type="text" 
          md={6}
          value={formData.packetLength} 
          onChange={handleChange} 
          required 
        />
  </>
);

PacketDetailsSection.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default PacketDetailsSection;
