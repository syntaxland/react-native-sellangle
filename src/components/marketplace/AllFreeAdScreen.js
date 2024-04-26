// AllFreeAdScreen.js
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
// import { getAllFreeAd } from "../../actions/marketplaceSellerActions";

import AllFreeAdCard from "./AllFreeAdCard";
import Message from "../Message";
import Loader from "../Loader";

function AllFreeAdScreen({
  freeAds,
  // selectedCountry,
  // selectedState,
  // selectedCity,
  // selectedCategory,
  // selectedType,
}) {
  // const dispatch = useDispatch();

  const getAllFreeAdState = useSelector((state) => state.getAllFreeAdState);
  const { loading, error } = getAllFreeAdState;
  // console.log("All Free Ads:", freeAds);

  // const freeAdLength = freeAds?.length;
  // console.log("freeAdLength:", freeAdLength);

  // useEffect(() => {
  //   const adData = {
  //     selected_country: selectedCountry,
  //     selected_state: selectedState,
  //     selected_city: selectedCity,
  //     // selected_category: selectedCategory,
  //     // selected_type: selectedType,
  //   };
  //   dispatch(getAllFreeAd(adData)); 
  //   // eslint-disable-next-line
  // }, [dispatch, selectedCountry, selectedState, selectedCity]); 

  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = freeAds?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(freeAds?.length / itemsPerPage); i++) {
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

export default AllFreeAdScreen;
