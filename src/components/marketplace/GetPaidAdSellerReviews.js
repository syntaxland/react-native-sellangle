// GetPaidAdSellerReviews.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import { Table, Button, Col, Row, Container } from "react-bootstrap";
import { getPaidAdSellerReviews } from "../../actions/marketplaceSellerActions";
import Message from "../Message";
import Loader from "../Loader";
import RatingSeller from "../RatingSeller";
import Pagination from "../Pagination";

function GetPaidAdSellerReviews({ adId }) {
  const dispatch = useDispatch();

  const getPaidAdSellerReviewsState = useSelector(
    (state) => state.getPaidAdSellerReviewsState
  );
  const { loading, error, sellerPaidAdReviews } = getPaidAdSellerReviewsState;
  console.log("sellerPaidAdReviews:", sellerPaidAdReviews);
  console.log("adId:", adId);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sellerPaidAdReviews?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    const reviewData = {
      ad_id: adId,
    };
    dispatch(getPaidAdSellerReviews(reviewData));
  }, [dispatch, adId]);

  return (
    <Container className="py-3 d-flex justify-content-center">
      <Row>
        <Col>
          {/* <h1 className="text-center">Seller Reviews</h1> */}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {currentItems?.length === 0 ? (
                <div className="text-center py-3">Reviews appear here.</div>
              ) : (
                <Table striped bordered hover responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>SN</th>

                      <th>User</th>
                      <th>Rating</th>
                      <th>Comment</th>
                      <th>Timestamp</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems?.map((review, index) => (
                      <tr key={review.id}>
                        <td>{index + 1}</td>

                        <td>{review.buyer_username}</td>
                        {/* <td>{review.rating}</td> */}
                        <td>
                          <RatingSeller
                            value={review.rating}
                            color={"green"}
                            // color={"#f8e825"}
                          />
                        </td>
                        <td>{review.comment}</td>
                        <td>{new Date(review.timestamp).toLocaleString()}</td>
                        <td>
                          <Button
                            className="rounded"
                            variant="primary"
                            size="sm"
                          >
                            <i className="fas fa-heart"></i> Like
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}

              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={sellerPaidAdReviews?.length}
                currentPage={currentPage}
                paginate={paginate}
              />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default GetPaidAdSellerReviews;
