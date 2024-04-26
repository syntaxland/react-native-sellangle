// SearchResults.js
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { Row, Col, Button, Form, Container } from "react-bootstrap";
import { getUserProfile } from "../../actions/userProfileActions";
import SearchFreeAdScreen from "./SearchFreeAdScreen";
import SearchPaidAdScreen from "./SearchPaidAdScreen";
import SellerSearchCard from "./SellerSearchCard";
import SearchFilterBar from "./SearchFilterBar";
import {
  getSellerUsernameSearch,
  searchAds,
  getAllPaidAd,
  getAllFreeAd,
} from "../../actions/marketplaceSellerActions";
import Message from "../Message";
import LoaderButton from "../LoaderButton";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
// import Slider, { Range } from 'rc-slider';
// import 'rc-slider/assets/index.css';

function SearchResults() {
  const dispatch = useDispatch();
  // const history = useHistory();

  const [searchTerm, setSearchTerm] = useState("");
  const [sellerUsername, setSellerUsername] = useState("");

  const [searchSellerUsername, setSearchSellerUsername] = useState(null);
  const [searchAdResult, setSearchAdResult] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const userProfile = useSelector((state) => state.userProfile);
  // const { profile } = userProfile;

  const getAllPaidAdState = useSelector((state) => state.getAllPaidAdState);
  const { paidAds } = getAllPaidAdState;
  console.log("paidAds:", paidAds?.length);

  const getAllFreeAdState = useSelector((state) => state.getAllFreeAdState);
  const { freeAds } = getAllFreeAdState;
  console.log("freeAds:", freeAds?.length);

  const searchAdsState = useSelector((state) => state.searchAdsState);
  const {
    loading: searchAdLoading,
    // success: searchAdSuccess,
    error: searchAdError,
    freeSearchAds,
    paidSearchAds,
  } = searchAdsState;
  console.log("freeSearchAds", freeSearchAds?.length);
  console.log("paidSearchAds", paidSearchAds?.length);

  const getSellerUsernameSearchState = useSelector(
    (state) => state.getSellerUsernameSearchState
  );
  const {
    loading: sellerUsernameSearchLoading,
    // success: sellerUsernameSearchSuccess,
    error: sellerUsernameSearchError,
    serachResults,
    sellerAvatarUrl,
  } = getSellerUsernameSearchState;
  console.log("serachResults", serachResults);

  const [freeAdSearchLength, setFreeAdSearchLength] = useState(0);
  const [paidAdSearchLength, setPaidAdSearchLength] = useState(0);

  useEffect(() => {
    setFreeAdSearchLength(freeSearchAds ? freeSearchAds.length : 0);
    setPaidAdSearchLength(paidSearchAds ? paidSearchAds.length : 0);
  }, [freeSearchAds, paidSearchAds]);

  const [filteredFreeAds, setFilteredFreeAds] = useState([]);
  const [filteredPaidAds, setFilteredPaidAds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const handleCategoryChange = useCallback(
    (category) => {
      setSelectedCategory(category);
      setSelectedType(null);

      const filteredFreeAds = freeSearchAds?.filter(
        (ad) => ad.ad_category === category
      );
      const filteredPaidAds = paidSearchAds?.filter(
        (ad) => ad.ad_category === category
      );
      setFilteredFreeAds(filteredFreeAds);
      setFilteredPaidAds(filteredPaidAds);

      localStorage.setItem("selectedCategory", category);
      localStorage.removeItem("selectedType");
    },
    [freeSearchAds, paidSearchAds]
  );

  const handleTypeChange = useCallback(
    (type, filteredFreeAds, filteredPaidAds) => {
      setSelectedType(type);
      setFilteredFreeAds(filteredFreeAds);
      setFilteredPaidAds(filteredPaidAds);

      // localStorage.setItem("selectedType", type);
    },
    []
  );

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption.value);
    setSelectedState("");
    setSelectedCity("");
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption.value);
    setSelectedCity("");
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption.value);
  };

  useEffect(() => {
    const savedCountry = localStorage.getItem("selectedCountry");
    const savedState = localStorage.getItem("selectedState");
    const savedCity = localStorage.getItem("selectedCity");

    if (savedCountry) setSelectedCountry(savedCountry);
    if (savedState) setSelectedState(savedState);
    if (savedCity) setSelectedCity(savedCity);
  }, []);

  useEffect(() => {
    if (selectedCountry)
      localStorage.setItem("selectedCountry", selectedCountry);
    // if (selectedState) localStorage.setItem("selectedState", selectedState);
    // if (selectedCity) localStorage.setItem("selectedCity", selectedCity);
  }, [selectedCountry, selectedState, selectedCity]);

  console.log("location", selectedCountry, selectedState, selectedCity);

  useEffect(() => {
    const adData = {
      selected_country: selectedCountry,
      selected_state: selectedState,
      selected_city: selectedCity,
    };
    dispatch(getAllPaidAd(adData));
    dispatch(getAllFreeAd(adData));
    // eslint-disable-next-line
  }, [dispatch, selectedCountry, selectedState, selectedCity]);

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile());
    }
  }, [dispatch, userInfo]);

  const handleSearchAds = (e) => {
    e.preventDefault();

    if (searchTerm.trim() !== "") {
      const searchData = {
        search_term: searchTerm.trim(),
        selected_country: selectedCountry,
        selected_state: selectedState,
        selected_city: selectedCity,
      };
      const result = dispatch(searchAds(searchData));
      setSearchAdResult(result);
      if (!result) {
        console.log("Ad not found.");
      }
    }
  };

  // useEffect(() => {
  //   if (searchAdSuccess) {
  //     const timer = setTimeout(() => {
  //       window.location.reload();
  //     }, 3000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [searchAdSuccess]);

  const handleSellerUsernameSearch = (e) => {
    e.preventDefault();
    if (sellerUsername.trim() !== "") {
      const lowerCaseUsername = sellerUsername.toLowerCase().trim();
      const result = dispatch(getSellerUsernameSearch(lowerCaseUsername));
      setSearchSellerUsername(result);
      if (!result) {
        console.log("Seller not found.");
      }
    }
  };

