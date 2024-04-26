// AllFreeAdCard.js
import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RatingSeller from "../RatingSeller";
// import {
//   saveProduct,
//   removeProduct,
//   updateProductSaveCount,
//   // trackProductView,
// } from "../../actions/productAction"; 
import {
  getSellerAccount,
  getFreeAdDetail,
  // toggleFreeAdSave,
  trackFreeAdView,
  //   getUserFreeAdsViews,
  // getUserSavedFreeAds,
} from "../../actions/marketplaceSellerActions";
// import { getFreeAdDetail } from "../../actions/marketplaceSellerActions";
// import Message from "../Message";
// import Loader from "../Loader";
import PromoTimer from "../PromoTimer";
import ReportFreeAd from "./ReportFreeAd";
import ToggleFreeAdSave from "./ToggleFreeAdSave";
import ReviewFreeAdSeller from "./ReviewFreeAdSeller";
import { formatAmount } from "../FormatAmount";

function AllFreeAdCard({ product }) {
  const dispatch = useDispatch();

  // const [toggleSuccess, setToggleSuccess] = useState(false);
  // const onToggleSuccess = () => {
  //   setToggleSuccess(true);
  // };

  const getFreeAdDetailState = useSelector(
    (state) => state.getFreeAdDetailState
  );
  const {
    sellerAvatarUrl,
    // isSellerVerified,
    sellerRating,
    sellerReviewCount,
  } = getFreeAdDetailState;

  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [reportAdModal, setReportAdModal] = useState(false);

  // const [reviewSellerModal, setReviewSellerModal] = useState(false);
  // const handleReviewSellerOpen = () => {
  //   setReviewSellerModal(true);
  // };
  // const handleReviewSellerClose = () => {
  //   setReviewSellerModal(false);
  // };

  const handleReportAdOpen = () => {
    if (!userInfo) {
      history.push("/login");
    } else {
      setReportAdModal(true);
    }
  };

  const handleReportAdClose = () => {
    setReportAdModal(false);
  };

  useEffect(() => {
    const pk = product.id;
    if (userInfo) {
      dispatch(getSellerAccount());
      dispatch(getFreeAdDetail(pk));
    }
  }, [dispatch, userInfo, product.id]);

  const adData = {
    ad_id: product.id,
  };

  const viewProductHandler = () => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(trackFreeAdView(adData));
      history.push(`/free-ad-detail/${product.id}`);
    }
  };

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

  const handleClickMessageSeller = () => {
    if (!userInfo) {
      history.push("/login");
    } else {
      const queryParams = {
        id: product.id,
        image1: product.image1,
        ad_name: product.ad_name,
        price: product.price,
        currency: product?.currency,
        sellerAvatarUrl,
        seller_username: product.seller_username,
        expiration_date: product.expiration_date,
        ad_rating: sellerRating,
        // ad_rating: product.ad_rating,
      };

      history.push({
        pathname: `/buyer/free/ad/message/${product.id}`,
        search: `?${new URLSearchParams(queryParams).toString()}`,
      });
    }
  };

  return (
    <Row className="d-flex justify-content-center">
      <Col>
        <Card className="my-3 p-3 rounded">
          <Link onClick={viewProductHandler}>
            <Card.Img src={product.image1} />
          </Link>

          <Card.Body>
            <div className="d-flex justify-content-between py-2">
              <Link onClick={viewProductHandler}>
                <Card.Title as="div">
                  <strong>{product.ad_name}</strong>
                </Card.Title>
              </Link>

              {/* <div>
                <span>
                  {isSellerVerified ? (
                    <>
                      <Button
                        variant="outline-success"
                        size="sm"
                        className="rounded"
                        disabled
                      >
                        <i className="fas fa-user-check"></i> <i>Verified ID</i>{" "}
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
                        <i className="fas fa-user"></i> <i>ID Not Verified</i>{" "}
                        <i
                          // className="fas fa-check-circle"
                          style={{ fontSize: "18px", color: "red" }}
                        ></i>
                      </Button>
                    </>
                  )}
                </span>
              </div> */}
            </div>

            <div className="d-flex justify-content-between">
              <div>
                <div className="py-2">
                  <RatingSeller
                    value={sellerRating}
                    text={`${formatCount(sellerReviewCount)}  reviews `}
                    color={"green"}
                  />

                  {/* {userInfo ? (
                    <>
                      <Link onClick={handleReviewSellerOpen}>
                        (Seller Reviews)
                      </Link>
                    </>
                  ) : (
                    <Link onClick={() => history.push("/login")}>
                      (Seller Reviews)
                    </Link>
                  )} */}

                  <ReviewFreeAdSeller adId={product?.id}/>
                </div>
              </div>

              <Card.Text as="div" className="py-2">
                <span className="text-right" onClick={viewProductHandler}>
                  <i className="fas fa-eye"></i>{" "}
                  {formatCount(product?.ad_view_count)} views
                </span>
              </Card.Text>
            </div>

            <div className="d-flex justify-content-between py-2">
              <Card.Text as="h5" className="py-2">
                <span>
                  {formatAmount(product?.price)} {product?.currency}{" "}
                  {/* {product?.usd_price ? (
                <span> / {product?.usd_price} USD </span> 
              ) : (
                <></>
              )} */}
                  {product?.is_price_negotiable ? <i>(Negotiable)</i> : <></>}
                </span>
              </Card.Text>
            </div>

            <div className="d-flex justify-content-between">
              <span className="py-2">
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="py-2 rounded"
                  disabled
                >
                  <i className="fas fa-clock"></i> Expires in:{" "}
                  <PromoTimer expirationDate={product?.expiration_date} />
                </Button>
              </span>
            </div>

            <div className="d-flex justify-content-between py-2">
              <span className="py-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="py-2 rounded"
                  onClick={handleClickMessageSeller}
                >
                  <i className="fa fa-message"></i> Message Seller
                </Button>
              </span>

              <div>
                <ToggleFreeAdSave ad={product} /> 
              </div>
              
            </div>

            <div className="d-flex justify-content-between py-2">
              <span>
                <Button
                  variant="outline-transparent"
                  size="sm"
                  className="py-2 rounded"
                  disabled
                >
                  <i className="fas fa-map-marker-alt"></i>{" "}
                  {product?.city ? product?.city : ""}{" "}
                  {product?.state_province ? product?.state_province : ""},{" "}
                  {product?.country ? product?.country : ""}.
                </Button>
              </span>

              <span>
                <Button
                  variant="danger"
                  size="sm"
                  className="rounded py-2"
                  onClick={handleReportAdOpen}
                  // disabled
                >
                  <i className="fa fa-flag"></i> Report Ad
                </Button>
              </span>
            </div>

            <div className="d-flex justify-content-center py-2">
              <Modal show={reportAdModal} onHide={handleReportAdClose}>
                <Modal.Header closeButton>
                  <Modal.Title className="text-center w-100 py-2">
                    Report Ad
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="py-2 d-flex justify-content-center">
                  {reportAdModal && <ReportFreeAd adId={product?.id} />}
                </Modal.Body>
              </Modal>
            </div>

            {/* <Modal show={reviewSellerModal} onHide={handleReviewSellerClose}>
              <Modal.Header closeButton>
                <Modal.Title className="text-center w-100 py-2">
                  Seller Reviews
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="py-2 d-flex justify-content-center">
                {reviewSellerModal && <ReviewFreeAdSeller adId={product?.id} />}
              </Modal.Body>
            </Modal> */}
            
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default AllFreeAdCard;
