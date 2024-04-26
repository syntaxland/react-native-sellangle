// SellerPhoto.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { sellerPhoto } from "../../actions/marketplaceSellerActions";
import Message from "../Message";
import Loader from "../Loader";
 
function SellerPhoto({ history }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  const marketplaceSellerPhotoState = useSelector((state) => state.marketplaceSellerPhotoState);
  const { success, error, loading } = marketplaceSellerPhotoState;

  const [photo, setPhoto] = useState("");

  const sellerData = new FormData();
  sellerData.append("photo", photo);
  console.log("sellerData:", sellerData);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        history.push("/dashboard/marketplace/sellers");
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success, history]);

  const handleSellerPhoto = (e) => {
    e.preventDefault(e);

    dispatch(sellerPhoto(sellerData));
  };

  return (
    <Container>
      <Row className="justify-content-center py-2">
        <Col xs={12} md={6}>
          <h2 className="text-center py-2">Take Seller's Picture</h2>
          {loading && <Loader />}

          {success && (
            <Message variant="success">
              Seller Account created successfully.
            </Message>
          )}
          {error && <Message variant="danger">{error}</Message>}

          <Form>
            <Form.Group>
              <Form.Label>Take Photo </Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
                placeholder="Upload the the seller's photo"
                className="rounded py-2 mb-2"
                required
              />
            </Form.Group>
          </Form>
          <Button
            variant="primary"
            onClick={handleSellerPhoto}
            className="rounded py-2 mb-2 text-center w-100"
            disabled={!photo || loading || success}
          >
            Upload
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default SellerPhoto;
