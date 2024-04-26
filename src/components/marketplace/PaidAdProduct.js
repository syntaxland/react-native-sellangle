// PaidAdProduct.js
import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../Rating";
import {
  saveProduct,
  removeProduct,
  updateProductSaveCount,
  trackProductView,
} from "../../actions/productAction";
import Message from "../Message";
import Loader from "../Loader";
import ProductPrice from "../ProductPrice";
import PromoTimer from "../PromoTimer";

function PaidAdProduct({ product }) {
  const dispatch = useDispatch();

  const [productSaved, setProductSaved] = useState(false);
  const [totalSaves, setTotalSaves] = useState(product?.ad_save_count);

  const [productMessages, setProductMessages] = useState({
    productSaveSuccess: false,
    productRemoveSuccess: false,
    productSaveError: null,
    productRemoveError: null,
  });

  const [productLoading, setProductLoading] = useState({
    productSaveLoading: false,
    productRemoveLoading: false,
  });

  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (
      userInfo &&
      userInfo.favorite_products &&
      userInfo.favorite_products.includes(product.id)
    ) {
      setProductSaved(true);
    } else {
      setProductSaved(false);
    }
  }, [userInfo, product.id]);

  const toggleFavoriteHandler = () => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (productSaved) {
        setProductLoading({ productRemoveLoading: true });
        dispatch(removeProduct(userInfo.id, product.id))
          .then(() => {
            setProductMessages((prevState) => ({
              ...prevState,
              productRemoveSuccess: true,
              productSaveSuccess: false,
              productRemoveError: null,
              productSaveError: null,
            }));
            setProductSaved(false);
            setTotalSaves((prevSaves) => prevSaves - 1); // Decrement totalSaves
            const updatedSaveCount = product?.ad_save_count - 1;
            dispatch(updateProductSaveCount(product.id, updatedSaveCount));
          })
          .catch((error) => {
            // Handle error
            setProductMessages((prevState) => ({
              ...prevState,
              productRemoveError:
                error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message,
              productRemoveSuccess: false,
              productSaveSuccess: false,
              productSaveError: null,
            }));
          })
          .finally(() => {
            setProductLoading({ productRemoveLoading: false });
          });
      } else {
        setProductLoading({ productSaveLoading: true });
        dispatch(saveProduct(userInfo.id, product.id))
          .then(() => {
            setProductMessages((prevState) => ({
              ...prevState,
              productSaveSuccess: true,
              productRemoveSuccess: false,
              productSaveError: null,
              productRemoveError: null,
            }));
            setProductSaved(true);
            setTotalSaves((prevSaves) => prevSaves + 1);
            const updatedSaveCount = product?.ad_save_count + 1;
            dispatch(updateProductSaveCount(product.id, updatedSaveCount));
          })
          .catch((error) => {
            setProductMessages((prevState) => ({
              ...prevState,
              productSaveError:
                error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message,
              productSaveSuccess: false,
              productRemoveSuccess: false,
              productRemoveError: null,
            }));
          })
          .finally(() => {
            setProductLoading({ productSaveLoading: false });
          });
      }
    }
    setTimeout(() => {
      setProductMessages((prevState) => ({
        ...prevState,
        productSaveSuccess: false,
        productRemoveSuccess: false,
      }));
    }, 3000);
  };

  const viewProductHandler = () => {
    if (!userInfo) {
      history.push("/login");
      // dispatch(trackProductView(userInfo.id, product.id));
    }
    dispatch(trackProductView(userInfo.id, product.id));

    history.push(`/paid-ad-detail/${product.id}`);
  };

  function formatCount(viewCount) {
    if (viewCount >= 1000000) {
      // Format as million
      return (viewCount / 1000000).toFixed(1) + "m";
    } else if (viewCount >= 1000) {
      // Format as thousand
      return (viewCount / 1000).toFixed(1) + "k";
    } else {
      return viewCount?.toString();
    }
  }

  return (
    <Card className="my-3 p-3 rounded">
      {productMessages.productSaveSuccess && (
        <Message variant="success">Item added to favorites.</Message>
      )}
      {productMessages.productRemoveSuccess && (
        <Message variant="danger">Item removed from favorites.</Message>
      )}
      {productMessages.productSaveError && (
        <Message variant="danger">{productMessages.productSaveError}</Message>
      )}
      {productMessages.productRemoveError && (
        <Message variant="danger">{productMessages.productRemoveError}</Message>
      )}

      {productLoading.productSaveLoading && <Loader />}
      {productLoading.productRemoveLoading && <Loader />}

      <Link onClick={viewProductHandler}>
        <Card.Img src={product.image1} />
      </Link>

      <Card.Body>
        <div className="d-flex justify-content-between">
          <Link onClick={viewProductHandler}>
            <Card.Title as="div">
              <strong>{product.ad_name}</strong>
            </Card.Title>
          </Link>

          <span>
            <Button
              variant="outline-success"
              size="sm"
              className="rounded"
              disabled
            >
              <i>Promoted</i>
            </Button>
          </span>
        </div>

        <div className="d-flex justify-content-between">
          <div as="div">
            <div className="py-2">
              <Rating
                value={product.rating}
                text={`${formatCount(product?.num_reviews)} reviews `}
                color={"yellow"}
              />

              {userInfo ? (
                <Link to={`/review-list/${product.id}`}>
                  (Verified Ratings)
                </Link>
              ) : (
                <Link onClick={() => history.push("/login")}>
                  (Verified Ratings)
                </Link>
              )}
            </div>
          </div>

          <Card.Text as="div" className="py-2">
            <span className="text-right" onClick={viewProductHandler}>
              <i className="fas fa-eye"></i>{" "}
              {formatCount(product?.ad_view_count)} views
            </span>
          </Card.Text>
        </div>

        <div className="d-flex justify-content-between py-2">
          <Card.Text as="h5" className="py-2">
            <span>
              <ProductPrice
                price={product.price}
                promoPrice={product.promo_price}
              />
            </span>
          </Card.Text>

          <span className="py-2">
            <Button
              variant="outline-primary"
              size="sm"
              className="py-2 rounded"
              disabled
            >
              <i>Promo Code: NEW0223</i>
            </Button>
          </span>
        </div>

        <div className="d-flex justify-content-between">
          <span className="py-2">
            <Button
              variant="outline-primary"
              size="sm"
              className="py-2 rounded"
              disabled
            >
              Timer: <PromoTimer expirationDate={product?.expiration_date} />
            </Button>
          </span>

          <span className="py-2">
            <Button
              onClick={toggleFavoriteHandler}
              className="py-2 rounded"
              type="button"
              variant={productSaved ? "danger" : "outline-danger"}
            >
              <div className="mt-auto">
                <i
                  className={productSaved ? "fas fa-heart" : "far fa-heart"}
                ></i>{" "}
                {productSaved ? "Saved" : "Save"}{" "}
                <span className="text-muted">({formatCount(totalSaves)})</span>
              </div>
            </Button>
          </span>
        </div>

        <div className="d-flex justify-content-between py-2">
        <span className="py-2">
            <Button
              variant="outline-primary"
              size="sm"
              className="py-2 rounded"
            >
            Message Seller
            </Button>
          </span>

          <span className="py-2">
            <Button
              variant="outline-primary"
              size="sm"
              className="py-2 rounded"
            >
            Edit
            </Button>
          </span>

          <span className="py-2">
            <Button
              variant="outline-primary"
              size="sm"
              className="py-2 rounded"
            >
            Delete
            </Button>
          </span>

          <span className="py-2">
            <Button
              variant="outline-primary"
              size="sm"
              className="py-2 rounded"
            >
            Deactivate
            </Button>
          </span>
        </div>
      </Card.Body>
    </Card>
  );
}

export default PaidAdProduct;
