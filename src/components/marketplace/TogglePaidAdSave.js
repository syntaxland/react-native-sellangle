// TogglePaidAdSave.js
import React, {
  useState,
  // useEffect
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  togglePaidAdSave,
} from "../../actions/marketplaceSellerActions";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
// import Message from "../Message";
import LoaderButton from "../LoaderButton"; 

function TogglePaidAdSave({ ad }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [toggleAdSaveLoading, setToggleAdSaveLoading] = useState(false);
  const [adIsSaved, setAdIsSaved] = useState(ad?.ad_is_saved);
  const [adSaveCount, setAdSaveCount] = useState(ad?.ad_save_count);

  const handleTogglePaidAdSave = async () => {
    if (!userInfo) {
      history.push("/login");
    } else {
      setToggleAdSaveLoading(true);

      const toggleData = {
        ad_id: ad.id,
      };

      try {
        const response = await dispatch(togglePaidAdSave(toggleData));
        setAdIsSaved(response?.ad_is_saved);
        setAdSaveCount(response?.ad_save_count);
      } finally {
        setToggleAdSaveLoading(false);
      }
    }
  };

  function formatCount(saveCount) {
    if (saveCount >= 1000000) {
      // Format as million
      return (saveCount / 1000000).toFixed(1) + "m";
    } else if (saveCount >= 1000) {
      // Format as thousand
      return (saveCount / 1000).toFixed(1) + "k";
    } else {
      return saveCount?.toString();
    }
  }

  return (
    <Container>
      <Row className="justify-content-center ">
        <Col>
          {/* {success && <Message variant="success">Success!</Message>} */}
          {/* {error && <Message variant="danger">{error}</Message>} */}
          {toggleAdSaveLoading && <LoaderButton />}

          <div
            className={` d-flex justify-content-center flex-column align-items-center ${
              adIsSaved ? "text-danger" : "text-outline-danger"
            }`}
            onClick={handleTogglePaidAdSave}
            style={{ cursor: "pointer" }}
          >
            <i
              className={`mt-auto ${adIsSaved ? "fas" : "far"} fa-heart`}
              style={{ fontSize: "28px" }}
            ></i>{" "}
            <p className="text-muted">{formatCount(adSaveCount)}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default TogglePaidAdSave;
