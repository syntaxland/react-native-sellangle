// AdChargeCalculator.js
import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { formatAmount } from "../FormatAmount";
import { formatUserInput } from "../formatUserInput"; 

function AdChargeCalculator() {
  const [numberOfAds, setNumberOfAds] = useState(1);
  const [numberOfHours, setNumberOfHours] = useState(1);

  const totalCPS = (numberOfAds * numberOfHours * 1.2).toFixed(2);

  return (
    <div className="d-flex justify-content-center py-2 mt-4">
      <Row>
        <Col>
          <h3 className="text-center py-2">Ad Charge Calculator</h3>
          <p className="text-center">1.2 cps per hour (promoted ad)</p>

          <Form>
            <Form.Group controlId="numberOfAds">
              <Form.Label>Enter Number of Ads</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of ads"
                value={numberOfAds}
                // onChange={(e) => setNumberOfAds(e.target.value)}
                onChange={(e) => setNumberOfAds(formatUserInput(e.target.value))}
              />
            </Form.Group>

            <Form.Group controlId="numberOfHours">
              <Form.Label>Enter Hours</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of hours"
                value={numberOfHours}
                // onChange={(e) => setNumberOfHours(e.target.value)}
                onChange={(e) => setNumberOfHours(formatUserInput(e.target.value))}
              />
            </Form.Group>
          </Form>
          <div className="d-flex justify-content-center py-2 text-center">
            <Button
              variant="outline-transparent"
            //   size="sm"
              className="rounded w-100"
              disabled
            >
              <strong>Total CPS: {formatAmount(totalCPS)}</strong> 
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default AdChargeCalculator;
