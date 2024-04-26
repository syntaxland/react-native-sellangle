// Marketplace.js
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Row, Col, Button, Form, Container } from "react-bootstrap";
import { getUserProfile } from "../../actions/userProfileActions";
import AllPaidAdScreen from "./AllPaidAdScreen";
import AllFreeAdScreen from "./AllFreeAdScreen";
import SellerSearchCard from "./SellerSearchCard";
import FilterBar from "./FilterBar";
import {
  getSellerUsernameSearch,
  getAllPaidAd,
  getAllFreeAd,
} from "../../actions/marketplaceSellerActions";
import Message from "../Message";
import LoaderButton from "../LoaderButton";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const quotes = [
  "At this angle, sells are quick ...",
  "Turning Angles into Sells – SellAngle Style!",
  "Global Sells, Universal Angles – One Marketplace for All!", 
  "Selling Perfected: It's the SellAngle Way!",
  "Sell with Ease, Master the Angle – SellAngle!",
  "Every Sell, Every Angle, Every Human – One Global Stop!",
  "Navigating Sell Success, One Angle at a Time!",
  "Global Sells, Infinite Angles – One Marketplace for All!",
  "From Every Angle, to Every Human – SellAngle!",
  "From Every Angle, One Global Sell Destination!",
  "Strategic Angles, Stellar Sells!",
  "Precision in Every Angle, Power in Every Sell! SellAngle!!",
  "Angles that Convert, Sells that Skyrocket!",
  "Angle Your Way to Instant Sells Success!",
  "Selling at Every Angle, Selling in a Flash!",
  "SellAngle: Where Every Angle Counts in Sells!",
  "Swift Sells at Every Angle!",
  "Maximize Sells Momentum with SellAngle!",
  "Precision Sells, Perfect Angles – SellAngle!",
  "Angles That Accelerate Sells!",
  "Sell Smart, Sell Quick with the Power of Angle",
  "Your Angle to Sell Success: SellAngle Unleashed!",
  "The Quickest Sells, All in the Right Angle!",
  "Sell Globally, Angle Locally with SellAngle!",
  "One Stop, Every Sell, Every Angle – Global Marketplace!",
  "Global Sells, One-Stop Angles – It's Marketplace Magic!",
  "Sell Smart, Angle Globally – Your One-Stop Hub!",
  "One Stop for Sells Worldwide – Master Every Angle!",
  "Sell Everywhere, Master Every Angle – SellAngle!",
  "Global Sells, Local Angles – One Marketplace!",
  "Sell at Every Turn, One Marketplace for All – SellAngle!",
  "Unlock Global Sells, Master Every Angle – SellAngle!",
  "Sells for All, Angles for Every Need – SellAngle!",
  "One Marketplace, All Humans – Sell and Angle Globally!",
  "All Humans, All Sells, All Angles – One Marketplace!",
  "For All, By All – SellAngle, Your Global Sells Hub!",
  "Sells for Every Human, Angles for Every Heart – SellAngle!",
  "One Marketplace, Infinite Sells, Endless Angles – SellAngle!",
  "All Humans, One Marketplace – Sell and Angle Worldwide!",
  "From Every Corner, For All Humans – SellAngle!",
  "Master the Art of Selling with SellAngle!",
];

