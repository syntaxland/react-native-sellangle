// CreateSupportTicket.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {
  createSupportTicket,
} from "../../actions/supportActions";  
import Loader from "../Loader"; 
import Message from "../Message";
 
function CreateSupportTicket() { 
  const dispatch = useDispatch();  
    const history = useHistory();
  
  const [subject, setSubject] = useState(""); 
  const [category, setCategory] = useState("support");
  const [message, setMessage] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin; 

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login"; 
    }
  }, [userInfo]);

  const createSupportTicketState = useSelector(
    (state) => state.createSupportTicketState
  );
  const { loading, success, error } = createSupportTicketState;

  const submitHandler = (e) => {
    e.preventDefault();

    const ticketData = {
      subject: subject,
      category: category,
      message: message,
    };

    dispatch(createSupportTicket(ticketData));
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        history.push("/support/tickets/");
        window.location.reload();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [success, history]);

  return (
    <div>
      <Row className="d-flex justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="text-center py-2">Create A New Support Ticket</h2>
          {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>}
          {success && (
            <Message variant="success">Ticket created successfully.</Message>
          )}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Support">Support</option>
                <option value="Account Fund">Account Fund</option>
                <option value="Billing">Billing</option>
                <option value="Abuse">Abuse</option>
                <option value="OTP">OTP</option>
                <option value="Payments">Payments</option>
                <option value="Services">Services</option>
                <option value="Credit Points">Credit Points</option>
                <option value="Referrals">Referrals</option>
                <option value="Others">Others</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                required
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject"
                maxLength={80}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={4}
                value={message}
                placeholder="Enter message"
                maxLength={1000}
                onChange={(e) => setMessage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <div className="py-2">
              <Button
                className="w-100 rounded"
                type="submit"
                variant="success"
                disabled={
                  message === "" || subject === "" || loading || success
                }
              >
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default CreateSupportTicket;
