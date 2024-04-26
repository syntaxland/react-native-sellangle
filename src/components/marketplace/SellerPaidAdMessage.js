// SellerPaidAdMessage.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Form, Button, Row, Col, ListGroup, Container } from "react-bootstrap";
import {
  sellerReplyPaidAdMessage,
  listPaidAdMessages,
} from "../../actions/marketplaceSellerActions";
import Loader from "../Loader";
import Message from "../Message";
import RatingSeller from "../RatingSeller";
import PromoTimer from "../PromoTimer";
import LoaderButton from "../LoaderButton";
import { formatAmount } from "../FormatAmount";

function SellerPaidAdMessage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const id = queryParams.get("id");
  const paid_ad_message_id = queryParams.get("paid_ad_message_id");
  const image1 = queryParams.get("image1");
  const ad_name = queryParams.get("ad_name");
  const price = queryParams.get("price");
  const currency = queryParams.get("currency");
  const sellerAvatarUrl = queryParams.get("sellerAvatarUrl");
  const seller_username = queryParams.get("seller_username");
  const expiration_date = queryParams.get("expiration_date");
  const ad_rating = queryParams.get("ad_rating");

  const [message, setMessage] = useState("");

  const sellerReplyPaidAdMessageState = useSelector(
    (state) => state.sellerReplyPaidAdMessageState
  );
  const { loading, success, error } = sellerReplyPaidAdMessageState;

  const listPaidAdMessageState = useSelector(
    (state) => state.listPaidAdMessageState
  );
  const {
    loading: listPaidAdMessageLoading,
    error: listPaidAdMessageError,
    adMessages,
  } = listPaidAdMessageState;
  console.log("adMessages:", adMessages);

  useEffect(() => {
    const messageData = {
      ad_id: id,
      paid_ad_message_id: paid_ad_message_id,
    };
    dispatch(listPaidAdMessages(messageData));
  }, [dispatch, id, paid_ad_message_id]);

  const handleSubmitReply = (e) => {
    e.preventDefault();

    const messageData = {
      ad_id: id,
      message: message,
      paid_ad_message_id: paid_ad_message_id,
    };

    dispatch(sellerReplyPaidAdMessage(messageData));
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        // history.push("/dashboard");
        window.location.reload();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [success, history]);

  // Function to format the timestamp
  const formatTimestamp = (timestamp) => {
    const messageDate = new Date(timestamp);
    return messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Function to determine if a message is the first of the day
  const isFirstMessageOfDay = (currentIndex, messages) => {
    if (currentIndex === 0) return true;

    const currentDate = new Date(messages[currentIndex].timestamp);
    const prevDate = new Date(messages[currentIndex - 1].timestamp);

    // Check if the messages were sent on different dates
    if (currentDate.toLocaleDateString() !== prevDate.toLocaleDateString()) {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      // Check if the current message was sent today
      if (currentDate.toLocaleDateString() === today.toLocaleDateString()) {
        return "Today";
      }
      // Check if the current message was sent yesterday
      else if (
        currentDate.toLocaleDateString() === yesterday.toLocaleDateString()
      ) {
        return "Yesterday";
      } else {
        // If it's beyond yesterday, return the full date
        return currentDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }
    }
  };

  return (
    <Container>
      <div>
        <Row className="d-flex justify-content-center">
          <Col className="border rounded p-4 bg-secondary" xs={10} md={8}>
            <div className=" py-2 ">
              {loading && <Loader />}
              {error && (
                <Message variant="danger" fixed>
                  {error}
                </Message>
              )}

              {listPaidAdMessageLoading && <Loader />}
              {listPaidAdMessageError && (
                <Message variant="danger" fixed>
                  {listPaidAdMessageError}
                </Message>
              )}
            </div>

            <ListGroup className="py-2">
              <ListGroup.Item>
                <h3 className="rounded py-2 text-center">Ad Details</h3>
                <Row>
                  <Col>
                    <ListGroup.Item>
                      <Row>
                        <Col md={4}>
                          <img
                            src={image1}
                            alt={ad_name}
                            className="img-fluid"
                          />
                        </Col>
                        <Col md={8}>
                          <p>{ad_name}</p>
                        </Col>
                        <Col md={12} className="py-2">
                          <ListGroup.Item>
                            <p>
                              {currency} {formatAmount(price)}
                            </p>
                          </ListGroup.Item>
                        </Col>
                        <Col md={12} className="py-2">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="rounded"
                            disabled
                          >
                            <i className="fas fa-clock"></i> Expires in:{" "}
                            <PromoTimer expirationDate={expiration_date} />
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </Col>
                  <Col>
                    <ListGroup.Item>
                      <Row>
                        <Col md={4}>
                          <img
                            src={sellerAvatarUrl}
                            alt={seller_username}
                            className="img-fluid"
                            style={{
                              // maxWidth: "80px",
                              // maxHeight: "80px",
                              borderRadius: "50%",
                            }}
                          />
                        </Col>
                        <Col md={8}>
                          <p>{seller_username}</p>
                        </Col>

                        <Col className="mt-2">
                          <ListGroup.Item>
                            <RatingSeller value={ad_rating} color={"green"} />
                          </ListGroup.Item>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>

            {adMessages?.map((message, index) => (
              <div key={message.id}>
                {isFirstMessageOfDay(index, adMessages) && (
                  <p className="text-center mb-0 mt-3">
                    {new Date(message.timestamp).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
                <div
                  className={`${
                    message.buyer
                      ? "d-flex justify-content-left"
                      : "d-flex justify-content-end"
                  }`}
                  style={{ maxWidth: "75%" }}
                >
                  <div>
                    <div
                      className={`border rounded p-3 my-2 ${
                        message.buyer
                          ? "bg-light"
                          : "bg-success justify-content-end"
                      }`}
                    >
                      <p>
                      <i className="fas fa-user"></i>{" "}
                        {message.buyer_username
                          ? message.buyer_username?.charAt(0).toUpperCase() +
                            message.buyer_username?.slice(1)
                          : message.seller_username?.charAt(0).toUpperCase() +
                            message.seller_username?.slice(1)}
                      </p>
                      <p>{message.message}</p>
                      <p className="d-flex justify-content-end">
                        {" "}
                        {formatTimestamp(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Form onSubmit={handleSubmitReply}>
              <Form.Group controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  placeholder="Type your message"
                  rows={2}
                  value={message}
                  maxLength={500}
                  onChange={(e) => setMessage(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <div className="py-2">
                <Button
                  className="w-100 rounded"
                  type="submit"
                  variant="primary"
                  disabled={loading}
                >
                  <div className="d-flex justify-content-center">
                    <span className="py-1">Send <i className="fa fa-paper-plane"></i></span>
                    {loading && <LoaderButton />}
                  </div>
                </Button>
              </div>
              {success && (
                <Message variant="success" fixed>
                  Message sent successfully.
                </Message>
              )}
            </Form>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default SellerPaidAdMessage;
