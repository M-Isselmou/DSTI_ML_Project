import React from 'react';
import PropTypes from 'prop-types';
import { Col, Form } from 'react-bootstrap';
import FormGroup from '../FormGroup';
import { FIREWALL_OPTIONS } from '../../../utils/constants';
import GeoLocationSelect from '../GeoLocationSelect';

const AdditionalInfoSection = ({ formData, handleChange }) => (
  <>
    <h5 className="mt-4">Additional Information</h5>

    <FormGroup 
      label="User Information" 
      name="userInfo" 
      type="text" 
      md={6} 
      value={formData.userInfo} 
      onChange={handleChange} 
    />

    <FormGroup 
      label="Device Information" 
      name="deviceInfo" 
      type="text" 
      md={6} 
      value={formData.deviceInfo} 
      onChange={handleChange} 
      required 
    />

    <FormGroup 
      label="Proxy Information" 
      name="proxyInfo" 
      type="text" 
      md={4} 
      value={formData.proxyInfo} 
      onChange={handleChange} 
    />

    <FormGroup 
      label="Firewall Logs" 
      name="firewallLogs" 
      type="select" 
      md={4}
      value={formData.firewallLogs} 
      onChange={handleChange}
      options={FIREWALL_OPTIONS} 
    />
    
    <Col md={12}>
      <Form.Group>
        <Form.Label>Payload Data</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="payload"
          value={formData.payload}
          onChange={handleChange}
        />
      </Form.Group>
    </Col>
    <GeoLocationSelect 
      value={formData.geoLocation} 
      onChange={handleChange} 
    />
  </>
);

AdditionalInfoSection.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default AdditionalInfoSection;
