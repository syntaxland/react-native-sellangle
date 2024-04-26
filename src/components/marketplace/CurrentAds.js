// CurrentAds.js
import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import FreeAdScreen from "./FreeAdScreen";
import PaidAdScreen from "./PaidAdScreen";
 
function CurrentAds({ history }) {
  return (
    <Container>
      <Row>
        <Col>
          <div>
            <FreeAdScreen />
          </div>

          <div>
            <PaidAdScreen />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CurrentAds;
