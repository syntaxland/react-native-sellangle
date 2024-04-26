// Paysofter.js
import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import PaysofterButton from "./PaysofterButton";
import ApplyPromoCode from "../marketplace/ApplyPromoCode";
import LoaderPaysofter from "../LoaderPaysofter";
import Message from "../Message";
import "./Paysofter.css";
import { formatAmount } from "../FormatAmount";

function Paysofter({
  adId,
  promoCode,
  buyerEmail, 
  amount,
  sellerApiKey,
  currency,
  usdPrice,
  reference,
  ad_id,
  userEmail,
  adsPrice,
  finalItemsPrice,
}) {
  // const paymentCreate = useSelector((state) => state.paymentCreate);
  // const { loading, error } = paymentCreate;

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
  const { ads, loading, error } = getPaidAdDetailState;

  const applyPomoCodeState = useSelector((state) => state.applyPomoCodeState);
  const { discountPercentage, promoDiscount } = applyPomoCodeState;

  console.log("promoCode:", promoCode, "adId:", adId);
  console.log(
    "promoDiscount:",
    promoDiscount,
    "discountPercentage:",
    discountPercentage
  );

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const createdAt = new Date().toISOString();
  const totalPrice = ads?.price;
  const promoTotalPrice = totalPrice - promoDiscount;

  const paymentData = {
    reference: reference,
    ad_id: ad_id,
    amount: totalPrice,
    email: userEmail,

    ads_amount: adsPrice,
    final_ads_amount: finalItemsPrice,
    promo_code_discount_amount: promoDiscount,
    promo_code_discount_percentage: discountPercentage,
    final_total_amount: promoTotalPrice,
  };

  return (
    <>
      <Row>
        <div className="d-flex justify-content-center ">
          <Col md={8}>
            <h1 className="text-center py-3">Paysofter Promise Option</h1>
            {loading && <LoaderPaysofter />}
            {error && <Message variant="danger">{error}</Message>}
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col md={4}>
                    <img
                      src={ads?.image1}
                      alt={ads?.ad_name}
                      className="img-fluid"
                    />
                  </Col>
                  <Col md={8}>
                    <p>{ads?.ad_name}</p>
                    {/* <p>
                        {ads?.qty} x NGN {ads?.ad_price} = NGN{" "}
                        {ads?.qty * ads?.ad_price}
                      </p> */}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                Total Amount: {formatAmount(ads?.price)} {currency}
              </ListGroup.Item>

              {promoCode && (
                <div className="py-2">
                  <ListGroup.Item>
                    <ApplyPromoCode
                      adId={adId}
                      // promoCode={promoCode}
                      // currency={currency}
                      // totalPrice={totalPrice}
                      // promoTotalPrice={promoTotalPrice}
                    />
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Promo Discount Amount:{" "}
                    {promoDiscount ? (
                      <span>
                        {currency} {formatAmount(promoDiscount)} (
                        {discountPercentage}% )
                      </span>
                    ) : (
                      <span>0</span>
                    )}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Final Total Amount: {currency}{" "}
                    {promoTotalPrice ? (
                      <span>
                        {formatAmount(promoTotalPrice)} 
                      </span>
                    ) : (
                      <span>{formatAmount(totalPrice)}</span>
                    )}
                  </ListGroup.Item>
                </div>
              )}

              <ListGroup.Item>Timestamp: {createdAt}</ListGroup.Item>
            </ListGroup>

            <div>
              <PaysofterButton
                showPaymentModal={showPaymentModal}
                setShowPaymentModal={setShowPaymentModal}
                paymentData={paymentData}
                reference={reference}
                buyerEmail={buyerEmail}
                currency={currency}
                usdPrice={usdPrice}
                amount={promoTotalPrice}
                sellerApiKey={sellerApiKey}
              />
            </div>
          </Col>
        </div>
      </Row>
    </>
  );
}

export default Paysofter;
