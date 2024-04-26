// // GetSellerFreeAdMsgInbox.js
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { ListGroup, Button, Container, Row, Col, Card } from "react-bootstrap";
// import { getUserProfile } from "../../actions/userProfileActions";
// import {
//   listBuyerFreeAdMessages,
//   clearSellerFreeAdMessageCounter,
// } from "../../actions/marketplaceSellerActions";
// import Message from "../Message";
// import Loader from "../Loader";
// import DOMPurify from "dompurify";
// import Pagination from "../Pagination";

// const GetSellerFreeAdMsgInbox = () => {
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const userProfile = useSelector((state) => state.userProfile);
//   const { profile } = userProfile;

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   useEffect(() => {
//     if (!userInfo) {
//       window.location.href = "/login";
//     }
//   }, [userInfo]);

//   const listBuyerFreeAdMessagesState = useSelector(
//     (state) => state.listBuyerFreeAdMessagesState
//   );
//   const { loading, freeAdMessages, error } = listBuyerFreeAdMessagesState;
//   console.log("freeAdMessages:", freeAdMessages);

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = freeAdMessages?.slice(indexOfFirstItem, indexOfLastItem);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const [expandedMessages, setExpandedMessages] = useState([]);

//   const expandMessage = (messageId) => {
//     setExpandedMessages((prevExpanded) => [...prevExpanded, messageId]);
//   };

//   const handleReplyBuyer = (message) => {
//     const queryParams = {
//       id: message?.free_ad_id,
//       free_ad_message_id: message?.free_ad_message_id,
//       image1: message?.free_ad_image1,
//       ad_name: message?.free_ad_name,
//       price: message?.free_ad_price,
//       currency: message?.free_ad_currency,
//       sellerAvatarUrl: message?.sellerAvatarUrl,
//       seller_username: message?.free_ad_seller_username,
//       expiration_date: message?.free_ad_expiration_date,
//       ad_rating: message?.free_ad_rating,
//     };

//     history.push({
//       pathname: `/seller/free/ad/message/${message.id}`,
//       search: `?${new URLSearchParams(queryParams).toString()}`,
//     });
//   };

//   const clearMsgCounter = (msgId) => {
//     const counterData = {
//       free_ad_message_id: msgId,
//     };
//     dispatch(clearSellerFreeAdMessageCounter(counterData));
//   };

//   useEffect(() => {
//     dispatch(getUserProfile());
//     dispatch(listBuyerFreeAdMessages());
//   }, [dispatch]);

//   return (
//     <Container>
//       {profile.is_marketplace_seller && (
//         <Row>
//           <Col>
//             <h2 className="text-center py-3">
//               <hr />
//               <i className="fa fa-message"></i> Seller Free Ad Inbox
//               <hr />
//             </h2>
//             {error && <Message variant="danger">{error}</Message>}
//             {loading ? (
//               <Loader />
//             ) : (
//               <>
//                 {currentItems?.length === 0 ? (
//                   <div className="text-center py-3">
//                     Free ad inbox messages appear here.
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
//                             {message?.free_ad_seller_username} |  */}
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
//                                   clearMsgCounter(message.free_ad_message_id);
//                                 }}
//                               >
//                                 Reply Message{" "}
//                                 {message.seller_free_ad_msg_count > 0 && (
//                                   <span className="msg-counter">
//                                     {message.seller_free_ad_msg_count}
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
//                   totalItems={freeAdMessages?.length}
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

// export default GetSellerFreeAdMsgInbox;
