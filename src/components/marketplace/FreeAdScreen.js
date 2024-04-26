// FreeAdScreen.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import {
   getSellerFreeAd,
  //  deleteFreeAd,
  //  updateFreeAd,
  //  getAllFreeAd,
  // getPaidAd,
  //  updatePaidAd,
  //  deletePaidAd,
  //  getAllPaidAd,  
} from "../../actions/marketplaceSellerActions";

import FreeAdCard from "./FreeAdCard";
import Message from "../Message";
import Loader from "../Loader";

function FreeAdScreen() {
  const dispatch = useDispatch();

  const getFreeAdState = useSelector((state) => state.getFreeAdState);
  const { loading, error, ads } = getFreeAdState;
  console.log("Free Ads screen:", ads);

  useEffect(() => {
    dispatch(getSellerFreeAd());
  }, [dispatch]);

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
                    <Col key={product.id} xs={12} sm={12} md={6} >
                      <FreeAdCard product={product} />
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
        </Col>
      </Row>
    </div>
  );
}

export default FreeAdScreen;