function Marketplace() {
  const dispatch = useDispatch(); 
  const history = useHistory();

  const [sellerUsername, setSellerUsername] = useState("");
  const [searchSellerUsername, setSearchSellerUsername] = useState(null); 

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

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
  // console.log("serachResults", serachResults);

  // const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // const handleQuoteChange = () => {
  //   const newIndex = Math.floor(Math.random() * quotes.length);
  //   setCurrentQuoteIndex(newIndex);
  // };

  // useEffect(() => {
  //   const interval = setInterval(handleQuoteChange, 5000);

  //   return () => clearInterval(interval);
  // }, []);

  const settings = {
    // dots: true,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1, 
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    focusOnSelect: true,
    centerMode: true,
  };

  const [freeAdLength, setFreeAdLength] = useState(0);
  const [paidAdLength, setPaidAdLength] = useState(0);

  useEffect(() => {
    setFreeAdLength(freeAds ? freeAds.length : 0);
    setPaidAdLength(paidAds ? paidAds.length : 0);
  }, [freeAds, paidAds]);

  const [filteredFreeAds, setFilteredFreeAds] = useState([]);
  const [filteredPaidAds, setFilteredPaidAds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  // console.log("filteredFreeAds", filteredFreeAds?.length);
  // console.log("filteredPaidAds", filteredPaidAds?.length);

  const handleCategoryChange = useCallback(
    (category) => {
      setSelectedCategory(category);
      setSelectedType(null);

      const filteredFreeAds = freeAds?.filter(
        (ad) => ad.ad_category === category
      );
      const filteredPaidAds = paidAds?.filter(
        (ad) => ad.ad_category === category
      );
      setFilteredFreeAds(filteredFreeAds);
      setFilteredPaidAds(filteredPaidAds);

      localStorage.setItem("selectedCategory", category);
      localStorage.removeItem("selectedType");
    },
    [freeAds, paidAds]
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

  useEffect(() => {
    const storedCategory = localStorage.getItem("selectedCategory");
    const storedType = localStorage.getItem("selectedType");

    if (storedCategory && storedType) {
      setSelectedCategory(storedCategory);
      setSelectedType(storedType);

      const filteredFreeAds = freeAds?.filter(
        (ad) => ad.ad_category === storedCategory
      );
      const filteredPaidAds = paidAds?.filter(
        (ad) => ad.ad_category === storedCategory && ad.ad_type === storedType
      );
      setFilteredFreeAds(filteredFreeAds);
      setFilteredPaidAds(filteredPaidAds);
    }
  }, [freeAds, paidAds]);

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

  const handlePostFreeAd = () => {
    if (!userInfo) {
      history.push("/login");
    } else if (userInfo && !profile.is_marketplace_seller) {
      history.push("/create-marketplace-seller");
    } else {
      history.push("/ad/free");
    }
  };

  const handleSearchAds = () => {
    history.push("/search-ad/");
  };

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

  return (
    <Container>
      <Row>
        <Col>
          <hr />
          <h1 className="text-center py-2">
            <i className="fas fa-shopping-cart"></i> Sell Angle
          </h1>
          <hr />

          <div className="py-2 d-flex justify-content-center text-center">
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

          <Row className="py-2 d-flex justify-content-center">
            <Col md={8}>
              <Row className="py-2 d-flex justify-content-betwwen">
                <Col className="d-flex justify-content-center">
                  <Button
                    variant="primary"
                    className="rounded"
                    size="sm"
                    onClick={handleSearchAds}
                  >
                    <div className="d-flex justify-content-center">
                      <span className="py-1">
                        Search Ads <i className="fas fa-search"></i>
                      </span>
                      {searchAdLoading && <LoaderButton />}
                    </div>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>

          <hr />
          <Col md={6}>
            <Button
              variant="outline-transparent"
              size="sm"
              className="py-2 rounded"
              disabled
            >
              <i className="fas fa-map-marker-alt"></i> Ad Location (
              {freeAdLength + paidAdLength} ads)
            </Button>
          </Col>
          <Row className="py-2 d-flex justify-content-end">
            <Col className="py-2">
              <Col md={4}>
                <span>Country: </span>
                <Select
                  options={Country.getAllCountries().map((country) => ({
                    // value: country.name,
                    value: country.isoCode,
                    label: country.name,
                  }))}
                  value={{ value: selectedCountry, label: selectedCountry }}
                  // value={
                  //   selectedCountry
                  //     ? { value: selectedCountry, label: selectedCountry }
                  //     : defaultCountry
                  // }
                  onChange={handleCountryChange}
                  placeholder="Select Country"
                  className="rounded"
                  required
                />
              </Col>
              <Col md={4}>
                <span>State/Province: </span>
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
                  // value={
                  //   selectedState
                  //     ? { value: selectedState, label: selectedState }
                  //     : defaultState
                  // }
                  onChange={handleStateChange}
                  placeholder="Select State/Province"
                  className="rounded"
                  required
                />
              </Col>
              <Col md={4}>
                <span>City: </span>
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
                  // value={
                  //   selectedCity
                  //     ? { value: selectedCity, label: selectedCity }
                  //     : defaultCity
                  // }
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
            <FilterBar
              selectedCategory={selectedCategory}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              setSelectedCategory={setSelectedCategory}
              freeAds={freeAds}
              paidAds={paidAds}
              onCategoryChange={handleCategoryChange}
              onTypeChange={handleTypeChange}
            />
          </div>

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

          <div className="text-center py-2">
            {/* <span>At this angle, sells are quick ...{"  "}</span> */}

            <Slider {...settings}>
              {quotes.map((quote, index) => (
                <div key={index} className="quote-slide">
                  <p className="text-center py-2">
                    <i className="fas fa-quote-left"></i> {quote}{" "}
                    <i className="fas fa-quote-right"></i>
                  </p>
                </div>
              ))}
            </Slider>
            {/* <Slider {...settings} initialSlide={currentQuoteIndex}>
              {quotes.map((quote, index) => (
                <div key={index} className="quote-slide">
                  <p className="text-center py-2">
                    <i className="fas fa-quote-left"></i> {quote}{" "}
                    <i className="fas fa-quote-right"></i>
                  </p>
                </div>
              ))}
            </Slider> */}

            <div className="text-center py-2">
              <Button
                variant="success"
                className="rounded"
                size="sm"
                onClick={handlePostFreeAd}
              >
                Post Free Ads <i className="fas fa-plus-square"></i>
              </Button>
            </div>
          </div>

          <div>
            <AllPaidAdScreen
              selectedCountry={selectedCountry}
              selectedState={selectedState}
              selectedCity={selectedCity}
              // paidAds={filteredPaidAds}
              // paidAds={selectedType ? filteredPaidAds : paidAds}
              paidAds={filteredPaidAds || paidAds}
            />
          </div>

          <div>
            <AllFreeAdScreen
              selectedCountry={selectedCountry}
              selectedState={selectedState}
              selectedCity={selectedCity}
              // freeAds={filteredFreeAds}
              // freeAds={selectedType ? filteredFreeAds : freeAds}
              freeAds={filteredFreeAds || freeAds}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Marketplace;
