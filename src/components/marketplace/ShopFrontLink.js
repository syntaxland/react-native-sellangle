// ShopFrontLink.js
import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getSellerShopfrontLink } from "../../actions/marketplaceSellerActions";
import Loader from "../Loader";
import Message from "../Message";

function ShopFrontLink() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const getSellerShopfrontLinkState = useSelector(
    (state) => state.getSellerShopfrontLinkState
  );
  const { loading, error, shopfrontLink } = getSellerShopfrontLinkState;
  console.log("shopfrontLink:", shopfrontLink);

  const [isShopfrontLinkCopied, setIsShopfrontLinkCopied] = useState(false);

  useEffect(() => {
    dispatch(getSellerShopfrontLink());
  }, [dispatch]);

  const copyToClipboard = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      if (textToCopy === shopfrontLink) {
        setIsShopfrontLinkCopied(true);
        setTimeout(() => setIsShopfrontLinkCopied(false), 2000);
      }
    });
  };

  const shareShopfrontLink = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Shopfront Link",
          text: "Check out my Shopfront link!",
          url: shopfrontLink,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Share failed:", error));
    } else {
      console.log("Web Share API not supported");
      alert("Please manually share the referral link: " + shopfrontLink);
    }
  };

  return (
    <div>
      <Row className="d-flex justify-content-center">
        <Col>
          <hr />
          <h1 className="text-center py-3">Seller Shopfront Link</h1>
          <hr />
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <div>
              <h5 className="pt-3">Your Shopfront Link:</h5>
              <div>
                <span style={{ color: "blue" }}>
                  <span
                    
                  >
                    {shopfrontLink}
                  </span>
                </span>{" "}
                <span>
                  <Button
                    variant="outline-transparent"
                    className="rounded"
                    size="sm"
                    onClick={() => copyToClipboard(shopfrontLink)}
                  >
                    {isShopfrontLinkCopied ? (
                      <span>
                        <i className="fa fa-check"></i> Copied
                      </span>
                    ) : (
                      <span>
                        <i className="fa fa-copy"></i> Copy
                      </span>
                    )}
                  </Button>
                </span>
                <span>
                  <Button
                    variant="outline-transparent"
                    className="rounded"
                    onClick={shareShopfrontLink}
                  >
                    Share <i className="fas fa-share-alt"></i>
                  </Button>
                </span>
              </div>
              <hr />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default ShopFrontLink;
