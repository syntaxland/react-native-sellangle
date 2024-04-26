// SupportTicket.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  // useHistory
} from "react-router-dom";
import { Table, Button, Row, Col, Container, ListGroup } from "react-bootstrap";
import {
  clearUserSupportMsgCounter,
  listAllSupportTickets,
} from "../../actions/supportActions";
import Message from "../Message";
import Loader from "../Loader";
import Pagination from "../Pagination";

function SupportTicket() {
  const dispatch = useDispatch();
  // const history = useHistory();
  const allTicketList = useSelector((state) => state.allTicketList);
  const { loading, tickets, error } = allTicketList;
  console.log("tickets:", tickets);

  // const allTicketResponse = useSelector(
  //   (state) => state.allTicketResponse
  // );
  // const {
  //   loading: listSupportMessageloading,
  //   ticketMessages,
  //   error: listSupportMessageError,
  // } = allTicketResponse;
  // console.log("ticketMessages:", ticketMessages);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //   const currentItems = tickets.slice(indexOfFirstItem, indexOfLastItem);
  const currentItems = tickets
    ? tickets.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  useEffect(() => {
    dispatch(listAllSupportTickets());
  }, [dispatch]);

  // const handleCreateTicket = () => {
  //   history.push("/create-support-ticket");
  // };

  const clearMessageCounter = (ticketId) => {
    const ticketData = {
      ticket_id: ticketId,
    };
    dispatch(clearUserSupportMsgCounter(ticketData));
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center py-3">
            <i className="fas fa-ticket"></i> Support Ticket
          </h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {currentItems.length === 0 ? (
                <div className="text-center py-3">
                  Support tickets appear here.
                </div>
              ) : (
                <Table striped bordered hover responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>SN</th>
                      <th>Ticket ID</th>
                      <th>User</th>
                      <th>Account ID</th>
                      <th>username</th>
                      <th>Subject</th>
                      <th>Category</th>
                      <th>Message</th>
                      <th>Status</th>
                      <th>Resolved</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((ticket, index) => (
                      <tr key={ticket.id}>
                        <td>{index + 1}</td>
                        <td className="text-center">
                          <ListGroup className="text-center py-2"> 
                            <ListGroup.Item>#{ticket.ticket_id}</ListGroup.Item>
                          </ListGroup>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() =>
                              clearMessageCounter(ticket.ticket_id)
                            }
                          >
                            <Link
                              to={`/admin-reply-support-ticket/${ticket.ticket_id}`}
                              style={{ textDecoration: "none" }}
                            >
                              Reply User{" "}
                              {ticket?.admin_user_msg_count > 0 && (
                                <span className="msg-counter">
                                  {ticket?.admin_user_msg_count}
                                </span>
                              )}
                            </Link>
                          </Button>
                        </td>
                        <td>{ticket.email}</td>
                        <td>{ticket.account_id}</td>
                        <td>{ticket.user_username}</td>
                        <td>{ticket.subject}</td>
                        <td>{ticket.category}</td>
                        <td>{ticket.message}</td>
                        <td>
                          {ticket.is_closed ? (
                            <span style={{ color: "red" }}>Closed</span>
                          ) : (
                            <span style={{ color: "green" }}>Active</span>
                          )}
                        </td>
                        <td>
                          {ticket.is_resolved ? (
                            <i
                              className="fas fa-check-circle"
                              style={{ fontSize: "16px", color: "green" }}
                            ></i>
                          ) : (
                            <i
                              className="fas fa-times-circle"
                              style={{ fontSize: "16px", color: "red" }}
                            ></i>
                          )}
                        </td>

                        <td>
                          {new Date(ticket.created_at).toLocaleString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
              <div className="py-2">
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={tickets.length}
                  currentPage={currentPage}
                  paginate={paginate}
                />
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default SupportTicket;
