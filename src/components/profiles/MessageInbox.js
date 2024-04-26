// MessageInbox.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ListGroup, Button, Container, Row, Col, Card } from "react-bootstrap";
import {
  getUserMessages,
  clearMessageCounter,
} from "../../actions/messagingActions";
import Message from "../Message";
import Loader from "../Loader";
import DOMPurify from "dompurify";
import Pagination from "../Pagination";

const MessageInbox = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;
  console.log("profile:", profile);

  const getUserMessagesState = useSelector(
    (state) => state.getUserMessagesState
  );
  const { loading, messages, error } = getUserMessagesState;
  console.log("messages:", messages);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // console.log("userInfo:", userInfo);

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo, history]);

  const msgCounted = messages?.reduce(
    (total, userMessages) => total + userMessages.msg_count, 
    0
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = messages?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(getUserMessages());
  }, [dispatch]);

  const [expandedMessages, setExpandedMessages] = useState([]);

  const expandMessage = (messageId) => {
    setExpandedMessages((prevExpanded) => [...prevExpanded, messageId]);
  };

  const clearMsgCounter = (msgId) => {
    const messageData = {
      msg_id: msgId,
    };
    dispatch(clearMessageCounter(messageData));
  };

  return (
    <Container>
      <Row>
        <Col>
          <hr />
          <h2 className="text-center py-3">
            <i className="fa fa-message"></i> Message Inbox{" "}
            {msgCounted > 0 && (
              <>
                (<span className="msg-counter">{msgCounted}</span>)
              </>
            )}
          </h2>
          <hr />
          {error && <Message variant="danger">{error}</Message>}
          {loading ? (
            <Loader />
          ) : (
            <>
              {currentItems.length === 0 ? (
                <div className="text-center py-3">
                  Inbox messages appear here.
                </div>
              ) : (
                <Card className="py-3">
                  <Card.Body>
                    <ListGroup>
                      {currentItems?.map((message) => (
                        <ListGroup.Item
                          key={message.id}
                          className={`message-list-item ${
                            !message.is_read ? "unread-message" : ""
                          }`}
                        >
                          <Card.Title>{message.subject}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            {message?.sender?.username}
                          </Card.Subtitle>
                          <Card.Text
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                expandedMessages.includes(message.id)
                                  ? message.message
                                  : message?.message?.split(" ")?.length > 1
                                  ? message.message
                                      .split(" ")
                                      ?.slice(0, 1)
                                      .join(" ") + " ..."
                                  : message.message
                              ),
                            }}
                          />

                          {message?.message?.split(" ")?.length > 0 &&
                            !expandedMessages?.includes(message.id) && (
                              <Button
                                variant="link"
                                onClick={() => {
                                  expandMessage(message.id);
                                  clearMsgCounter(message.id);
                                }}
                              >
                                View
                              </Button>
                            )}
                          <small className="d-flex justify-content-between text-muted">
                            {new Date(message.timestamp).toLocaleString()}
                            {message.is_read && (
                              <span className="text-success">
                                <i className="fas fa-check-double"> </i>Seen
                              </span>
                            )}
                          </small>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              )}
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={messages?.length}
                currentPage={currentPage}
                paginate={paginate}
              />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MessageInbox;
