// UserReplySupportTicket.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Button, Row, Col, Container, ListGroup } from "react-bootstrap";
import {
  userReplySupportTicket,
  getTicketDetail,
  listSupportTicketReply,
} from "../../actions/supportActions";
import Loader from "../Loader";
import Message from "../Message";
import LoaderButton from "../LoaderButton";

function UserReplySupportTicket() {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);
  
  const { id } = useParams();
  const [replyMessage, setReplyMessage] = useState("");

  const replySupportTicketState = useSelector(
    (state) => state.replySupportTicketState
  );
  const { loading, success, error } = replySupportTicketState;

  const ticketDetailList = useSelector((state) => state.ticketDetailList);
  const { tickets } = ticketDetailList;
  console.log("tickets:", tickets);

  const listSupportTicketReplyState = useSelector(
    (state) => state.listSupportTicketReplyState
  );
  const { ticketReplies } = listSupportTicketReplyState;
  console.log("ticketReplies:", ticketReplies);

  useEffect(() => {
    const ticketId = id;
    dispatch(getTicketDetail(ticketId));
    dispatch(listSupportTicketReply(ticketId));
  }, [dispatch, id]);

  const handleSubmitReply = (e) => {
    e.preventDefault();

    const replyticketData = {
      ticket_id: id,
      message: replyMessage,
    };

    dispatch(userReplySupportTicket(replyticketData));
  };

  // useEffect(() => {
  //   if (!userInfo) {
  //     // Redirect to login or handle unauthorized access
  //   }
  // }, [dispatch, userInfo]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        // history.push("/dashboard");
        window.location.reload();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [success, history]);

  const ticketsFormatted = tickets ? tickets : [];
  const ticketRepliesFormatted = ticketReplies ? ticketReplies : [];

  const formatTimestamp = (created_at) => {
    const messageDate = new Date(created_at);
    return messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Function to determine if a message is the first of the day
  const isFirstMessageOfDay = (currentIndex, messages) => {
    if (currentIndex === 0) return true;

    const currentDate = new Date(messages[currentIndex].created_at);
    const prevDate = new Date(messages[currentIndex - 1].created_at);

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

    return false;
  };

  return (
    <Container>
      <div>
        <Row className="d-flex justify-content-center">
          <Col className="border rounded p-4 bg-secondary py-2" xs={10} md={8}>

            {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}

            <ListGroup className="py-2 text-center">
              <ListGroup.Item>
                <h2 className="rounded py-2 text-center">Support Ad Details</h2>
                <Row>
                  <Col>
                    <ListGroup.Item>
                      <h2>Ticket ID: {id}</h2>
                    </ListGroup.Item>
                  </Col>
                  <Col>
                    <ListGroup.Item>
                      {ticketsFormatted.map((message) => (
                        <ListGroup.Item
                          key={message.id}
                          className="border rounded p-4 py-2"
                        >
                          <ListGroup.Item>
                            Subject: {message.subject}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <i className="fas fa-user"></i>{" "}
                            {message.user_username?.charAt(0).toUpperCase() +
                              message.user_username?.slice(1)}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Message: {message.message}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            {new Date(message?.created_at).toLocaleString(
                              "en-US",
                              {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              }
                            )}
                          </ListGroup.Item>
                        </ListGroup.Item>
                      ))}
                    </ListGroup.Item>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>

            <ListGroup className="py-2 text-center">
              <ListGroup.Item>
                <h2>Responses</h2>
              </ListGroup.Item>
            </ListGroup>

            {ticketRepliesFormatted?.map((message, index) => (
              <div key={message.id}>
                {isFirstMessageOfDay(index, ticketRepliesFormatted) && (
                  <p className="text-center mb-0 mt-3">
                    {new Date(message.created_at).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
                <div
                  className={`${ 
                    message.admin_user
                      ? "d-flex justify-content-left"
                      : "d-flex justify-content-end"
                  }`}
                  style={{ maxWidth: "75%" }}
                >
                  <div>
                    <div
                      className={`border rounded p-3 my-2 ${
                        message.admin_user
                          ? "bg-light"
                          : "bg-success justify-content-end"
                      }`}
                    >
                      <p>
                        <i className="fas fa-user"></i>{" "}
                        {message.user_username
                          ? message.user_username?.charAt(0).toUpperCase() +
                            message.user_username?.slice(1)
                          : message.admin_username?.charAt(0).toUpperCase() +
                            message.admin_username?.slice(1)}
                      </p>
                      <p>{message.message}</p>
                      <p className="d-flex justify-content-end">
                        {" "}
                        {formatTimestamp(message.created_at)}
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
                  rows={4}
                  value={replyMessage}
                  maxLength={1000}
                  onChange={(e) => setReplyMessage(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <div className="py-2">
                <Button
                  className="w-100 rounded"
                  type="submit"
                  variant="success"
                  disabled={loading}
                >
                  <div className="d-flex justify-content-center">
                    <span className="py-1">
                      Submit <i className="fa fa-paper-plane"></i>
                    </span>
                    {loading && <LoaderButton />}
                  </div>
                </Button>
              </div>
              {success && (
                <Message variant="success">Message sent successfully.</Message>
              )}
            </Form>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default UserReplySupportTicket;
