// SavedPaidAds.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { getUserSavedPaidAds } from "../../actions/marketplaceSellerActions";
import Message from "../Message";
import Loader from "../Loader";
import Pagination from "../Pagination";
import AllPaidAdCard from "./AllPaidAdCard"; 

function SavedPaidAds() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserSavedPaidAds());
  }, [dispatch]);

  const getUserSavedPaidAdsState = useSelector(
    (state) => state.getUserSavedPaidAdsState 
  );
  const { loading, error, savedAds } = getUserSavedPaidAdsState;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = savedAds?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Row>
        <Col>
          <hr />
          <h1 className="text-center py-2">Promoted Ads</h1>
          <hr />
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
            {currentItems.length === 0 ? (
                <div className="text-center py-3">
                  Saved promoted ads appear here.
                </div>
              ) : (
              <Row>
                {currentItems.map((product) => (
                  <Col key={product._id} xs={12} sm={12} md={6} lg={4} xl={3}>
                    <AllPaidAdCard product={product} />
                  </Col>
                ))}
              </Row>
                            )}

              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={savedAds?.length}
                currentPage={currentPage}
                paginate={paginate}
              />
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default SavedPaidAds;
