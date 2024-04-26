// // GetBuyerPaidAdMessages.js
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { Table, Button, Row, Col, Container } from "react-bootstrap";
// import { listBuyerPaidAdMessages,

//     clearSellerPaidAdMessageCounter,
// } from "../../actions/marketplaceSellerActions";
// import Message from "../Message";
// import Loader from "../Loader";
// import Pagination from "../Pagination";
// import PromoTimer from "../PromoTimer";

// function GetBuyerPaidAdMessages() { 
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

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
//   const itemsPerPage = 5;

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = paidAdMessages?.slice(indexOfFirstItem, indexOfLastItem);

//   useEffect(() => {
//     dispatch(listBuyerPaidAdMessages());
//   }, [dispatch]);

//   const handleReplyBuyer = (ad) => {
//     const queryParams = {
//       id: ad?.paid_ad_id,
//       paid_ad_message_id: ad?.paid_ad_message_id,
//       image1: ad?.paid_ad_image1,
//       ad_name: ad?.paid_ad_name,
//       price: ad?.paid_ad_price,
//       currency: ad?.paid_ad_currency,
//       sellerAvatarUrl: ad?.sellerAvatarUrl,
//       seller_username: ad?.paid_ad_seller_username,
//       expiration_date: ad?.paid_ad_expiration_date,
//       ad_rating: ad?.paid_ad_rating,
//     };

//     console.log("handleReplyBuyer queryParams:", queryParams);

//     history.push({
//       pathname: `/seller/paid/ad/message/${ad.id}`,
//       search: `?${new URLSearchParams(queryParams).toString()}`,
//     });
//   };

//   const clearMsgCounter = (msgId) => {
//     const counterData = {
//       paid_ad_message_id: msgId,
//     };
//     dispatch(clearSellerPaidAdMessageCounter(counterData));
//   };
//   return (
//     <Container>
//       <Row>
//         <Col>
//           <hr />
//           <h1 className="text-center py-3">
//             {/* <i className="fas fa-message"></i>  */}
//             Promoted Ads
//           </h1>
//           <hr />
//           {loading ? (
//             <Loader />
//           ) : error ? (
//             <Message variant="danger">{error}</Message>
//           ) : (
//             <>
//               {currentItems.length === 0 ? (
//                 <div className="text-center py-3">
//                   Seller inbox messages appear here.
//                 </div>
//               ) : (
//                 <Table
//                   striped
//                   bordered
//                   hover
//                   responsive
//                   className="table-sm py-2 rounded"
//                 >
//                   <thead>
//                     <tr>
//                       <th>SN</th>
//                       {/* <th>Msg ID</th> */}
//                       {/* <th>Ad ID</th> */}
//                       <th>Ad Image</th>
//                       <th>Ad Name</th>
//                       <th>Ad Price</th>
//                       <th>User</th>
//                       <th>Ad Expiration Date</th>
//                       <th>Message</th>
//                       <th>Message ID</th>
//                       <th>Timestamp</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {currentItems?.map((ad, index) => (
//                       <tr key={ad.id} className="rounded">
//                         <td>{index + 1}</td>
//                         {/* <td>{ad.id}</td> */}
//                         {/* <td>{ad.paid_ad_id}</td> */}
//                         <td>{ad.paid_ad_image1}</td>
//                         <td>{ad.paid_ad_name}</td>
//                         <td>{ad.paid_ad_price} {ad.paid_ad_currency}</td>
//                         <td>{ad.username}</td>
//                         <td>
//                           <Button
//                             variant="outline-danger"
//                             size="sm"
//                             className="rounded"
//                             disabled
//                           >
//                             <i className="fas fa-clock"></i> Expires in:{" "}
//                             <PromoTimer
//                               expirationDate={ad.paid_ad_expiration_date}
//                             />
//                           </Button>
//                         </td>

//                         <td>{ad.message}</td>
//                         <td>{ad.paid_ad_message_id}</td>
//                         <td>
//                           {new Date(ad.timestamp).toLocaleString("en-US", {
//                             weekday: "long",
//                             year: "numeric",
//                             month: "long",
//                             day: "numeric",
//                             hour: "numeric",
//                             minute: "numeric",
//                             second: "numeric",
//                           })}
//                         </td>

//                         <td>
//                           <Button
//                             variant="outline-primary"
//                             size="sm"
//                             onClick={() => {
//                               handleReplyBuyer(ad);
//                               clearMsgCounter(ad.paid_ad_message_id);
//                             }}
//                           >
//                             Reply Message{" "}
//                             {ad.seller_paid_ad_msg_count > 0 && (
//                               <span className="msg-counter">
//                                 {ad.seller_paid_ad_msg_count}
//                               </span>
//                             )}
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               )}
//               <Pagination
//                 itemsPerPage={itemsPerPage}
//                 totalItems={paidAdMessages?.length}
//                 currentPage={currentPage}
//                 paginate={paginate}
//               />
//             </>
//           )}
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default GetBuyerPaidAdMessages;
