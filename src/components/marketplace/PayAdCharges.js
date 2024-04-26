// PayAdCharges.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { payAdCharges } from "../../actions/marketplaceSellerActions";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Message from "../Message";
import Loader from "../Loader";
import { formatAmount } from "../FormatAmount";

function PayAdCharges({ totalAdCharges }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  const payAdChargesState = useSelector(
    (state) => state.payAdChargesState
  );
  const { success, error, loading } = payAdChargesState;

  // const [password, setPassword] = useState("");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        window.location.reload();
        // history.push("/dashboard");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, history]);

  const adData = {
    // password: password,
    ad_charges_amt: totalAdCharges,
  };
  console.log("totalAdCharges:", totalAdCharges);

  const handlePayAdCharges = () => {
    dispatch(payAdCharges(adData));
  };

  return (
    <Container>
      <Row className="justify-content-center py-2">
        <Col>
          {/* <h2 className="mb-4">Seller Confirm Promises</h2> */}
          {loading && <Loader />}
          {success && (
            <Message variant="success">Ad charges paid successfully.</Message>
          )}
          {error && <Message variant="danger">{error}</Message>}

          <p className="rounded mt-2 py-1 text-center">
            <i
              className="fa fa-warning text-warning"
              style={{
                fontSize: "18px",
                //  color: "yellow"
              }}
            ></i>{" "}
            Warning! This action will deduct the ad charges of {formatAmount(totalAdCharges)}{" "}
            from your CPS wallet.
          </p>

          <Form>
            {/* <Form.Group>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="rounded mt-2"
              />
            </Form.Group> */}
            <Button
              variant="primary"
              onClick={handlePayAdCharges}
              className="rounded mt-2 text-center w-100"
            >
              Pay Now 
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default PayAdCharges;
