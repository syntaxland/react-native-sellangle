// // GetSellerPaidAdMsgInbox.js
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { ListGroup, Button, Container, Row, Col, Card } from "react-bootstrap";
// import { getUserProfile } from "../../actions/userProfileActions";
// import {
//   listBuyerPaidAdMessages,
//   clearSellerPaidAdMessageCounter,
// } from "../../actions/marketplaceSellerActions";
// import Message from "../Message";
// import Loader from "../Loader";
// import DOMPurify from "dompurify";
// import Pagination from "../Pagination";

// const GetSellerPaidAdMsgInbox = () => {
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const userProfile = useSelector((state) => state.userProfile);
//   const { profile } = userProfile;

//   useEffect(() => {
//     if (!userInfo) {
//       window.location.href = "/login";
//     }
//   }, [userInfo]);

//   const listBuyerPaidAdMessagesState = useSelector(
//     (state) => state.listBuyerPaidAdMessagesState
//   );
//   const { loading, paidAdMessages, error } = listBuyerPaidAdMessagesState;
//   console.log("paidAdMessages:", paidAdMessages);

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = paidAdMessages?.slice(indexOfFirstItem, indexOfLastItem);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const [expandedMessages, setExpandedMessages] = useState([]);

//   const expandMessage = (messageId) => {
//     setExpandedMessages((prevExpanded) => [...prevExpanded, messageId]);
//   };

//   const handleReplyBuyer = (message) => {
//     const queryParams = {
//       id: message?.paid_ad_id,
//       paid_ad_message_id: message?.paid_ad_message_id,
//       image1: message?.paid_ad_image1,
//       ad_name: message?.paid_ad_name,
//       price: message?.paid_ad_price,
//       currency: message?.paid_ad_currency,
//       sellerAvatarUrl: message?.sellerAvatarUrl,
//       seller_username: message?.paid_ad_seller_username,
//       expiration_date: message?.paid_ad_expiration_date,
//       ad_rating: message?.paid_ad_rating,
//     };

//     history.push({
//       pathname: `/seller/paid/ad/message/${message.id}`, 
//       search: `?${new URLSearchParams(queryParams).toString()}`,
//     });
//   };

//   const clearMsgCounter = (msgId) => {
//     const counterData = {
//       paid_ad_message_id: msgId,
//     };
//     dispatch(clearSellerPaidAdMessageCounter(counterData));
//   };

//   useEffect(() => {
//     dispatch(getUserProfile());
//     dispatch(listBuyerPaidAdMessages());
//   }, [dispatch]);

//   return (
//     <Container>
//       {profile.is_marketplace_seller && (
//         <Row>
//           <Col>
//             <h2 className="text-center py-3">
//               <hr />
//               <i className="fa fa-message"></i> Seller Paid Ad Inbox
//               <hr />
//             </h2>
//             {error && <Message variant="danger">{error}</Message>}
//             {loading ? (
//               <Loader />
//             ) : (
//               <>
//                 {currentItems?.length === 0 ? (
//                   <div className="text-center py-3">
//                     Paid ad inbox messages appear here.
//                   </div>
//                 ) : (
//                   <Card className="py-3">
//                     <Card.Body>
//                       <ListGroup>
//                         {currentItems?.map((message) => (
//                           <ListGroup.Item
//                             key={message.id}
//                             className={`message-list-item ${
//                               !message?.is_read ? "unread-message" : ""
//                             }`}
//                           >
//                             <Card.Title>{message?.subject}</Card.Title>
//                             <Card.Subtitle className="mb-2 text-muted">
//                               {/* Seller: <i className="fas fa-user"></i>{" "}
//                             {message?.paid_ad_seller_username} |  */}
//                               {/* Buyer:{" "} */}
//                               <i className="fas fa-user"></i>{" "}
//                               {message?.username}
//                             </Card.Subtitle>

//                             <Card.Text
//                               dangerouslySetInnerHTML={{
//                                 __html: DOMPurify.sanitize(
//                                   expandedMessages.includes(message.id)
//                                     ? message.message
//                                     : message?.message?.split(" ")?.length > 10
//                                     ? message.message
//                                         .split(" ")
//                                         ?.slice(0, 10)
//                                         .join(" ") + " ..."
//                                     : message.message
//                                 ),
//                               }}
//                             />

//                             {message?.message?.split(" ")?.length > 10 &&
//                               !expandedMessages?.includes(message.id) && (
//                                 <>
//                                   <Button
//                                     variant="link"
//                                     onClick={() => {
//                                       expandMessage(message.id);
//                                     }}
//                                   >
//                                     {" "}
//                                     Read More
//                                   </Button>
//                                 </>
//                               )}
//                             <div className="d-flex justify-content-between text-muted">
//                               <small>
//                                 {new Date(message?.modified_at).toLocaleString()}
//                               </small>
//                               <Button
//                                 variant="outline-primary"
//                                 size="sm"
//                                 onClick={() => {
//                                   handleReplyBuyer(message);
//                                   clearMsgCounter(message.paid_ad_message_id);
//                                 }}
//                               >
//                                 Reply Message{" "}
//                                 {message.seller_paid_ad_msg_count > 0 && (
//                                   <span className="msg-counter">
//                                     {message.seller_paid_ad_msg_count}
//                                   </span>
//                                 )}
//                               </Button>
//                             </div>
//                           </ListGroup.Item>
//                         ))}
//                       </ListGroup>
//                     </Card.Body>
//                   </Card>
//                 )}
//                 <Pagination
//                   itemsPerPage={itemsPerPage}
//                   totalItems={paidAdMessages?.length}
//                   currentPage={currentPage}
//                   paginate={paginate}
//                 />
//               </>
//             )}
//           </Col>
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default GetSellerPaidAdMsgInbox;
