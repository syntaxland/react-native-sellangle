// SellerActiveFreeAdScreen.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import {
   getSellerActiveFreeAds, 
} from "../../actions/marketplaceSellerActions";

import AllFreeAdCard from "./AllFreeAdCard";
import Message from "../Message";
import Loader from "../Loader";

function SellerActiveFreeAdScreen({seller_username}) {
  const dispatch = useDispatch();

  const getSellerActiveFreeAdsState = useSelector((state) => state.getSellerActiveFreeAdsState); 
  const { loading, error, ads } = getSellerActiveFreeAdsState;
  console.log("All Free Ads:", ads);

  useEffect(() => {
    dispatch(getSellerActiveFreeAds(seller_username));
  }, [dispatch, seller_username]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ads?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(ads?.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <Row>
        <Col>
          <hr />
          <h1 className="text-center">Running Ads</h1>
          <hr />
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {currentItems?.length === 0 ? (
                <div className="text-center">Running ads appear here.</div>
              ) : (
                <Row>
                  {currentItems?.map((product) => (
                    <Col key={product.id} xs={12} sm={12} md={6} lg={4} xl={4}>
                      <AllFreeAdCard product={product} />
                    </Col>
                  ))}
                </Row>
              )} 
              <nav className="mt-4">
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage - 1)}
                    >
                      Previous
                    </button>
                  </li>
                  {pageNumbers.map((number) => (
                    <li
                      key={number}
                      className={`page-item ${
                        currentPage === number ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(number)}
                      >
                        {number}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === pageNumbers.length ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </>
          )}
          <hr />
        </Col>
      </Row>
    </div>
  );
}

export default SellerActiveFreeAdScreen;
