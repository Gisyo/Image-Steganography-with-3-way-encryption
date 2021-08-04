import React from 'react';
import {Row, Col} from 'reactstrap';
import Overview from '../../components/dashboard-components/Algorithms/Overview';

const Starter = () => {
  return (
    <div>
      <Row>
        <Col sm={12}>
          <Overview />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
