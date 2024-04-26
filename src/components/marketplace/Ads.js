// Ads.js
import React from "react";
import { Row, Col } from "react-bootstrap";
import AccountFundCredits from "../FundAccount/AccountFundCredits";
import AccountFundDebits from "../FundAccount/AccountFundDebits";

function Ads() {

  return (
    <div>
      <Row>
        <Col>
        
          <div>
            <AccountFundCredits />
          </div>

          <div className="text-center">
            <AccountFundDebits />
          </div>

          <hr />
        </Col>
      </Row>
    </div>
  );
}

export default Ads;
