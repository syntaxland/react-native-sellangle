// GetActiveBuyerPaidAdMsg.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ListGroup, Button, Container, Row, Col, Card } from "react-bootstrap";

import { getUserProfile } from "../../actions/userProfileActions";
import {
  GetActiveBuyerPaidAdMessages,
  clearBuyerPaidAdMessageCounter,
} from "../../actions/marketplaceSellerActions";
import Message from "../Message";
import Loader from "../Loader";
import DOMPurify from "dompurify";
import Pagination from "../Pagination";

const GetActiveBuyerPaidAdMsg = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const GetActiveBuyerPaidAdMessageState = useSelector(
    (state) => state.GetActiveBuyerPaidAdMessageState
  );
  const {
    loading,
    activeBuyerPaidAdMessages,
    loadingError,
  } = GetActiveBuyerPaidAdMessageState;
  console.log("activeBuyerPaidAdMessages:", activeBuyerPaidAdMessages);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = activeBuyerPaidAdMessages?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(GetActiveBuyerPaidAdMessages());
  }, [dispatch]);

  const [expandedMessages, setExpandedMessages] = useState([]);

  const expandMessage = (messageId) => {
    setExpandedMessages((prevExpanded) => [...prevExpanded, messageId]);
  };

  const handleReplyBuyer = (message) => {
    const queryParams = {
      id: message?.paid_ad_id,
      paid_ad_message_id: message?.paid_ad_message_id,
      image1: message?.paid_ad_image1,
      ad_name: message?.paid_ad_name,
      price: message?.paid_ad_price,
      currency: message?.paid_ad_currency,
      sellerAvatarUrl: message?.sellerAvatarUrl,
      seller_username: message?.paid_ad_seller_username,
      expiration_date: message?.paid_ad_expiration_date,
      ad_rating: message?.paid_ad_rating,
    };

    history.push({
      pathname: `/buyer/paid/ad/message/${message.id}`,
      search: `?${new URLSearchParams(queryParams).toString()}`,
    });
  };

  const clearMsgCounter = (msgId) => {
    const counterData = {
      paid_ad_message_id: msgId,
    };
    dispatch(clearBuyerPaidAdMessageCounter(counterData));
  };

  return (
    <Container>
      {currentItems?.length > 0 && profile.is_marketplace_seller && (
        <Row>
          <Col>
            <h2 className="text-center py-3">
              <hr />
              <i className="fa fa-message"></i> Buyer Paid Ad Inbox
              <hr />
            </h2>
            {loadingError && <Message variant="danger">{loadingError}</Message>}
            {loading ? (
              <Loader />
            ) : (
              <>
                {currentItems?.length === 0 ? (
                  <div className="text-center py-3">
                    Buyer paid ad inbox messages appear here.
                  </div>
                ) : (
                  <Card className="py-3">
                    <Card.Body>
                      <ListGroup>
                        {currentItems?.map((message) => (
                          <ListGroup.Item
                            key={message.id}
                            className={`message-list-item ${
                              !message?.is_read ? "unread-message" : ""
                            }`}
                          >
                            <Card.Title>{message?.subject}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                              {/* Seller:  */}
                              <i className="fas fa-user"></i>{" "}
                              {message?.paid_ad_seller_username}
                              {/* | Buyer:{" "}
                            <i className="fas fa-user"></i> {message?.username} */}
                            </Card.Subtitle>

                            <Card.Text
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                  expandedMessages.includes(message.id)
                                    ? message.message
                                    : message?.message?.split(" ")?.length > 10
                                    ? message.message
                                        .split(" ")
                                        ?.slice(0, 10)
                                        .join(" ") + " ..."
                                    : message.message
                                ),
                              }}
                            />

                            {message?.message?.split(" ")?.length > 10 &&
                              !expandedMessages?.includes(message.id) && (
                                <>
                                  <Button
                                    variant="link"
                                    onClick={() => {
                                      expandMessage(message.id);
                                    }}
                                  >
                                    {" "}
                                    Read More
                                  </Button>
                                </>
                              )}
                            <div className="d-flex justify-content-between text-muted">
                              <small>
                                {new Date(message?.modified_at).toLocaleString("en-US",
                                  {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                  })}
                              </small>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => {
                                  handleReplyBuyer(message);
                                  clearMsgCounter(message.paid_ad_message_id);
                                }}
                              >
                                Reply Message{" "}
                                {message.buyer_paid_ad_msg_count > 0 && (
                                  <span className="msg-counter">
                                    {message.buyer_paid_ad_msg_count}
                                  </span>
                                )}
                              </Button>
                            </div>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Card.Body>
                  </Card>
                )}
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={activeBuyerPaidAdMessages?.length}
                  currentPage={currentPage}
                  paginate={paginate}
                />
              </>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default GetActiveBuyerPaidAdMsg;
