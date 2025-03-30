import React from 'react';
import { Card } from 'react-bootstrap';
import StatItem from './StatItem';

const AboutDataWidget = () => (
  <Card className="glass-card">
    <Card.Header className="bg-transparent border-bottom border-secondary">
      <h5 className="text-uppercase mb-0" style={{ color: '#00fff5' }}>
        Security Dashboard
      </h5>
    </Card.Header>
    <Card.Body>
      <div className="stats-grid">
        <StatItem title="Total Threats" value="40K" />
        <StatItem title="High Severity" value="13382" />
        <StatItem title="Blocked" value="13529" />
      </div>
    </Card.Body>
  </Card>
);

export default AboutDataWidget;