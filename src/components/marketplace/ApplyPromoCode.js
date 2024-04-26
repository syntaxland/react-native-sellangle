// ApplyPromoCode.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Form,
  Row,
  Col,
  // ListGroup
} from "react-bootstrap";
import { applyPromoCode } from "../../actions/marketplaceSellerActions";
import Message from "../Message";
import Loader from "../Loader";
// import { formatAmount } from "../FormatAmount";

const ApplyPromoCode = ({
  adId,
  //  currency, totalPrice, promoTotalPrice
}) => {
  const dispatch = useDispatch();

  const applyPomoCodeState = useSelector((state) => state.applyPomoCodeState);
  const {
    loading,
    success,
    discountPercentage,
    // promoDiscount,
    error,
  } = applyPomoCodeState;

  const [promoCode, setPromoCode] = useState("");

  const applyCodeHandler = (e) => {
    e.preventDefault();

    const promoData = {
      ad_id: adId,
      promo_code: promoCode.trim(),
    };
    // console.log("promoData:", promoData);

    dispatch(applyPromoCode(promoData));
  };

  // console.log("promoCode:", promoCode, "adId:", adId);
  // console.log(
  //   "promoDiscount:",
  //   promoDiscount,
  //   "discountPercentage:",
  //   discountPercentage
  // );

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        // window.location.reload();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success]);

  return (
    <div>
      <Row>
        <Col>
          <div>
            {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}
            {success && (
              <Message variant="success">
                Promo code "{promoCode}" with {discountPercentage}% discount
                applied successfully.
              </Message>
            )}
          </div>

          <div>
            <Form onSubmit={applyCodeHandler}>
              <Row>
                <Col>
                  <Form.Group controlId="promoCode">
                    <Form.Control
                      type="text"
                      placeholder="Enter promo code"
                      className="rounded"
                      value={promoCode}
                      required
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Button
                    className="rounded"
                    variant="danger"
                    type="submit"
                    // size="sm"
                    disabled={
                      loading || 
                      success || 
                      promoCode === ""}
                  >
                    Apply
                  </Button>
                </Col>
              </Row>
            </Form>
            {/* <ListGroup>
              <div className="py-2">
                <ListGroup.Item>
                  Promo Discount:{" "}
                  {promoDiscount ? (
                    <span>
                      {formatAmount(promoDiscount)} {currency}(
                      {discountPercentage}%)
                    </span>
                  ) : (
                    <span>0</span>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  Final Total Amount: {" "}
                  {promoTotalPrice ? (
                    <span>
                      {formatAmount(promoTotalPrice)} {currency}
                    </span>
                  ) : (
                    <span>{formatAmount(totalPrice)} {currency}</span>
                  )}
                </ListGroup.Item>
              </div>
            </ListGroup> */}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ApplyPromoCode;
