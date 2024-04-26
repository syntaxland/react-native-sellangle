// Inbox.js
import React, { useEffect } from "react";
import {
  // useDispatch,
  useSelector,
} from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import MessageInbox from "./MessageInbox";
import GetActiveBuyerFreeAdMsg from "./GetActiveBuyerFreeAdMsg";
import GetActiveBuyerPaidAdMsg from "./GetActiveBuyerPaidAdMsg";
import GetSellerFreeAdMsgInbox from "./GetSellerFreeAdMsgInbox";
import GetSellerPaidAdMsgInbox from "./GetSellerPaidAdMsgInbox";

const Inbox = () => {
  // const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo, history]);

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="text-center py-3">
            <i className="fa fa-message"></i> Inbox
          </h2>

          <div>
            <GetActiveBuyerFreeAdMsg />
          </div>

          <div>
            <GetActiveBuyerPaidAdMsg />
          </div>

          <div>
            <GetSellerFreeAdMsgInbox />
          </div>

          <div>
            <GetSellerPaidAdMsgInbox />
          </div>

          <div>
            <MessageInbox />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Inbox;
