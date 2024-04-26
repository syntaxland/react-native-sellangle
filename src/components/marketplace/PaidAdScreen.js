// PaidAdScreen.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import {
  //  getFreeAd, 
  //  deleteFreeAd,
  //  updateFreeAd,
  //  getAllFreeAd,
  getPaidAd,
  //  updatePaidAd,
  //  deletePaidAd,
  //  getAllPaidAd,
} from "../../actions/marketplaceSellerActions";

import PaidAdCard from "./PaidAdCard";
import Message from "../Message";
import Loader from "../Loader";

function PaidAdScreen() {
  const dispatch = useDispatch();

  const getPaidAdState = useSelector((state) => state.getPaidAdState);
  const { loading, error, ads } = getPaidAdState;
  console.log("PaidAds:", ads);

  useEffect(() => {
    dispatch(getPaidAd());
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
          <h1 className="text-center">Promoted Ads</h1>
            <hr />
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {currentItems?.length === 0 ? (
                <div className="text-center">Promoted ads appear here.</div>
              ) : (
                <Row>
                  {currentItems.map((product) => (
                    <Col key={product.id} xs={12} sm={12} md={6}>
                      <PaidAdCard product={product} />
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

export default PaidAdScreen;
