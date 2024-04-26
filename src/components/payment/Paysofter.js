// Paysofter.js
import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup } from "react-bootstrap";
// import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
// import {
//   createPayment,
//   createPaysofterPayment,
// } from "../../actions/paymentActions";
import PaysofterButton from "./PaysofterButton"; 
// import ApplyPromoCode from "../ApplyPromoCode";
import LoaderPaysofter from "../LoaderPaysofter"; 
import Message from "../Message";
import "./Paysofter.css";
import {formatAmount} from "../FormatAmount";

function Paysofter({
  reference,
  order_id,
  totalPrice,
  taxPrice,
  userEmail,
  shippingPrice,
  itemsPrice,
  finalItemsPrice,
  promoDiscount,
  discountPercentage,
  promoTotalPrice,
  shipmentSave,
  paysofterPublicKey,
}) {
  // const history = useHistory();
  // const dispatch = useDispatch();

  const paymentCreate = useSelector((state) => state.paymentCreate);
  const { loading, error } = paymentCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  // const paysofterPayment = useSelector((state) => state.paysofterPayment);
  // const {
  //   // loading: paysofterLoading,
  //   success: paysofterSuccess,
  //   error: paysofterError,
  // } = paysofterPayment;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // const [cardType, setCardType] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // const [paymentDetails, setPaymentDetails] = useState({
  //   cardNumber: "",
  //   // expirationMonth: "",
  //   // expirationYear: "",
  //   expirationMonthYear: null,
  //   expirationMonth: null,
  //   expirationYear: null,
  //   cvv: "",
  // });

  // const [
  //   isExpirationMonthYearSelected,
  //   setIsExpirationMonthYearSelected,
  // ] = useState(false);

  // const handlePaymentDetailsChange = (e) => {
  //   const { name, value } = e.target;

  //   // Detect card type based on the card number prefix
  //   let detectedCardType = "";
  //   if (/^4/.test(value)) {
  //     detectedCardType = "Visa";
  //   } else if (/^5[1-5]/.test(value)) {
  //     detectedCardType = "Mastercard";
  //   }
  //   setCardType(detectedCardType);
  //   setPaymentDetails({ ...paymentDetails, [name]: value });
  // };

  // const isFormValid = () => {
  //   return (
  //     isExpirationMonthYearSelected &&
  //     paymentDetails.cardNumber &&
  //     paymentDetails.cvv
  //   );
  // };

  // useEffect(() => {
  //   if (success && paysofterSuccess) {
  //     // dispatch(clearCart());
  //     history.push("/dashboard");
  //     window.location.reload();
  //   }
  // }, [success, paysofterSuccess, history, dispatch]);

  const createdAt = new Date().toISOString();

  // const onSuccess = (reference) => {
  //   handlePayment(reference);
  //   handlePaysofterPayment(reference);
  //   dispatch(clearCart());
  //   history.push("/");
  // };

  // const onClose = () => {
  //   console.log("Payment closed.");
  //   history.push("/");
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await handlePaysofterPayment(reference);
  //     await handlePayment(reference);
  //     dispatch(clearCart());
  //     console.log(
  //       "handlePaysofterPayment and handlePayment dispatched and cart cleared!"
  //     );
  //     // history.push("/");
  //   } catch (error) {
  //     console.log("Error handling payment:", error);
  //   }
  // };

  // const publicApiKey = "test_api_key_fspqdxm4mekds6klgjwlw890f87y3e3hlo0b2vxq25vi9hgtnz";

  // const handlePaysofterPayment = () => {
  //   try {
  //     let paysofterPaymentData = {
  //       payment_id: reference,
  //       email: userEmail,
  //       amount: promoTotalPrice,
  //       public_api_key: publicApiKey,
  //       created_at: createdAt,
  //       card_number: paymentDetails.cardNumber,
  //       expiration_month_year: paymentDetails.expirationMonthYear,
  //       // expiration_month: paymentDetails.expirationMonth,
  //       // expiration_year: paymentDetails.expirationYear,
  //       cvv: paymentDetails.cvv,
  //     };
  //     dispatch(createPaysofterPayment(paysofterPaymentData));
  //     // console.log("paysofterPaymentData dispatched", paysofterPaymentData);
  //   } catch (error) {
  //     console.log("Error handling payment:", error);
  //   }
  // };

  // const handlePayment = (reference) => {
  //   try {
  //     let paymentData = {
  //       reference: reference,
  //       order_id: order_id,
  //       amount: totalPrice,
  //       email: userEmail,

  //       items_amount: itemsPrice,
  //       final_items_amount: finalItemsPrice,
  //       promo_code_discount_amount: promoDiscount,
  //       promo_code_discount_percentage: discountPercentage,
  //       final_total_amount: promoTotalPrice,
  //     };

  //     dispatch(createPayment(paymentData));
  //     console.log("paymentData dispatched", paymentData);
  //   } catch (error) {
  //     console.log("Error handling payment:", error);
  //   }
  // };

  // const paysofterPaymentData = {
  //   payment_id: reference,
  //   email: userEmail,
  //   amount: promoTotalPrice,
  //   public_api_key: publicApiKey,
  //   created_at: createdAt,

  //   card_number: paymentDetails.cardNumber,
  //   expiration_month_year: paymentDetails.expirationMonthYear,
  //   cvv: paymentDetails.cvv,
  // };
  // console.log("paysofterPaymentData", paysofterPaymentData);

  const paymentData = {
    reference: reference,
    order_id: order_id,
    amount: totalPrice,
    email: userEmail,

    items_amount: itemsPrice,
    final_items_amount: finalItemsPrice,
    promo_code_discount_amount: promoDiscount,
    promo_code_discount_percentage: discountPercentage,
    final_total_amount: promoTotalPrice,
  };

  return (
    <>
      <Row>
        <div className="d-flex justify-content-center ">
          <Col>
            <h1 className="text-center py-3">Paysofter Payment Option</h1>
            {loading && <LoaderPaysofter />}
            {error && <Message variant="danger">{error}</Message>}
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={4}>
                      <img 
                        src={item.image}
                        alt={item.name}
                        className="img-fluid"
                      />
                    </Col>
                    <Col md={8}>
                      <p>{item.name}</p>
                      <p>
                        {item.qty} x NGN {item.price} = NGN{" "}
                        {item.qty * item.price}
                      </p>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>Order ID: {order_id}</ListGroup.Item>
              <ListGroup.Item>
                Shipping Address: {shipmentSave.address}, {shipmentSave.city},{" "}
                {shipmentSave.country}
              </ListGroup.Item>
              <ListGroup.Item>
                Shipping Cost: NGN{" "}
                {shippingPrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </ListGroup.Item>
              <ListGroup.Item>
                Tax: NGN{" "}
                {taxPrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </ListGroup.Item>
              <ListGroup.Item>
                Total Amount: NGN{" "}
                {formatAmount(totalPrice)
                
                // .toLocaleString(undefined, {
                //   minimumFractionDigits: 2,
                //   maximumFractionDigits: 2,
                // })
                
                }
              </ListGroup.Item>

              <ListGroup.Item>
                Promo Discount: NGN{" "}
                {promoDiscount ? (
                  <span>
                    {promoDiscount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    ({discountPercentage}%)
                  </span>
                ) : (
                  <span>0</span>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                Final Total Amount: NGN{" "}
                {promoTotalPrice ? (
                  <span>
                    {formatAmount(promoTotalPrice)
                    
                    // .toLocaleString(undefined, {
                    //   minimumFractionDigits: 2,
                    //   maximumFractionDigits: 2,
                    // })
                    
                    }
                  </span>
                ) : (
                  <span>
                    {totalPrice.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                )}
              </ListGroup.Item>
              <ListGroup.Item>Timestamp: {createdAt}</ListGroup.Item>
            </ListGroup>
            <div className="text-center py-2">
              {/* <ApplyPromoCode order_id={order_id} /> */}
            </div>

            <div>
              <PaysofterButton
                showPaymentModal={showPaymentModal}
                setShowPaymentModal={setShowPaymentModal}
                paymentData={paymentData}
                reference={reference}
                userEmail={userEmail}
                promoTotalPrice={promoTotalPrice}
                publicApiKey={paysofterPublicKey} 
              />
            </div>
          </Col>
        </div>
      </Row>
    </>
  );
}

export default Paysofter;
