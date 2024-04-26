// GetSellerDetail.js
import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import {
  Row,
  Col,
  // Image,
  ListGroup,
  Button,
  // Card,
  Container,
} from "react-bootstrap";
import RatingSeller from "../RatingSeller";
import Loader from "../Loader";
import Message from "../Message";
import { useDispatch, useSelector } from "react-redux";
import {
  getSellerAccount,
  getPaidAdDetail,
  getSellerDetail,
} from "../../actions/marketplaceSellerActions";
// import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import Paysofter from "../MarketplacePayment/Paysofter";
// import PromoTimer from "../PromoTimer";

function GetSellerDetail({ match, history, seller_username }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  // const getSellerAccountState = useSelector(
  //   (state) => state.getSellerAccountState
  // );
  // const { sellerDetail } = getSellerAccountState;

  const getSellerDetailState = useSelector(
    (state) => state.getSellerDetailState
  );
  const {
    loading,
    error,
    sellerAvatarUrl,

    sellerDetail,
  } = getSellerDetailState;
  console.log("sellerDetail", sellerDetail);

  // const [showPaysofterOption, setShowPaysofterOption] = useState(false);

  // const handlePaysofterOption = () => {
  //   setShowPaysofterOption(!showPaysofterOption);
  // };

  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  const handleShowPhoneNumber = () => {
    setShowPhoneNumber(!showPhoneNumber);
  };

  // const getPaidAdDetailState = useSelector(
  //   (state) => state.getPaidAdDetailState
  // );
  // const {
  //   // loading,
  //   // error,
  //   // sellerDetail,
  //   // sellerApiKey,
  //   sellerAvatarUrl,
  // } = getPaidAdDetailState;
  // console.log("sellerAvatarUrl", sellerAvatarUrl);

  useEffect(() => {
    dispatch(getPaidAdDetail(match?.params.id));
    dispatch(getSellerAccount());
    dispatch(getSellerDetail(seller_username));
  }, [dispatch, seller_username, match]);

  // const images = [sellerDetail?.image1, sellerDetail?.image2, sellerDetail?.image3].filter(Boolean);

  // function formatCount(viewCount) {
  //   if (viewCount >= 1000000) {
  //     // Format as million
  //     return (viewCount / 1000000).toFixed(1) + "m";
  //   } else if (viewCount >= 1000) {
  //     // Format as thousand
  //     return (viewCount / 1000).toFixed(1) + "k";
  //   } else {
  //     return viewCount?.toString();
  //   }
  // }

  function calculateDuration(joinedTimestamp) {
    const now = new Date();
    const joinedDate = new Date(joinedTimestamp);
    const duration = now - joinedDate;

    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""}`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""}`;
    } else if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? "s" : ""}`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""}`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""}`;
    }
  }

  function calculateLastSeen(lastLoginTimestamp) {
    const now = new Date();
    const lastLoginDate = new Date(lastLoginTimestamp);
    const duration = now - lastLoginDate;

    const days = Math.floor(duration / (24 * 60 * 60 * 1000));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    console.log("days:", days,);

    if (days < 3) {
      return "Last seen recently";
    } else if (weeks < 1) {
      return "Last seen within a week";
    } else if (months < 1) {
      return "Last seen within a month";
      // } else if (months > 1) {
      //   return "Last seen a long time ago";
    } else {
      return "Last seen a long time ago";
    }
  }

  // function calculateDuration(joinedTimestamp) {
  //   const now = new Date();
  //   const joinedDate = new Date(joinedTimestamp);
  //   const duration = now - joinedDate;

  //   const days = Math.floor(duration / (24 * 60 * 60 * 1000));
  //   const hours = Math.floor(
  //     (duration % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
  //   );
  //   const minutes = Math.floor((duration % (60 * 60 * 1000)) / (60 * 1000));
  //   const seconds = Math.floor((duration % (60 * 1000)) / 1000);

  //   const parts = [];

  //   if (days > 0) {
  //     parts.push(`${days} days`);
  //   }

  //   if (hours > 0) {
  //     parts.push(`${hours} hours`);
  //   }

  //   if (minutes > 0) {
  //     parts.push(`${minutes} minutes`);
  //   }

  //   if (seconds > 0) {
  //     parts.push(`${seconds} seconds`);
  //   }

  //   return parts.join(", ");
  // }

  // const handleClickMessageSeller = () => {
  //   const queryParams = {
  //     id: sellerDetail.id,
  //     image1: sellerDetail.image1,
  //     ad_name: sellerDetail.ad_name,
  //     price: sellerDetail.price,
  //     sellerAvatarUrl,
  //     seller_username: sellerDetail.seller_username,
  //     expiration_date: sellerDetail.expiration_date,
  //     rating: sellerDetail.rating,
  //   };

  //   history.push({
  //     pathname: `/paid/ad/message/${sellerDetail.id}`,
  //     search: `?${new URLSearchParams(queryParams).toString()}`,
  //   });
  // };

  // const handleSellerShopFront = () => {
  //   history.push(`/seller-shop-front/${sellerDetail?.seller_username}/`);
  // };

  return (
    <Container>
      <Row>
        <Col>
          {/* <Link to="/marketplace" className="btn btn-dark my-3">
            {" "}
            Go Back
          </Link> */}

          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error} </Message>
          ) : (
            <Row>
              <ListGroup className="py-2">
                <ListGroup.Item>
                  <ListGroup.Item>Seller Details</ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col md={4}>
                        {/* <Link
                          to={`/seller-shop-front/${sellerDetail?.seller_username}/`}
                        > */}
                        <span className="d-flex justify-content-between py-2">
                          {sellerAvatarUrl && (
                            <img
                              src={sellerAvatarUrl}
                              alt="Seller"
                              style={{
                                maxWidth: "80px",
                                maxHeight: "80px",
                                borderRadius: "50%",
                              }}
                            />
                          )}
                          {sellerDetail?.seller_username}
                        </span>
                        {/* </Link> */}
                        {calculateLastSeen(sellerDetail?.user_last_login)}
                      </Col> 
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div>
                      <span>
                        {sellerDetail?.is_seller_verified ? (
                          <>
                            <Button
                              variant="outline-success"
                              size="sm"
                              className="rounded"
                              disabled
                            >
                              <i className="fas fa-user"></i> <i>Verified ID</i>{" "}
                              <i
                                className="fas fa-check-circle"
                                style={{ fontSize: "18px", color: "blue" }}
                              ></i>
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="rounded"
                              disabled
                            >
                              <i className="fas fa-user"></i>{" "}
                              <i>ID Not Verified</i>{" "}
                              <i style={{ fontSize: "18px", color: "red" }}></i>
                            </Button>
                          </>
                        )}
                      </span>
                    </div>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <span>
                      <RatingSeller
                        value={sellerDetail?.rating}
                        // text={`${formatCount(
                        //   sellerDetail?.review_count
                        // )} reviews `}
                        color={"green"}
                      />
                    </span>
                    {/* <span>
                      {userInfo ? (
                        <Link to={`/review-list/${sellerDetail.id}`}>
                          (Seller Reviews)
                        </Link>
                      ) : (
                        <Link onClick={() => history.push("/login")}>
                          (Seller Reviews)
                        </Link>
                      )}
                    </span> */}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Button
                      variant="primary"
                      size="sm"
                      className="py-2 rounded"
                      onClick={handleShowPhoneNumber}
                    >
                      <i className="fa fa-phone"></i>{" "}
                      {showPhoneNumber ? "Hide" : "Show"} Seller Phone Number
                    </Button>
                    <p className="mt-2">
                      {showPhoneNumber && <p>{sellerDetail?.seller_phone}</p>}
                    </p>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Business Name: {sellerDetail?.business_name}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Category: {sellerDetail?.business_category}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Description: {sellerDetail?.business_description}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Website: {sellerDetail?.business_website}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Business Address: {sellerDetail?.business_address}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Country: {sellerDetail?.country}
                  </ListGroup.Item>
                </ListGroup.Item>
                <ListGroup.Item>
                  Joined since{" "}
                  {calculateDuration(sellerDetail?.seller_joined_since)}
                </ListGroup.Item>
              </ListGroup>
            </Row>
          )}

          <div className="text-center mt-4 mb-2 text-muted">
            <p style={{ color: "red" }}>
              <strong>Disclaimer:</strong> Buyers are advised to exercise
              caution and conduct thorough verification when dealing with
              sellers. Ensure the authenticity of both the product and the
              seller before proceeding with any transactions.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default GetSellerDetail;
