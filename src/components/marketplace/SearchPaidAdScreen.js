// SearchPaidAdScreen.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
// import { searchAds } from "../../actions/marketplaceSellerActions";
import SearchPaidAdCard from "./SearchPaidAdCard";
import Message from "../Message";
import Loader from "../Loader";
import Pagination from "../Pagination";

function SearchPaidAdScreen({
  selectedCountry,
  selectedState,
  selectedCity,

  // paidSearchAds
}) {
  const dispatch = useDispatch();

  const searchAdsState = useSelector((state) => state.searchAdsState);
  const { loading, error, paidSearchAds } = searchAdsState;
  // console.log("paidSearchAds", paidSearchAds?.length);

  useEffect(() => {
    // const adData = {
    //   selected_country: selectedCountry,
    //   selected_state: selectedState,
    //   selected_city: selectedCity,
    // };
    // dispatch(searchAds(result));
    // eslint-disable-next-line
  }, [dispatch, selectedCountry, selectedState, selectedCity]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = paidSearchAds?.slice(indexOfFirstItem, indexOfLastItem);

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
                  {currentItems?.map((paidSearchAd) => (
                    <Col
                      key={paidSearchAd.id}
                      xs={12}
                      sm={12}
                      md={6}
                      lg={4}
                      xl={4}
                    >
                      <SearchPaidAdCard paidSearchAd={paidSearchAd} />
                    </Col>
                  ))}
                </Row>
              )}

              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={paidSearchAds.length}
                currentPage={currentPage}
                paginate={paginate}
              />
            </>
          )}
          <hr />
        </Col>
      </Row>
    </div>
  );
}

export default SearchPaidAdScreen;
