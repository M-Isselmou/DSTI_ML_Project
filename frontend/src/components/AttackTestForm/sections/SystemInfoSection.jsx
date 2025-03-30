import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '../FormGroup';

import { 
  IDS_OPTIONS, 
  LOG_SOURCE_OPTIONS, 
} from '../../../utils/constants';

const SystemInfoSection = ({ formData, handleChange }) => (
  <>
    <h5 className="mt-4">System Information</h5>
    
    <FormGroup 
      label="IDS/IPS Alerts" 
      name="idsAlerts" 
      type="select" 
      md={6}
      value={formData.idsAlerts} 
      onChange={handleChange}
      options={IDS_OPTIONS} 
    />
    
    <FormGroup 
      label="Log Source" 
      name="logSource" 
      type="select" 
      md={6}
      value={formData.logSource} 
      onChange={handleChange}
      options={LOG_SOURCE_OPTIONS}
      required 
    />

    {/* Geo-location is required */}

  </>
);

SystemInfoSection.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default SystemInfoSection;
