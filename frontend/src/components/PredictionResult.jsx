import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const PredictionResult = ({ prediction }) => {
  return (
    <Card className="mt-4 shadow-sm border-success">
      <Card.Header className="bg-success text-white">
        <strong>Model Prediction</strong>
      </Card.Header>
      <Card.Body>
        <h4 className="text-success text-center">🔒 {prediction}</h4>
        <p className="text-center">This is the predicted type of cybersecurity attack.</p>
      </Card.Body>
    </Card>
  );
};

PredictionResult.propTypes = {
  prediction: PropTypes.string.isRequired
};

export default PredictionResult;
