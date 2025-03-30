import React from 'react';
import PropTypes from 'prop-types';

const StatItem = ({ title, value }) => (
  <div className="stat-item mb-3 p-2 border-bottom">
    <h6 className="text-muted">{title}</h6>
    <h3 className="text-primary">{value}</h3>
  </div>
);

StatItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default StatItem;