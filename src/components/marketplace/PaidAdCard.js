// PaidAdCard.js
import React, { useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import RatingSeller from "../RatingSeller";
// import {
//   saveProduct,
//   removeProduct,
//   updateProductSaveCount,
//   // trackProductView,
// } from "../../actions/productAction";
// import Message from "../Message";
// import Loader from "../Loader";
import PromoTimer from "../PromoTimer";
import DeletePaidAd from "./DeletePaidAd";
import DeactivatePaidAd from "./DeactivatePaidAd";
import ReactivatePaidAd from "./ReactivatePaidAd";
import TogglePaidAdSave from "./TogglePaidAdSave";
import ReviewPaidAdSeller from "./ReviewPaidAdSeller";
import { formatAmount } from "../FormatAmount";
import { formatHour } from "../formatHour";

function PaidAdCard({ product }) {
  // const dispatch = useDispatch();

  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const getPaidAdDetailState = useSelector(
    (state) => state.getPaidAdDetailState
  );
  const { sellerRating, sellerReviewCount } = getPaidAdDetailState;

  const isAdExpired = new Date(product?.expiration_date) < new Date();

  const [deleteAdModal, setDeleteModal] = useState(false);
  const handleDeleteAdOpen = () => {
    setDeleteModal(true);
  };
  const handleDeleteAdClose = () => {
    setDeleteModal(false);
  };

  const handleEditAd = () => {
    const id = product.id;
    history.push(`/edit/paid/ad/${id}`);
  };

  const [deactivateAdModal, setDeactivateAdModal] = useState(false);
  const handleDeactivateAdOpen = () => {
    setDeactivateAdModal(true);
  };
  const handleDeactivateAdClose = () => {
    setDeactivateAdModal(false);
  };

  const [reactivateAdModal, setReactivateAdModal] = useState(false);
  const handleReactivateAdOpen = () => {
    setReactivateAdModal(true);
  };
  const handleReleteAdClose = () => {
    setReactivateAdModal(false);
  };

  // const viewProductHandler = () => {
  //   if (!userInfo) {
  //     history.push("/login");
  //     // dispatch(trackProductView(userInfo.id, product.id));
  //   }
  //   dispatch(trackProductView(userInfo.id, product.id));

  //   history.push(`/paid-ad-detail/${product.id}`);
  // };

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

  function formatNumber(number, decimalPlaces = 2) {
    const formattedNumber = parseFloat(number).toFixed(decimalPlaces);
    const parts = formattedNumber.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  return (
    <Card className="my-3 p-3 rounded">
      {/* {productMessages.productSaveSuccess && (
        <Message variant="success">Item added to favorites.</Message>
      )}
      {productMessages.productRemoveSuccess && (
        <Message variant="danger">Item removed from favorites.</Message>
      )} */}
      {/* {productMessages.productSaveError && (
        <Message variant="danger">{productMessages.productSaveError}</Message>
      )} */}
      {/* {productMessages.productRemoveError && (
        <Message variant="danger">{productMessages.productRemoveError}</Message>
      )} */}

      {/* {productLoading.productSaveLoading && <Loader />} */}
      {/* {productLoading.productRemoveLoading && <Loader />} */}

      <Link>
        <Card.Img src={product.image1} />
      </Link>

      <Card.Body>
        <div className="d-flex justify-content-between">
          <Link>
            <Card.Title as="div">
              <strong>{product.ad_name}</strong>
            </Card.Title>
          </Link>

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
        </div>

        <div className="d-flex justify-content-between">
          <div as="div">
            <div className="py-2">
              <RatingSeller
                value={sellerRating}
                text={`${formatCount(sellerReviewCount)} reviews `}
                color={"green"}
              />

              {/* {userInfo ? (
                <Link to={`/review-list/${product?.id}`}>(Seller Ratings)</Link>
              ) : (
                <Link onClick={() => history.push("/login")}>
                  (Seller Ratings)
                </Link>
              )} */}
              <ReviewPaidAdSeller adId={product?.id} />
            </div>
          </div>

          <Card.Text as="div" className="py-2">
            <span className="text-right">
              <i className="fas fa-eye"></i>{" "}
              {formatCount(product?.ad_view_count)} views
            </span>
          </Card.Text>
        </div>

        <div className="d-flex justify-content-between py-2">
          <Card.Text as="h5" className="py-2">
            <span>
              {formatNumber(product?.price)} {product?.currency}{" "}
              {product?.usd_price ? (
                <span>
                  {" "}
                  / {product?.usd_price} {product?.usd_currency}{" "}
                </span>
              ) : (
                <></>
              )}{" "}
              {product?.is_price_negotiable ? <i>(Negotiable)</i> : <></>}
            </span>
          </Card.Text>

          <span className="py-2">
            {product?.promo_code ? (
              <Button
                variant="outline-primary"
                size="sm"
                className="py-2 rounded"
                disabled
              >
                <i>
                  Promo Code: {product?.promo_code}{" "}
                  {product?.discount_percentage}% Off
                </i>
              </Button>
            ) : (
              <></>
            )}
          </span>
        </div>

        <div className="d-flex justify-content-between">
          <span className="py-2">
            <Button
              variant="outline-danger"
              size="sm"
              className="py-2 rounded"
              disabled
            >
              Expires in:{" "}
              <PromoTimer expirationDate={product?.expiration_date} />
            </Button>
          </span>

          <div>
            <TogglePaidAdSave ad={product} />
          </div>

          {/* <span className="py-2">
            <Button
              onClick={toggleFavoriteHandler}
              className="py-2 rounded"
              type="button"
              variant={productSaved ? "danger" : "outline-danger"}
            >
              <div className="mt-auto">
                <i
                  className={productSaved ? "fas fa-heart" : "far fa-heart"}
                ></i>{" "}
                {productSaved ? "Saved" : "Save"}{" "}
                <span className="text-muted">({formatCount(totalSaves)})</span>
              </div>
            </Button>
          </span> */}
        </div>

        <div className="d-flex justify-content-between py-2">
          <span className="py-2">
            <Button
              // disabled
              variant="primary"
              size="sm"
              className="py-2 rounded"
              onClick={handleEditAd}
            >
              Edit
            </Button>
          </span>

          <span className="py-2">
            {isAdExpired ? (
              <Button
                variant="primary"
                size="sm"
                className="py-2 rounded"
                onClick={handleReactivateAdOpen}
              >
                Reactivate
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                className="py-2 rounded"
                onClick={handleDeactivateAdOpen}
              >
                Deactivate
              </Button>
            )}
          </span>

          <span className="py-2">
            <Button
              variant="danger"
              size="sm"
              className="py-2 rounded"
              onClick={handleDeleteAdOpen}
            >
              Delete
            </Button>
          </span>
        </div>
        <div className="py-2 text-center">
          <Button
            variant="outline-transparent"
            size="sm"
            className="py-2 rounded"
            disabled
          >
            Due Ad Charges: {formatAmount(product?.ad_charges)} CPS{' '} 
            ({formatHour(product?.ad_charge_hours)} hours) 
          </Button>
        </div>

        <div className="d-flex justify-content-center">
          <span className="py-2">
            <Button
              variant="outline-transparent"
              size="sm"
              className="py-2 rounded"
              disabled
            >
              <i className="fas fa-map-marker-alt"></i> {product?.city}{" "}
              {product?.state_province}, {product?.country}.
            </Button>
          </span>
        </div>
      </Card.Body>
      <Modal show={deleteAdModal} onHide={handleDeleteAdClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center w-100 py-2">
            Delete Ad
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deleteAdModal && <DeletePaidAd ad_id={product?.id} />}
        </Modal.Body>
      </Modal>

      <Modal show={deactivateAdModal} onHide={handleDeactivateAdClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center w-100 py-2">
            Deactivate Ad
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deactivateAdModal && <DeactivatePaidAd ad_id={product?.id} />}
        </Modal.Body>
      </Modal>

      <Modal show={reactivateAdModal} onHide={handleReleteAdClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center w-100 py-2">
            Reactivate Ad
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {reactivateAdModal && <ReactivatePaidAd ad_id={product?.id} />}
        </Modal.Body>
      </Modal>
    </Card>
  );
}

export default PaidAdCard;
