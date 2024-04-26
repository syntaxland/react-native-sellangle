// Product.js
import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useLocation, useHistory } from "react-router-dom";
// import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";
import { addToCart, removeFromCart } from "../actions/cartActions";
import {
  saveProduct,
  removeProduct,
  updateProductSaveCount,
  trackProductView,
} from "../actions/productAction";
import Message from "./Message";
import Loader from "./Loader";
import ProductPrice from "./ProductPrice";
import PromoTimer from "./PromoTimer";

function Product({ product }) {
  const dispatch = useDispatch();
  const [addToCartMessage, setAddToCartMessage] = useState(false);
  const [removeFromCartMessage, setRemoveFromCartMessage] = useState(false);
  const [productSaved, setProductSaved] = useState(false);
  const [totalSaves, setTotalSaves] = useState(product.save_count);

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

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const history = useHistory();

  const location = useLocation();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const [isCart, setIsCart] = useState(
    cartItems.some((item) => item.product === product._id)
  );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const productSave = useSelector((state) => state.productSave);
  // const {
  //   loading: productSaveLoading,
  //   error: productSaveError,
  //   success: productSaveSuccess,
  // } = productSave;

  // const productRemove = useSelector((state) => state.productRemove);
  // const {
  //   loading: productRemoveLoading,
  //   error: productRemoveError,
  //   success: productRemoveSuccess,
  // } = productRemove;

  // console.log(
  //   "userInfo.id",
  //   userInfo._id,
  //   "userInfo.favorite_products:",
  //   userInfo.favorite_products,
  //   "favorite_products length:",
  //   userInfo.favorite_products.length,
  //   " product ID:",
  //   product._id
  // );

  useEffect(() => {
    // Check if the product is already saved to favorites
    if (
      userInfo &&
      userInfo.favorite_products &&
      userInfo.favorite_products.includes(product._id)
    ) {
      setProductSaved(true);
    } else {
      setProductSaved(false);
    }
  }, [userInfo, product._id]);

  const toggleCartHandler = () => {
    if (isCart) {
      dispatch(removeFromCart(product._id));
      setIsCart(false);
      setRemoveFromCartMessage(true);
      setTimeout(() => {
        setRemoveFromCartMessage(false);
      }, 3000);
    } else {
      dispatch(addToCart(product._id, qty));
      setIsCart(true);
      setAddToCartMessage(true);
      setTimeout(() => {
        setAddToCartMessage(false);
      }, 3000);
    }
  };

  const toggleFavoriteHandler = () => {
    if (!userInfo) {
      // If user is not logged in or not verified, redirect to login
      history.push("/login");
    } else {
      if (productSaved) {
        setProductLoading({ productRemoveLoading: true });
        dispatch(removeProduct(userInfo.id, product._id))
          .then(() => {
            // Handle success
            setProductMessages((prevState) => ({
              ...prevState,
              productRemoveSuccess: true,
              productSaveSuccess: false,
              productRemoveError: null,
              productSaveError: null,
            }));
            setProductSaved(false);
            setTotalSaves((prevSaves) => prevSaves - 1); // Decrement totalSaves
            // Update product.save_count in the database
            const updatedSaveCount = product.save_count - 1;
            dispatch(updateProductSaveCount(product._id, updatedSaveCount));
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
        dispatch(saveProduct(userInfo.id, product._id))
          .then(() => {
            // Handle success
            setProductMessages((prevState) => ({
              ...prevState,
              productSaveSuccess: true,
              productRemoveSuccess: false,
              productSaveError: null,
              productRemoveError: null,
            }));
            setProductSaved(true);
            setTotalSaves((prevSaves) => prevSaves + 1); // Increment totalSaves
            // Update product.save_count in the database
            const updatedSaveCount = product.save_count + 1;
            dispatch(updateProductSaveCount(product._id, updatedSaveCount));
          })
          .catch((error) => {
            // Handle error
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
      // dispatch(trackProductView(userInfo.id, product._id));
    }
    dispatch(trackProductView(userInfo.id, product._id));

    history.push(`/product/${product._id}`);
  };

  // console.log(
  //   "userInfo.id",
  //   userInfo._id,
  //   "userInfo.viewed_products:",
  //   userInfo.viewed_products,
  //   "viewed_products length:",
  //   userInfo.viewed_products.length,
  //   " product ID:",
  //   product._id
  // );

  function formatCount(viewCount) {
    if (viewCount >= 1000000) {
      // Format as million
      return (viewCount / 1000000).toFixed(1) + "m";
    } else if (viewCount >= 1000) {
      // Format as thousand
      return (viewCount / 1000).toFixed(1) + "k";
    } else {
      return viewCount.toString();
    }
  }

  // const toggleFavoriteHandler = () => {
  //   if (!userInfo) {
  //     // If user is not logged in or not verified, redirect to login
  //     history.push("/login");
  //   } else {
  //     if (productSaved) {
  //       dispatch(removeProduct(userInfo.id, product._id));
  //       setProductSaved(false);
  //       // setMessage("Item removed from favorites.");
  //     } else {
  //       dispatch(saveProduct(userInfo.id, product._id));
  //       setProductSaved(true);
  //       // setMessage("Item added to favorites.");
  //     }
  //   }
  // };
  console.log(
    "promo_code",
    product.promo_code,
    "expiration_date",
    product.expiration_date,
    "discount_percentage",
    product.discount_percentage
  );

  return (
    <Card className="my-3 p-3 rounded">
      {addToCartMessage && (
        <Message variant="success">Item added to cart.</Message>
      )}
      {removeFromCartMessage && (
        <Message variant="danger">Item removed from cart.</Message>
      )}

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
        <Card.Img src={product.image} />
      </Link>

      <Card.Body>
        <Link onClick={viewProductHandler}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <span className="text-right" onClick={viewProductHandler}>
            <i className="fas fa-eye"></i> {formatCount(product.view_count)}{" "}
            views
          </span>
        </Card.Text>

        <div as="div">
          <div className="my-3">
            <Rating
              value={product.rating}
              text={`${formatCount(product.numReviews)} reviews `}
              color={"yellow"}
            />

            {userInfo ? (
              <Link to={`/review-list/${product._id}`}>(Verified Ratings)</Link>
            ) : (
              <Link onClick={() => history.push("/login")}>
                (Verified Ratings)
              </Link>
            )}
          </div>
        </div>

        <Card.Text as="h5">
          <span>
            <ProductPrice
              price={product.price}
              promoPrice={product.promo_price}
            />
          </span>
        </Card.Text>

        <span className="py-2">
          {product.promo_code && (
            <div>
              Promo code "{product.promo_code}" for{" "}
              {product.discount_percentage}% discount expires in:{" "}
              <PromoTimer expirationDate={product.expiration_date} />
            </div>
          )}
        </span>

        <div className="d-flex justify-content-between">
          <span>
            <Button
              onClick={toggleCartHandler}
              className="btn-block rounded"
              type="button"
              // variant="info"
              variant={isCart ? "info" : "outline-info"}
              disabled={product.countInStock === 0}
            >
              {product.countInStock === 0 ? (
                "Out of Stock"
              ) : isCart ? (
                <span>
                  <i className="fa fa-cart-arrow-down"></i> Remove From Cart
                </span>
              ) : (
                <span>
                  <i className="fa fa-cart-arrow-down"></i> Add To Cart
                </span>
              )}
            </Button>
          </span>
          <span>
            <Button
              onClick={toggleFavoriteHandler}
              className="ml-2 rounded"
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
      </Card.Body>
    </Card>
  );
}

export default Product;
