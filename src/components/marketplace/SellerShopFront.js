// SellerShopFront.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { getUserProfile } from "../../actions/userProfileActions";

import SellerActiveFreeAdScreen from "./SellerActiveFreeAdScreen";
import SellerActivePaidAdScreen from "./SellerActivePaidAdScreen";
import GetSellerDetail from "./GetSellerDetail";

function SellerShopFront() {
  const dispatch = useDispatch();

  const { seller_username } = useParams();
  console.log("seller_username:", seller_username);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    } else {
      dispatch(getUserProfile());
    }
  }, [dispatch, userInfo]);

  return (
    <div>
      <Row>
        <Col>
          <hr />
          <h1 className="text-center py-3">
            <i className="fas fa-shopping-cart"></i> Seller Shop Front
          </h1>
          <hr />

          <div>
            <GetSellerDetail seller_username={seller_username} />
          </div>

          <div>
            <SellerActiveFreeAdScreen seller_username={seller_username} />
          </div>

          <div>
            <SellerActivePaidAdScreen seller_username={seller_username} />
          </div>
        
          <hr />
        </Col>
      </Row>
    </div>
  );
}

export default SellerShopFront;
