import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AboutDataWidget from './components/AboutDataWidget';
import AttackTestForm from './components/AttackTestForm';
import PredictionResult from './components/PredictionResult';
import { FORM_INITIAL_STATE } from './utils/constants';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState(FORM_INITIAL_STATE);
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('🚀 Sending raw form data to backend:', formData);

      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData), // Send raw formData
      });

      const result = await response.json();

      if (result.prediction) {
        setPrediction(result.prediction);
      } else {
        alert('⚠️ Error: ' + result.error);
      }
    } catch (error) {
      console.error('❌ Prediction error:', error);
      alert('Failed to connect to backend.');
    }
  };

  return (
    <Container fluid className="p-4">
      <Row className="mb-5">
        <Col className="text-center">
          <h1 className="page-title mb-3">CyberAttack Detection System</h1>
          <p className="subtitle">
            Advanced Threat Analysis & Network Security Platform
          </p>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={4}>
          <AboutDataWidget />
        </Col>
        <Col md={8}>
          <AttackTestForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          {prediction && <PredictionResult prediction={prediction} />}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
