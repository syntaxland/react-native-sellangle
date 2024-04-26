// ReactivatePaidAd.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { reactivatePaidAd } from "../../actions/marketplaceSellerActions";
import { useHistory } from "react-router-dom";
import Message from "../Message";
import Loader from "../Loader";

function ReactivatePaidAd({ ad_id }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const reactivatePaidAdState = useSelector(
    (state) => state.reactivatePaidAdState
  );
  const { success, error, loading } = reactivatePaidAdState;
  const [duration, setDuration] = useState("");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        window.location.reload();
        // history.push("/dashboard");
      }, 3000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [dispatch, success, history]);

  const adData = {
    ad_id: ad_id,
    duration: duration,
  };
  console.log("adData:", adData);

  const handleReactivatePaidAd = () => {
    dispatch(reactivatePaidAd(adData));
  };

  const DURATION_CHOICES = [
    ["1 day", "1 day (28.8 cps)"],
    ["2 days", "2 days (57.6 cps)"],
    ["3 days", "3 days (86.4 cps)"],
    ["5 days", "5 days (144.0 cps)"],
    ["1 week", "1 week (201.6 cps)"],
    ["2 weeks", "2 weeks (432.0 cps)"],
    ["1 month", "1 month (864.0 cps)"],
  ];

  return (
    <Container>
      <Row className="justify-content-center py-2">
        <Col>
          {loading && <Loader />}
          {success && (
            <Message variant="success">Ad successfully reactivated for {duration}.</Message>
          )}
          {error && <Message variant="danger">{error}</Message>}

          {/* <p className="rounded mt-2 py-1 text-center">
            <i
              className="fa fa-warning"
              style={{ fontSize: "18px", color: "yellow" }}
            ></i>{" "}
            Warning! This action will reactivate this ad and it's irreversible.
            Type <i>reactivate</i> to confirm the deactivation.
          </p> */}

          <Form>
            <Form.Group>
              {/* <Form.Label>Duration</Form.Label> */}
              <Form.Control
                as="select"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="rounded py-2 mb-2"
                required
              >
                <option value="">Select Ad Duration</option>
                {DURATION_CHOICES.map((type) => (
                  <option key={type[0]} value={type[0]}>
                    {type[1]}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>

          <Button
            variant="primary"
            onClick={handleReactivatePaidAd}
            className="rounded mt-2 text-center w-100"
            disabled={duration === ""}
          >
            Reactivate Ad
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ReactivatePaidAd;
