// SavedAds.js
import React, { useEffect } from  "react";
import {
  // useDispatch,
  useSelector,
} from "react-redux";
import { useHistory } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import SavedFreeAds from "../marketplace/SavedFreeAds";
import SavedPaidAds from "../marketplace/SavedPaidAds";

function SavedAds() {
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
          <h1 className="text-center py-3">Saved Ads</h1>
          <SavedFreeAds />
          <SavedPaidAds />
        </Col>
      </Row>
    </div>
  );
}

export default SavedAds;
