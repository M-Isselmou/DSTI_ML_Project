import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { GEOLOCATION_OPTIONS } from '../../utils/geolocation_constants';

const GeoLocationSelect = ({ value, onChange }) => {
  const options = GEOLOCATION_OPTIONS.map(loc => ({
    value: loc,
    label: loc
  }));

  const handleChange = selectedOption => {
    onChange({
      target: {
        name: 'geoLocation',
        value: selectedOption ? selectedOption.value : ''
      }
    });
  };

  return (
    <div className="mb-3">
      <label className="form-label text-light">Geo-location Data</label>
      <Select
  options={options}
  value={options.find(opt => opt.value === value)}
  onChange={handleChange}
  isClearable
  placeholder="Select a location..."
  filterOption={(candidate, input) =>
    candidate.label.toLowerCase().includes(input.toLowerCase())
  }
/>

    </div>
  );
};

GeoLocationSelect.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default GeoLocationSelect;
