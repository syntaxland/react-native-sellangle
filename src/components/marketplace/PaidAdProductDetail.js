// PaidAdProductDetail.js
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Container,
  Modal,
} from "react-bootstrap";
import RatingSeller from "../RatingSeller";
import Loader from "../Loader";
import Message from "../Message";
import { useDispatch, useSelector } from "react-redux";
import {
  getSellerAccount,
  getPaidAdDetail,
} from "../../actions/marketplaceSellerActions";
// import { getPaidAdDetail } from "../../actions/marketplaceSellerActions";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Paysofter from "../MarketplacePayment/Paysofter";
import PromoTimer from "../PromoTimer";
import DOMPurify from "dompurify";
import ReportPaidAd from "./ReportPaidAd";
import { formatAmount } from "../FormatAmount";
import TogglePaidAdSave from "./TogglePaidAdSave";
import ReviewPaidAdSeller from "./ReviewPaidAdSeller";

function PaidAdProductDetail({ match }) {
  const dispatch = useDispatch();
  const history = useHistory();

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
  // const { sellerAccount } = getSellerAccountState;
  const [showPaysofterOption, setShowPaysofterOption] = useState(false);

  const handlePaysofterOption = () => {
    setShowPaysofterOption(!showPaysofterOption);
  };

  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  const handleShowPhoneNumber = () => {
    setShowPhoneNumber(!showPhoneNumber);
  };

  const getPaidAdDetailState = useSelector(
    (state) => state.getPaidAdDetailState
  );
  const {
    loading,
    error,
    ads,
    sellerApiKey,
    sellerAvatarUrl,
    isSellerVerified,
    sellerRating,
    sellerReviewCount,
  } = getPaidAdDetailState;
  console.log("isSellerVerified:", isSellerVerified);
  console.log("promo_code:", ads?.promo_code);

  const [expanded, setExpanded] = useState(false);

  const handleClickMore = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    dispatch(getPaidAdDetail(match.params.id));
    dispatch(getSellerAccount());
  }, [dispatch, match]);

  const images = [ads?.image1, ads?.image2, ads?.image3].filter(Boolean);

  function formatCount(viewCount) {
    if (viewCount >= 1000000) {
      // Format as million
      return (viewCount / 1000000).toFixed(1) + "m";
    } else if (viewCount >= 1000) {
      // Format as thousand
      return (viewCount / 1000).toFixed(1) + "k";
    } else {
      return viewCount?.toString();
    }
  }

  const [reportAdModal, setReportAdModal] = useState(false);
  const handleReportAdOpen = () => {
    setReportAdModal(true);
  };
  const handleReportAdClose = () => {
    setReportAdModal(false);
  };

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

    console.log('days:', days, 'ads?.user_last_login', ads?.user_last_login)

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

  const handleClickMessageSeller = () => {
    const queryParams = {
      id: ads.id,
      image1: ads.image1,
      ad_name: ads.ad_name,
      price: ads.price,
      currency: ads?.currency,
      sellerAvatarUrl,
      seller_username: ads.seller_username,
      expiration_date: ads.expiration_date,
      ad_rating: sellerRating,
      // ad_rating: ads.ad_rating,
    };

    history.push({
      pathname: `/buyer/paid/ad/message/${ads.id}`,
      search: `?${new URLSearchParams(queryParams).toString()}`,
    });
  };

  const handleSellerShopFront = () => {
    history.push(`/seller-shop-front/${ads?.seller_username}/`);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Link to="/" className="btn btn-dark my-3">
            {" "}
            Go Back
          </Link>

          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error} </Message>
          ) : (
            <Row>
              <Col md={6}>
                {images.length > 0 ? (
                  <Carousel
                    // showArrows={true}
                    // showIndicators={true}
                    // showThumbs={true}
                    useKeyboardArrows={true}
                    // dynamicHeight={false}
                  >
                    {images.map((image, index) => (
                      <div className="slide" key={index}>
                        <Image src={image} alt={`Slide ${index + 1}`} fluid />
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  <></>
                )}
              </Col>

              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{ads?.ad_name}</h3>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <span>
                      <Button
                        variant="outline-success"
                        size="sm"
                        className="rounded"
                        disabled
                      >
                        <i>Promoted</i>
                      </Button>
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {/* <Button
                      variant="outline-primary"
                      size="sm"
                      className="py-2 rounded"
                      disabled
                    > */}
                    <ListGroup.Item>
                      Promo Code:{" "}
                      <strong>
                        <i>{ads?.promo_code}</i>
                      </strong>{" "}
                      ({ads?.discount_percentage}% Off)
                    </ListGroup.Item>
                    {/* </Button> */}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>
                            {formatAmount(ads?.price)} {ads?.currency}
                          </strong>
                          <strong>
                            {ads?.usd_price ? (
                              <span>
                                {" "}
                                / {formatAmount(ads?.usd_price)}{" "}
                                {ads?.usd_currency}{" "}
                              </span>
                            ) : (
                              <></>
                            )}{" "}
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="py-2 rounded"
                        disabled
                      >
                        <i className="fas fa-clock"></i> Expires in:{" "}
                        <PromoTimer expirationDate={ads?.expiration_date} />
                      </Button>
                    </ListGroup.Item>

                    {ads?.count_in_stock > 0 && (
                      <ListGroup.Item>
                        Quantity in Stock: {ads?.count_in_stock}
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card>
              </Col>
              <ListGroup className="py-2">
                <ListGroup.Item>
                  Ad Description:
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        expanded
                          ? ads?.description
                          : ads?.description
                              ?.split(" ")
                              .slice(0, 10)
                              .join(" ") + " ..."
                      ),
                    }}
                  />
                  {ads?.description?.split(" ").length > 10 && (
                    <Button variant="link" onClick={handleClickMore}>
                      {expanded ? "Less" : "More"}
                    </Button>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <ListGroup.Item>Seller Details</ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col md={4}>
                        <Link
                          to={`/seller-shop-front/${ads?.seller_username}/`}
                        >
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
                            {ads?.seller_username}
                          </span>
                        </Link>
                        {calculateLastSeen(ads?.user_last_login)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div>
                      <span>
                        {isSellerVerified ? (
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
                        value={sellerRating}
                        text={`${formatCount(sellerReviewCount)} reviews `}
                        color={"green"}
                      />
                    </span>

                    <span>
                      {/* {userInfo ? (
                        <Link to={`/review-list/${ads.id}`}>
                          (Seller Reviews)
                        </Link>
                      ) : (
                        <Link onClick={() => history.push("/login")}>
                          (Seller Reviews)
                        </Link>
                      )} */}
                      <ReviewPaidAdSeller adId={ads?.id} />
                    </span>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Button
                      variant="primary"
                      size="sm"
                      className="py-2 rounded"
                      onClick={handleShowPhoneNumber}
                    >
                      <i className="fa fa-phone"></i>{" "}
                      {showPhoneNumber ? "Hide" : "Show"} Contact
                    </Button>
                    <p className="mt-2">
                      {showPhoneNumber && <p>{ads?.seller_phone}</p>}
                    </p>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <span className="d-flex justify-content-between py-2">
                      <Button
                        variant="primary"
                        size="sm"
                        className="py-2 rounded"
                        onClick={handleClickMessageSeller}
                      >
                        <i className="fa fa-message"></i> Message Seller
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        className="py-2 rounded"
                        onClick={handleSellerShopFront}
                      >
                        <i className="fa fa-shopping-cart"></i> Go to Seller
                        Shopfront
                      </Button>
                    </span>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Joined since {calculateDuration(ads?.seller_joined_since)}
                  </ListGroup.Item>
                </ListGroup.Item>
                <Row className="d-flex justify-content-center py-2">
                  <Col md={6}>
                    <ListGroup.Item>
                      <Button
                        className="w-100 rounded"
                        variant="success"
                        type="button"
                        onClick={handlePaysofterOption}
                      >
                        Pay With Paysofter Promise
                      </Button>
                    </ListGroup.Item>
                  </Col>
                </Row>
              </ListGroup>
            </Row>
          )}

          <Row className="d-flex justify-content-center">
            <Col>
              {showPaysofterOption && (
                <Paysofter
                  promoCode={ads?.promo_code}
                  adId={ads?.id}
                  buyerEmail={userInfo?.email}
                  currency={ads?.currency}
                  usdPrice={ads?.usd_price}
                  amount={ads?.price}
                  sellerApiKey={sellerApiKey}
                />
              )}
            </Col>
          </Row>

          <div className="text-center mt-4 mb-2 text-muted">
            <p style={{ color: "red" }}>
              <strong>Disclaimer:</strong> Buyers are advised to exercise
              caution and conduct thorough verification when dealing with
              sellers. Ensure the authenticity of both the product and the
              seller before proceeding with any transactions.
            </p>
          </div>

          <div className="d-flex justify-content-between py-2">
            <div className=" ">
              <TogglePaidAdSave ad={ads} />
            </div>

            <div className="d-flex justify-content-end">
              <Button
                variant="danger"
                size="sm"
                className="rounded"
                onClick={handleReportAdOpen}
                // disabled
              >
                <i className="fa fa-flag"></i> Report Ad
              </Button>
            </div>
          </div>

          {/* <div className="d-flex justify-content-between py-2">
            <TogglePaidAdSave ad={ads} /> 
            <Button
              variant="danger"
              size="sm"
              className="rounded"
              onClick={handleReportAdOpen}
              // disabled
            >
              <i className="fa fa-flag"></i> Report Ad
            </Button>
          </div> */}

          <div className="d-flex justify-content-center py-2">
            <Modal show={reportAdModal} onHide={handleReportAdClose}>
              <Modal.Header closeButton>
                <Modal.Title className="text-center w-100 py-2">
                  Report Ad
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="d-flex justify-content-center py-2">
                {reportAdModal && <ReportPaidAd adId={ads?.id} />}
              </Modal.Body>
            </Modal>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default PaidAdProductDetail;
