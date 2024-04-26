// CreditPoint.js
import React, { useEffect } from "react";
import {
  // useDispatch,
  useSelector,
} from "react-redux";
import { Row, Col } from "react-bootstrap";
import GetBuyCreditPoint from "../CreditPoint/GetBuyCreditPoint";
import GetUsdBuyCreditPoint from "../CreditPoint/GetUsdBuyCreditPoint";
import GetSellCreditPoint from "../CreditPoint/GetSellCreditPoint";
import GetBuyerCreditPoint from "../CreditPoint/GetBuyerCreditPoint";
import GetAdCpsCharges from "../CreditPoint/GetAdCpsCharges";
import GetUserCpsBonuses from "../CreditPoint/GetUserCpsBonuses";

const CreditPoint = () => {
  // const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  return (
    <>
      <Row>
        <div className="d-flex justify-content-center">
          <Col>
          <div>
              <GetUserCpsBonuses />
            </div>
            
            <div>
              <GetAdCpsCharges />
            </div>

            <div>
              <GetUsdBuyCreditPoint />
            </div>

            <div>
              <GetBuyCreditPoint />
            </div>

            <div>
              <GetSellCreditPoint />
            </div>

            <div>
              <GetBuyerCreditPoint />
            </div>

            <hr />
          </Col>
        </div>
      </Row>
    </>
  );
};

export default CreditPoint;
