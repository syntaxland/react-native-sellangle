// // Paystack.js
import React, { useEffect, useState } from "react";
import { Button, Row, Col, ListGroup } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import { clearCart } from "../../actions/cartActions";
import { createPayment } from "../../actions/paymentActions";
// import ApplyPromoCode from "../ApplyPromoCode";

const API_URL = process.env.REACT_APP_API_URL; 

function Paystack() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const history = useHistory();
  const dispatch = useDispatch();

  const [paystackPublicKey, setPaystackPublicKey] = useState("");
  const [reference, setReference] = useState("");
  const userEmail = userInfo.email;

  const location = useLocation();
  const { pathname } = location;
  const order_id = pathname.split("/payment/")[1];

  const paymentCreate = useSelector((state) => state.paymentCreate);
  const { loading, success, error } = paymentCreate;

  const applyPomoCodeState = useSelector((state) => state.applyPomoCodeState);
  const { promoDiscount, discountPercentage } = applyPomoCodeState;
  console.log(
    "Paystack promoDiscount:",
    promoDiscount,
    "discountPercentage:",
    discountPercentage
  );

  const shipmentSave = useSelector((state) => state.shipmentSave);
  // const { loading: shipmentLoading, error: shipmentError } = shipmentSave;
  // const { address, city, country } = useSelector(
  //   (state) => state.shipmentSave
  // );
  console.log("shipmentSave:", shipmentSave);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (success) {
      dispatch(clearCart());
      history.push("/dashboard");
      window.location.reload();
    }
  }, [dispatch, success, history]);

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  const shippingPrice = cartItems.length > 0 ? 1000 : 0;
  const taxPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price * 0.1,
    0
  );

  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const promoTotalPrice = totalPrice - promoDiscount;
  console.log(
    "totalPrice:",
    totalPrice,
    "promoDiscount:",
    promoDiscount,
    "promoTotalPrice:",
    promoTotalPrice
  );

  const finalItemsPrice = itemsPrice - promoDiscount;
  console.log("finalItemsPrice:", finalItemsPrice);

  const createdAt = new Date().toISOString();

  useEffect(() => {
    const getPaymentDetails = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/get-payment-details/`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.access}`,
            },
          }
        );
        setPaystackPublicKey(response.data.paystackPublicKey);
        setReference(response.data.reference);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchData = async () => {
      await getPaymentDetails();
    };
    fetchData();
  }, [userInfo.access]);

  const onSuccess = (reference) => {
    handlePayment(reference);
    dispatch(clearCart());
    history.push("/");
  };

  const onClose = () => {
    console.log("Payment closed.");
    history.push("/payment");
  };

  const handlePayment = async (reference) => {
    try {
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

      const response = await dispatch(createPayment(paymentData));

      if (response && response.reference) {
        // Save the order_id, reference, amount, and email to backend
        await axios.post(`${API_URL}/api/create-payment/`, paymentData);
      }
    } catch (error) {
      console.log("Error handling payment:", error);
    }
  };

  const paymentObject = {
    publicKey: paystackPublicKey,
    email: userEmail,
    reference: reference,
    amount: promoTotalPrice * 100,
    currency: "NGN",
    onSuccess: onSuccess,
    onClose: onClose,
  };

  return (
    <>
      <Row>
        <div className="d-flex justify-content-center ">
          <Col>
            <h1 className="text-center py-3">Paystack Payment Option</h1>
            {loading && <Loader />}
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
                {totalPrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
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
                  <span>NGN 0</span>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                Final Total Amount: NGN{" "}
                {promoTotalPrice ? (
                  <span>
                    {promoTotalPrice.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
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
            <div className="text-center py-2">
              <PaystackButton {...paymentObject}>
                <Button className="w-100 rounded" variant="dark">
                  Pay Now
                </Button>
              </PaystackButton>
            </div>
          </Col>
        </div>
      </Row>
    </>
  );
}

export default Paystack;
