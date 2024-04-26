// ViewedAds.js
import React, { useEffect } from  "react";
import {
  // useDispatch,
  useSelector,
} from "react-redux";
import { Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ViewedFreeAds from "../marketplace/ViewedFreeAds";
import ViewedPaidAds from "../marketplace/ViewedPaidAds";

function ViewedAds() {
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  return (
    <div>
      <Row>
        <Col>
          <h1 className="text-center py-3">Viewed Ads</h1>
          <ViewedFreeAds />
          <ViewedPaidAds />
        </Col>
      </Row>
    </div>
  );
}

export default ViewedAds;
