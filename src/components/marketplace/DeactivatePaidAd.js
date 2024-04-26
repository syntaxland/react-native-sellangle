// DeactivatePaidAd.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { deactivatePaidAd } from "../../actions/marketplaceSellerActions";
import { useHistory } from "react-router-dom";
import Message from "../Message";
import Loader from "../Loader";

function DeactivatePaidAd({ ad_id }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const deactivatePaidAdState = useSelector((state) => state.deactivatePaidAdState);
  const { success, error, loading } = deactivatePaidAdState;
  const [keyword, setKeyword] = useState("");

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
    keyword: keyword,
  };
  console.log("adData:", adData);

  const handleDeactivatePaidAd = () => {
    dispatch(deactivatePaidAd(adData));
  };

  return (
    <Container>
      <Row className="justify-content-center py-2">
        <Col>
          {loading && <Loader />}
          {success && (
            <Message variant="success">Ad deactivate successfully.</Message>
          )}
          {error && <Message variant="danger">{error}</Message>}

          <p className="rounded mt-2 py-1 text-center">
            <i
              className="fa fa-warning"
              style={{ fontSize: "18px", color: "yellow" }}
            ></i>{" "}
            Warning! This action will deactivate this ad. Type{" "}
            <i>deactivate</i> to confirm the deactivation.
          </p>

          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="deactivate"
                className="rounded mt-2"
                required
                maxLength={10}
              />
            </Form.Group>
          </Form>

          <Button
            variant="primary"
            onClick={handleDeactivatePaidAd}
            className="rounded mt-2 text-center w-100"
            disabled={keyword.toLowerCase() !== "deactivate"}
          >
            Deactivate Ad
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default DeactivatePaidAd;