//   const Slider = require('rc-slider');
// const createSliderWithTooltip = Slider.createSliderWithTooltip;
// const Range = createSliderWithTooltip(Slider.Range);

  return (
    <Container>
      <Row>
        <Col>
          <hr />
          <h1 className="text-center py-3">
            <i className="fas fa-search"></i> Search Ads
          </h1>
          <hr />

          <div className="py-2 d-flex justify-content-center text-center">
            {/* {searchAdSuccess && (
              <Message variant="success" fixed>
                Ad(s) found!
              </Message>
            )} */}

            {searchAdError && (
              <Message fixed variant="danger">
                {searchAdError}
              </Message>
            )}

            {/* {sellerUsernameSearchSuccess && (
              <Message variant="success" fixed>
                Seller found!
              </Message>
            )} */}

            {sellerUsernameSearchError && (
              <Message fixed variant="danger">
                {sellerUsernameSearchError}
              </Message>
            )}
          </div>

          <Form onSubmit={handleSearchAds}>
            <Row className="py-2 d-flex justify-content-center">
              <Col md={8}>
                <Row className="py-2 d-flex justify-content-betwwen">
                  <Col md={10}>
                    <Form.Group>
                      <Form.Control
                        type="search"
                        placeholder="Search ads"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2} className="d-flex justify-content-end">
                    <Button
                      variant="primary"
                      className="rounded"
                      size="sm"
                      type="submit"
                      // onClick={handleSearchAds}
                    >
                      <div className="d-flex justify-content-center">
                        <span className="py-1">
                          <i className="fas fa-search"></i>
                          {/* Search */}
                          {/* Ads */}
                        </span>
                        {searchAdLoading && <LoaderButton />}
                      </div>
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>

          <hr />
          <Col md={6}>
            <Button
              variant="outline-transparent"
              size="sm"
              className="py-2 rounded"
              disabled
            >
              <i className="fas fa-map-marker-alt"></i> Ad Location (
              {freeAdSearchLength + paidAdSearchLength} ads)
            </Button>
          </Col>
          <Row className="py-2 d-flex justify-content-end">
            <Col className="py-2">
              <Col md={4}>
                <Select
                  options={Country.getAllCountries().map((country) => ({
                    // value: country.name,
                    value: country.isoCode,
                    label: country.name,
                  }))}
                  value={{ value: selectedCountry, label: selectedCountry }}
                  onChange={handleCountryChange}
                  placeholder="Select Country"
                  className="rounded"
                  required
                />
              </Col>
              <Col md={4}>
                <Select
                  options={
                    selectedCountry
                      ? State.getStatesOfCountry(selectedCountry).map(
                          (state) => ({
                            value: state.isoCode,
                            // value: state.name,
                            label: state.name,
                          })
                        )
                      : []
                  }
                  value={{ value: selectedState, label: selectedState }}
                  onChange={handleStateChange}
                  placeholder="Select State/Province"
                  className="rounded"
                  required
                />
              </Col>
              <Col md={4}>
                <Select
                  options={
                    selectedState
                      ? City.getCitiesOfState(
                          selectedCountry,
                          selectedState
                        ).map((city) => ({
                          value: city.name,
                          label: city.name,
                        }))
                      : []
                  }
                  value={{ value: selectedCity, label: selectedCity }}
                  onChange={handleCityChange}
                  placeholder="Select City"
                  className="rounded"
                  required
                />
              </Col>
            </Col>

            <Col md={4} xs={12} sm={6} lg={4} xl={4} className="py-2">
              <Form onSubmit={handleSellerUsernameSearch}>
                <Row className="d-flex justify-content-betwwen">
                  <Col md={10}>
                    <Form.Group>
                      <Form.Control
                        type="search"
                        placeholder="Search seller by username"
                        value={sellerUsername}
                        onChange={(e) => setSellerUsername(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2} className="d-flex justify-content-end">
                    <Button
                      variant="primary"
                      className="rounded"
                      size="sm"
                      type="submit"
                      // onClick={handleSellerUsernameSearch}
                      required
                    >
                      <div className="d-flex justify-content-center">
                        <span className="py-1">
                          <i className="fas fa-search"></i>
                          {/* Search */}
                          {/* Seller */}
                        </span>
                        {sellerUsernameSearchLoading && <LoaderButton />}
                      </div>
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>

          <div className="py-2 d-flex justify-content-center">
            <SearchFilterBar
              selectedCategory={selectedCategory}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              setSelectedCategory={setSelectedCategory}
              paidSearchAds={paidSearchAds}
              freeSearchAds={freeSearchAds}
              onCategoryChange={handleCategoryChange}
              onTypeChange={handleTypeChange}
            />
          </div>

          {/* <div className="py-2 d-flex justify-content-center">
          <Slider range />
          </div> */}

          <div className="py-2 d-flex justify-content-center">
            {searchSellerUsername && (
              <Row className="py-2 d-flex justify-content-center">
                <hr />
                <Col md={6}>
                  <div>
                    {serachResults && (
                      <SellerSearchCard
                        serachResults={serachResults}
                        sellerAvatarUrl={sellerAvatarUrl}
                      />
                    )}
                  </div>
                </Col>
              </Row>
            )}
          </div>

          <hr />

          <div className="py-2">
            {searchAdResult && (
              <Row className="py-2 d-flex justify-content-center">
                <h1 className="text-center">
                  <i className="fas fa-search"></i> Search Found (
                  {freeAdSearchLength + paidAdSearchLength})
                </h1>
                <Col>
                  <div>
                    {freeSearchAds || paidSearchAds ? (
                      <>
                        {paidSearchAds?.map((paidSearchAds) => (
                          <Col>
                            {paidSearchAds && (
                              <SearchPaidAdScreen
                                selectedCountry={selectedCountry}
                                selectedState={selectedState}
                                selectedCity={selectedCity}
                                paidSearchAds={filteredPaidAds || paidSearchAds}
                              />
                            )}
                          </Col>
                        ))}

                        {freeSearchAds?.map((freeSearchAds) => (
                          <Col>
                            {freeSearchAds && (
                              <SearchFreeAdScreen
                                selectedCountry={selectedCountry}
                                selectedState={selectedState}
                                selectedCity={selectedCity}
                                freeSearchAds={filteredFreeAds || freeSearchAds} 
                              />
                            )}
                          </Col>
                        ))}
                      </>
                    ) : (
                      <p></p>
                    )}
                  </div>
                </Col>
              </Row>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SearchResults;
