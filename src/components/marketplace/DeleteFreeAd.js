// DeleteFreeAd.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { deleteFreeAd } from "../../actions/marketplaceSellerActions";
import { useHistory } from "react-router-dom"; 
import Message from "../Message";
import Loader from "../Loader";

function DeleteFreeAd({ ad_id }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const deleteFreeAdState = useSelector((state) => state.deleteFreeAdState);
  const { success, error, loading } = deleteFreeAdState;

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

  const handleDeleteFreeAd = () => {
    dispatch(deleteFreeAd(adData));
  };

  return (
    <Container>
      <Row className="justify-content-center py-2">
        <Col>
          {loading && <Loader />}
          {success && (
            <Message variant="success">Ad deleted successfully.</Message>
          )}
          {error && <Message variant="danger">{error}</Message>}

          <p className="rounded mt-2 py-1 text-center">
            <i
              className="fa fa-warning"
              style={{ fontSize: "18px", color: "yellow" }}
            ></i>{" "}
            Warning! This action will delete this ad and it's irreversible. Type{" "}
            <i>delete</i> to confirm the deletion.
          </p>

          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="delete"
                className="rounded mt-2"
                required
                maxLength={6}
              />
            </Form.Group>
          </Form>

          <Button
            variant="primary"
            onClick={handleDeleteFreeAd}
            className="rounded mt-2 text-center w-100"
            disabled={keyword.toLowerCase() !== "delete"}
          >
            Delete Ad
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default DeleteFreeAd;
