import React from 'react';
import PropTypes from 'prop-types';
import { Col, Form } from 'react-bootstrap';

const FormGroup = ({ label, name, type, md, value, onChange, options, required }) => (
  <Col md={md}>
    <Form.Group className="mb-3 position-relative">
      <Form.Label className="text-light">
        {label}
        {required && <span className="text-danger ms-1">*</span>}
      </Form.Label>

      {type === 'select' ? (
        <Form.Select 
          name={name} 
          value={value} 
          onChange={onChange}
          className="border-secondary"
        >
          <option value="" disabled className="bg-dark text-light">Select {label}</option>
          {options.map((option) => (
            <option key={option} value={option} className="bg-dark text-light">
              {option}
            </option>
          ))}
        </Form.Select>
      ) : (
        <Form.Control
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="border-secondary"
        />
      )}
    </Form.Group>
  </Col>
);

FormGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  md: PropTypes.number.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  required: PropTypes.bool
};

FormGroup.defaultProps = {
  required: false
};

export default FormGroup;
