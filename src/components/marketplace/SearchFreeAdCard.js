// SearchFreeAdCard.js
import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RatingSeller from "../RatingSeller";
import {
  getSellerAccount,
  getFreeAdDetail,
  trackFreeAdView,
} from "../../actions/marketplaceSellerActions";
import PromoTimer from "../PromoTimer";
import ReportFreeAd from "./ReportFreeAd";
import ToggleFreeAdSave from "./ToggleFreeAdSave";
import ReviewFreeAdSeller from "./ReviewFreeAdSeller";

function SearchFreeAdCard({ freeSearchAd }) {
  console.log("free Ads Card", freeSearchAd);

  const dispatch = useDispatch();

  const getFreeAdDetailState = useSelector(
    (state) => state.getFreeAdDetailState
  );
  const {
    sellerAvatarUrl,
    sellerRating,
    sellerReviewCount,
  } = getFreeAdDetailState;

  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [reportAdModal, setReportAdModal] = useState(false);
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
    const pk = freeSearchAd.id;
    if (userInfo) {
      dispatch(getSellerAccount());
      dispatch(getFreeAdDetail(pk));
    }
  }, [dispatch, userInfo, freeSearchAd.id]);

  const adData = {
    ad_id: freeSearchAd.id,
  };

  const viewProductHandler = () => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(trackFreeAdView(adData));
      history.push(`/free-ad-detail/${freeSearchAd.id}`);
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
        id: freeSearchAd.id,
        image1: freeSearchAd.image1,
        ad_name: freeSearchAd.ad_name,
        price: freeSearchAd.price,
        currency: freeSearchAd?.currency,
        sellerAvatarUrl,
        seller_username: freeSearchAd.seller_username,
        expiration_date: freeSearchAd.expiration_date,
        ad_rating: sellerRating,
        // ad_rating: freeSearchAd.ad_rating,
      };

      history.push({
        pathname: `/buyer/free/ad/message/${freeSearchAd.id}`,
        search: `?${new URLSearchParams(queryParams).toString()}`,
      });
    }
  };

  function formatNumber(number, decimalPlaces = 2) {
    const formattedNumber = parseFloat(number).toFixed(decimalPlaces);
    const parts = formattedNumber.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  return (
    <Row>
      <Col>
        <Card className="my-3 p-3 rounded">
          

          <Link onClick={viewProductHandler}>
            <Card.Img src={freeSearchAd.image1} />
          </Link>

          <Card.Body>
            <div className="d-flex justify-content-between">
              <Link onClick={viewProductHandler}>
                <Card.Title as="div">
                  <strong>{freeSearchAd.ad_name}</strong>
                </Card.Title>
              </Link>
              {/* <div>
            <span>
              {sellerAccount?.is_seller_verified ? (
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
                    <i>ID Not Verified</i>{" "}
                    <i
                      // className="fas fa-times"
                      style={{ fontSize: "18px", color: "red" }}
                    ></i>
                  </Button>
                </>
              )}
            </span>
          </div> */}
            </div>

            <div className="d-flex justify-content-between">
              <div as="div">
                <div className="py-2">
                  <RatingSeller
                    value={sellerRating}
                    text={`${formatCount(
                      sellerReviewCount
                    )} reviews `}
                    color={"green"}
                  />

                  {/* {userInfo ? (
                <Link to={`/review-list/${freeSearchAd.id}`}>(Seller Reviews)</Link>
              ) : (
                <Link onClick={() => history.push("/login")}>
                  (Seller Reviews)
                </Link>
              )} */}
                  <ReviewFreeAdSeller adId={freeSearchAd?.id} />
                </div>
              </div>

              <Card.Text as="div" className="py-2">
                <span className="text-right" onClick={viewProductHandler}>
                  <i className="fas fa-eye"></i>{" "}
                  {formatCount(freeSearchAd?.ad_view_count)} views
                </span>
              </Card.Text>
            </div>

            <div className="d-flex justify-content-between py-2">
              <Card.Text as="h5" className="py-2">
                <span>
                  {formatNumber(freeSearchAd?.price)} {freeSearchAd?.currency}{" "}
                  {/* {freeSearchAd?.usd_price ? <span> / {freeSearchAd?.usd_price} USD </span> : <></>}{" "} */}
                  {freeSearchAd?.is_price_negotiable ? (
                    <i>(Negotiable)</i>
                  ) : (
                    <></>
                  )}
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
                  <PromoTimer expirationDate={freeSearchAd?.expiration_date} />
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

              <span className="py-2">
                <div>
                  <ToggleFreeAdSave ad={freeSearchAd} />
                </div>
                {/* <Button
              onClick={toggleFavoriteHandler} 
              className="py-2 rounded"
              type="button"
              variant={freeSearchAdSaved ? "danger" : "outline-danger"}
            >
              <div className="mt-auto">
                <i
                  className={freeSearchAdSaved ? "fas fa-heart" : "far fa-heart"}
                ></i>{" "}
                {freeSearchAdSaved ? "Saved" : "Save"}{" "}
                <span className="text-muted">({formatCount(totalSaves)})</span>
              </div>
            </Button>  */}
              </span>
            </div>
            <div className="d-flex justify-content-between py-2">
              <span>
                <Button
                  variant="outline-transparent"
                  size="sm"
                  className="py-2 rounded"
                  disabled
                >
                  <i className="fas fa-map-marker-alt"></i> {freeSearchAd?.city}{" "}
                  {freeSearchAd?.state_province}, {freeSearchAd?.country}.
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
          </Card.Body>
        </Card>
        <div className="d-flex justify-content-center">
          <Modal show={reportAdModal} onHide={handleReportAdClose}>
            <Modal.Header closeButton>
              <Modal.Title className="text-center w-100 py-2">
                Report Ad
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center py-2">
              {reportAdModal && <ReportFreeAd adId={freeSearchAd?.id} />}
            </Modal.Body>
          </Modal>
        </div>
      </Col>
    </Row>
  );
}

export default SearchFreeAdCard;
