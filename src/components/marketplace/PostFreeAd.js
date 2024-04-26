// PostFreeAd.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { postFreeAd } from "../../actions/marketplaceSellerActions";
import Message from "../Message";
import Loader from "../Loader";
import LoaderButton from "../LoaderButton";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
 
function PostFreeAd() {
  const dispatch = useDispatch();

  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  const postFreeAdState = useSelector((state) => state.postFreeAdState);
  const { success, error, loading } = postFreeAdState;

  const [adName, setAdName] = useState("");
  const [adNameError, setAdNameError] = useState("");

  const [adCategory, setAdCategory] = useState("");
  const [adCategoryError, setAdCategoryError] = useState("");

  const [adType, setAdType] = useState("");
  const [adTypeError, setAdTypeError] = useState("");

  const [country, setCountry] = useState({});
  const [countryError, setCountryError] = useState("");

  const [stateProvince, setStateProvince] = useState({});
  const [stateProvinceError, setStateProvinceError] = useState("");

  const [city, setCity] = useState({});
  const [cityError, setCityError] = useState("");

  const [condition, setCondition] = useState("");
  // const [conditionError, setConditionError] = useState("");

  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState("");

  // const [usdPrice, setUsdPrice] = useState("");

  const [currency, setCurrency] = useState("");
  const [currencyError, setCurrencyError] = useState("");

  const [brand, setBrand] = useState("");
  // const [brandError, setBrandError] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [countInStock, setCountInStock] = useState("");

  const [youtubeLink, setYoutubeLink] = useState("");
  // const [youtubeLinkError, setYoutubeLinkError] = useState("");

  const [image1, setImage1] = useState("");
  const [image1Error, setImage1Error] = useState("");

  const [image2, setImage2] = useState("");
  // const [image2Error, setImage2Error] = useState("");

  const [image3, setImage3] = useState("");
  // const [image3Error, setImage3Error] = useState("");

  const [duration, setDuration] = useState("");
  const [durationError, setDurationError] = useState("");

  const [formError, setFormError] = useState("");

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (country) {
      setStates(State.getStatesOfCountry(country.isoCode));
    } else {
      setStates([]);
    }
  }, [country, country.isoCode]);

  useEffect(() => {
    if (stateProvince) {
      setCities(City.getCitiesOfState(country.isoCode, stateProvince.isoCode));
    } else {
      setCities([]);
    }
  }, [stateProvince, country.isoCode]);

  const handleCategoryChange = (selectedOption) => {
    setAdCategory(selectedOption.value);
    setAdCategoryError("");
    setAdType("");
  };

  const handleTypeChange = (selectedOption) => {
    setAdType(selectedOption.value);
    setAdTypeError("");
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "list",
    "bold",
    "italic",
    "underline",
    "align",
    "link",
    "image",
  ];

  const handleFieldChange = (fieldName, value) => {
    switch (fieldName) {
      case "adName":
        setAdName(value);
        setAdNameError("");
        break;

      case "adCategory":
        setAdCategory(value);
        setAdCategoryError("");
        break;

      case "adType":
        setAdType(value);
        setAdTypeError("");
        break;

      // case "location":
      //   setLocation(value);
      //   setLocationError("");
      //   break;

      case "country":
        setCountry(value);
        setCountryError("");
        break;

      case "stateProvince":
        setStateProvince(value);
        setStateProvinceError("");
        break;

      case "city":
        setCity(value);
        setCityError("");
        break;

      case "condition":
        setCondition(value);
        // setConditionError("");
        break;

      case "currency":
        setCurrency(value);
        setCurrencyError("");
        break;

      case "price":
        setPrice(value);
        setPriceError("");
        break;

      // case "usdPrice":
      //   setUsdPrice(value);
      //   break;

      case "brand":
        setBrand(value);
        // setBrandError("");
        break;

      case "description":
        setDescription(value);
        setDescriptionError("");
        break;

      case "youtubeLink":
        setYoutubeLink(value);
        // setYoutubeLinkError("");
        break;

      case "countInStock":
        setCountInStock(value);
        break;

      case "image1":
        setImage1(value);
        setImage1Error("");
        break;

      case "image2":
        setImage2(value);
        // setImage2Error("");
        break;

      case "image3":
        setImage3(value);
        // setImage3Error("");
        break;

      case "duration":
        setDuration(value);
        setDurationError("");
        break;

      default:
        break;
    }
  };

  const DURATION_CHOICES = [
    ["1 day", "1 day (Free)"],
    ["2 days", "2 days (Free)"],
    ["3 days", "3 days (Free)"],
    ["5 days", "5 days (Free)"],
    ["1 week", "1 week (Free)"],
    ["2 weeks", "2 weeks (Free)"],
    ["1 month", "1 month (Free)"],
  ];

  const AD_CONDITION_CHOICES = [
    ["Brand New", "Brand New"],
    ["Fairly Used", "Fairly Used"],
  ];

  const AD_CATEGORY_CHOICES = [
    ["Home Appliances", "Home Appliances"],
    ["Properties", "Properties"],
    ["Electronics", "Electronics"],
    ["Fashion", "Fashion"],
    ["Vehicles", "Vehicles"],
    ["Services", "Services"],
    ["Mobile Phones", "Mobile Phones"],
    ["Health & Beauty", "Health & Beauty"],
    ["Sports", "Sports"],
    ["Jobs", "Jobs"],
    ["Babies and Kids", "Babies and Kids"],
    ["Agric & Food", "Agric & Food"],
    ["Repairs", "Repairs"],
    ["Equipment & Tools", "Equipment & Tools"],
    ["CVs", "CVs"],
    ["Pets", "Pets"],
    ["Others", "Others"],
  ];

  const AD_TYPE_CHOICES = {
    "Home Appliances": [
      ["Washing Machine", "Washing Machine"],
      ["Refrigerator", "Refrigerator"],
      ["Microwave", "Microwave"],
      ["Coffee Machine", "Coffee Machine"],
      ["Air Conditioner", "Air Conditioner"],
      ["Solar", "Solar"],
      ["Kitchen Appliances", "Kitchen Appliances"],
    ],
    Properties: [
      ["House", "House"],
      ["Apartment", "Apartment"],
      ["Land", "Land"],
      ["Commercial Property", "Commercial Property"],
    ],
    Electronics: [
      ["Laptop", "Laptop"],
      ["Smartphone", "Smartphone"],
      ["Camera", "Camera"],
      ["Headphones", "Headphones"],
      ["Television", "Television"],
    ],
    Fashion: [
      ["Clothing", "Clothing"],
      ["Shoes", "Shoes"],
      ["Accessories", "Accessories"],
    ],
    Vehicles: [
      ["Car", "Car"],
      ["Motorcycle", "Motorcycle"],
      ["Bicycle", "Bicycle"],
    ],
    Services: [
      ["Cleaning", "Cleaning"],
      ["Plumbing", "Plumbing"],
      ["Electrician", "Electrician"],
      ["Catering", "Catering"],
      ["Tutoring", "Tutoring"],
    ],
    "Mobile Phones": [
      ["iPhone", "iPhone"],
      ["Samsung", "Samsung"],
      ["Google Pixel", "Google Pixel"],
      ["OnePlus", "OnePlus"],
    ],
    "Health & Beauty": [
      ["Skincare", "Skincare"],
      ["Haircare", "Haircare"],
      ["Makeup", "Makeup"],
      ["Fitness Equipment", "Fitness Equipment"],
    ],
    Sports: [
      ["Soccer", "Soccer"],
      ["Basketball", "Basketball"],
      ["Tennis", "Tennis"],
      ["Golf", "Golf"],
    ],
    Jobs: [
      ["IT", "IT"],
      ["Sales", "Sales"],
      ["Marketing", "Marketing"],
      ["Administrative", "Administrative"],
    ],
    "Babies and Kids": [
      ["Toys", "Toys"],
      ["Clothing Kids", "Clothing"],
      ["Strollers", "Strollers"],
    ],
    "Agric & Food": [
      ["Farm Products", "Farm Products"],
      ["Processed Food", "Processed Food"],
      ["Beverages", "Beverages"],
    ],
    Repairs: [
      ["Electronic Repair", "Electronic Repair"],
      ["Appliance Repair", "Appliance Repair"],
      ["Car Repair", "Car Repair"],
    ],
    "Equipment & Tools": [
      ["Power Tools", "Power Tools"],
      ["Hand Tools", "Hand Tools"],
      ["Kitchen Tools", "Kitchen Tools"],
    ],
    CVs: [
      ["Engineering", "Engineering"],
      ["Marketing CVs", "Marketing"],
      ["Design", "Design"],
      ["Education", "Education"],
    ],
    Pets: [
      ["Dog", "Dog"],
      ["Cat", "Cat"],
      ["Fish", "Fish"],
      ["Bird", "Bird"],
    ],
    Others: [["Others", "Others"]],
  };

  const CURRENCY_CHOICES = [
    ["NGN", "Nigerian Naira"],
    ["USD", "United States Dollar"],
    ["CAD", "Canadian Dollar"],
    ["EUR", "Euro"],
    ["GBP", "British Pound Sterling"],
    ["INR", "Indian Rupee"],
    ["ZAR", "South African Rand"],
    ["GHS", "Ghanaian Cedi"],
    ["CNY", "Chinese Yuan"],
    ["AED", "United Arab Emirates Dirham"],
    ["AUD", "Australian Dollar"],
    ["BRL", "Brazilian Real"],
    ["JPY", "Japanese Yen"],
    ["KES", "Kenyan Shilling"],
    ["SAR", "Saudi Riyal"],
    // Additional currencies
    ["AFN", "Afghan Afghani"],
    ["ALL", "Albanian Lek"],
    ["AMD", "Armenian Dram"],
    ["ANG", "Netherlands Antillean Guilder"],
    ["AOA", "Angolan Kwanza"],
    ["ARS", "Argentine Peso"],
    ["AWG", "Aruban Florin"],
    ["AZN", "Azerbaijani Manat"],
    ["BAM", "Bosnia-Herzegovina Convertible Mark"],
    ["BBD", "Barbadian Dollar"],
    ["BDT", "Bangladeshi Taka"],
    ["BGN", "Bulgarian Lev"],
    ["BHD", "Bahraini Dinar"],
    ["BIF", "Burundian Franc"],
    ["BMD", "Bermudian Dollar"],
    ["BND", "Brunei Dollar"],
    ["BOB", "Bolivian Boliviano"],
    ["BSD", "Bahamian Dollar"],
    ["BTN", "Bhutanese Ngultrum"],
    ["BWP", "Botswanan Pula"],
    ["BYN", "Belarusian Ruble"],
    ["BZD", "Belize Dollar"],
    ["CDF", "Congolese Franc"],
    ["CHF", "Swiss Franc"],
    ["CLP", "Chilean Peso"],
    ["CNY", "Chinese Yuan"],
    ["COP", "Colombian Peso"],
    ["CRC", "Costa Rican Colón"],
    ["CUP", "Cuban Peso"],
    ["CVE", "Cape Verdean Escudo"],
    ["CZK", "Czech Republic Koruna"],
    ["DJF", "Djiboutian Franc"],
    ["DKK", "Danish Krone"],
    ["DOP", "Dominican Peso"],
    ["DZD", "Algerian Dinar"],
    ["EGP", "Egyptian Pound"],
    ["ERN", "Eritrean Nakfa"],
    ["ETB", "Ethiopian Birr"],
    ["FJD", "Fijian Dollar"],
    ["FKP", "Falkland Islands Pound"],
    ["FOK", "Faroe Islands Króna"],
    ["GEL", "Georgian Lari"],
    ["GGP", "Guernsey Pound"],
    ["GIP", "Gibraltar Pound"],
    ["GMD", "Gambian Dalasi"],
    ["GNF", "Guinean Franc"],
    ["GTQ", "Guatemalan Quetzal"],
    ["GYD", "Guyanaese Dollar"],
    ["HKD", "Hong Kong Dollar"],
    ["HNL", "Honduran Lempira"],
    ["HRK", "Croatian Kuna"],
    ["HTG", "Haitian Gourde"],
    ["HUF", "Hungarian Forint"],
    ["IDR", "Indonesian Rupiah"],
    ["ILS", "Israeli New Shekel"],
    ["IMP", "Isle of Man Pound"],
    ["IQD", "Iraqi Dinar"],
    ["IRR", "Iranian Rial"],
    ["ISK", "Icelandic Króna"],
    ["JEP", "Jersey Pound"],
    ["JMD", "Jamaican Dollar"],
    ["JOD", "Jordanian Dinar"],
    ["KGS", "Kyrgystani Som"],
    ["KHR", "Cambodian Riel"],
    ["KID", "Kiribati Dollar"],
    ["KWD", "Kuwaiti Dinar"],
    ["KYD", "Cayman Islands Dollar"],
    ["KZT", "Kazakhstani Tenge"],
    ["LAK", "Laotian Kip"],
    ["LBP", "Lebanese Pound"],
    ["LKR", "Sri Lankan Rupee"],
    ["LRD", "Liberian Dollar"],
    ["LSL", "Lesotho Loti"],
    ["LYD", "Libyan Dinar"],
    ["MAD", "Moroccan Dirham"],
    ["MDL", "Moldovan Leu"],
    ["MGA", "Malagasy Ariary"],
    ["MKD", "Macedonian Denar"],
    ["MMK", "Myanma Kyat"],
    ["MNT", "Mongolian Tugrik"],
    ["MOP", "Macanese Pataca"],
    ["MRU", "Mauritanian Ouguiya"],
    ["MUR", "Mauritian Rupee"],
    ["MVR", "Maldivian Rufiyaa"],
    ["MWK", "Malawian Kwacha"],
    ["MXN", "Mexican Peso"],
    ["MYR", "Malaysian Ringgit"],
    ["MZN", "Mozambican Metical"],
    ["NAD", "Namibian Dollar"],
    ["NIO", "Nicaraguan Córdoba"],
    ["NOK", "Norwegian Krone"],
    ["NPR", "Nepalese Rupee"],
    ["NZD", "New Zealand Dollar"],
    ["OMR", "Omani Rial"],
    ["PAB", "Panamanian Balboa"],
    ["PEN", "Peruvian Nuevo Sol"],
    ["PGK", "Papua New Guinean Kina"],
    ["PHP", "Philippine Peso"],
    ["PKR", "Pakistani Rupee"],
    ["PLN", "Polish Złoty"],
    ["PYG", "Paraguayan Guarani"],
    ["QAR", "Qatari Rial"],
    ["RON", "Romanian Leu"],
    ["RSD", "Serbian Dinar"],
    ["RUB", "Russian Ruble"],
    ["RWF", "Rwandan Franc"],
    ["SBD", "Solomon Islands Dollar"],
    ["SCR", "Seychellois Rupee"],
    ["SDG", "Sudanese Pound"],
    ["SEK", "Swedish Krona"],
    ["SGD", "Singapore Dollar"],
    ["SHP", "Saint Helena Pound"],
    ["SLL", "Sierra Leonean Leone"],
    ["SOS", "Somali Shilling"],
    ["SRD", "Surinamese Dollar"],
    ["SSP", "South Sudanese Pound"],
    ["STN", "São Tomé and Príncipe Dobra"],
    ["SYP", "Syrian Pound"],
    ["SZL", "Swazi Lilangeni"],
    ["TJS", "Tajikistani Somoni"],
    ["TMT", "Turkmenistani Manat"],
    ["TND", "Tunisian Dinar"],
    ["TOP", "Tongan Paʻanga"],
    ["TRY", "Turkish Lira"],
    ["TTD", "Trinidad and Tobago Dollar"],
    ["TVD", "Tuvaluan Dollar"],
    ["TWD", "New Taiwan Dollar"],
    ["TZS", "Tanzanian Shilling"],
    ["UAH", "Ukrainian Hryvnia"],
    ["UGX", "Ugandan Shilling"],
    ["UYU", "Uruguayan Peso"],
    ["UZS", "Uzbekistan Som"],
    ["VES", "Venezuelan Bolívar"],
    ["VND", "Vietnamese Đồng"],
    ["VUV", "Vanuatu Vatu"],
    ["WST", "Samoan Tala"],
    ["XAF", "Central African CFA Franc"],
    ["XCD", "Eastern Caribbean Dollar"],
    ["XDR", "Special Drawing Rights"],
    ["XOF", "West African CFA franc"],
    ["XPF", "CFP Franc"],
    ["YER", "Yemeni Rial"],
    ["ZMW", "Zambian Kwacha"],
  ];

  const sellerData = new FormData();
  sellerData.append("ad_name", adName);
  sellerData.append("ad_category", adCategory);
  sellerData.append("ad_type", adType);
  sellerData.append("country", country.isoCode);
  sellerData.append("state_province", stateProvince.isoCode);
  sellerData.append("city", city.name);
  sellerData.append("condition", condition);
  sellerData.append("price", price);
  sellerData.append("currency", currency);
  sellerData.append("brand", brand);
  sellerData.append("description", description);
  sellerData.append("count_in_stock", countInStock);
  sellerData.append("youtube_link", youtubeLink);
  sellerData.append("image1", image1);
  sellerData.append("image2", image2);
  sellerData.append("image3", image3);
  sellerData.append("duration", duration);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        // history.push("/seller/bank");
        window.location.reload();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success, history]);

  const handlePostPaidAd = () => {
    history.push("/ad/paid");
    // window.location.href = "/ad/paid";
  };

  const handlePostFreeAd = (e) => {
    e.preventDefault(e);

    if (!adName) {
      setAdNameError("Please enter the ad name.");
    } else {
      setAdNameError("");
    }

    if (!adCategory) {
      setAdCategoryError("Please select the ad category.");
    } else {
      setAdCategoryError("");
    }

    if (!adType) {
      setAdTypeError("Please select the ad type.");
    } else {
      setAdTypeError("");
    }

    // if (!location) {
    //   setLocationError("Please enter ad location.");
    // } else {
    //   setLocationError("");
    // }

    // if (!condition) {
    //   setConditionError("Please enter ad condtion.");
    // } else {
    //   setPriceError("");
    // }

    if (!country) {
      setCountryError("Please enter ad country.");
    } else {
      setCountryError("");
    }

    if (!stateProvince) {
      setStateProvinceError("Please enter ad state/province.");
    } else {
      setStateProvinceError("");
    }

    if (!city) {
      setCityError("Please enter ad city.");
    } else {
      setCityError("");
    }

    if (!currency) {
      setCurrencyError("Please select currency.");
    } else {
      setCurrencyError("");
    }

    if (!price) {
      setPriceError("Please enter ad price.");
    } else {
      setPriceError("");
    }

    if (!description) {
      setDescriptionError("Please enter the description.");
    } else {
      setDescriptionError("");
    }

    if (!image1) {
      setImage1Error("Please upload the ad image.");
    } else {
      setImage1Error("");
    }

    if (!duration) {
      setDurationError("Please select the ad duration.");
    } else {
      setDurationError("");
    }

    if (
      !adName ||
      !adCategory ||
      !adType ||
      // !location ||
      !country ||
      !stateProvince ||
      !city ||
      !currency ||
      !price ||
      !description ||
      !image1 ||
      !duration
    ) {
      setFormError("Please fix the errors in the form.");
      return;
    } else {
      dispatch(postFreeAd(sellerData));
    }
  };

  return (
    <Container>
      <Row className="justify-content-center py-2">
        <Col xs={12} md={6}>
          <h2 className="text-center py-2">Post Free Ad</h2>
          {loading && <Loader />}

          {success && (
            <Message variant="success" fixed>
              Ad created successfully.
            </Message>
          )}

          {error && (
            <Message variant="danger" fixed>
              {error}
            </Message>
          )}
          {formError && (
            <Message variant="danger" fixed>
              {formError}
            </Message>
          )}

          <Form>
            <Form.Group>
              <Form.Label>Ad Name*</Form.Label>
              <Form.Control
                type="text"
                value={adName}
                onChange={(e) => handleFieldChange("adName", e.target.value)}
                placeholder="Enter the ad name"
                className="rounded py-2 mb-2"
                required
                maxLength={100}
              />
              <Form.Text className="text-danger">{adNameError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Ad Category*</Form.Label>
              <Select
                options={AD_CATEGORY_CHOICES.map(([value, label]) => ({
                  value,
                  label,
                }))}
                value={{ value: adCategory, label: adCategory }}
                onChange={handleCategoryChange}
                placeholder="Select Category"
                className="rounded py-2 mb-2"
                required
              />
              <Form.Text className="text-danger">{adCategoryError}</Form.Text>
            </Form.Group>

            {adCategory && (
              <Form.Group>
                <Form.Label>Ad Type*</Form.Label>
                <Select
                  options={AD_TYPE_CHOICES[adCategory].map(
                    ([value, label]) => ({
                      value,
                      label,
                    })
                  )}
                  value={{ value: adType, label: adType }}
                  onChange={handleTypeChange}
                  placeholder="Select Type"
                  className="rounded py-2 mb-2"
                  required
                />
                <Form.Text className="text-danger">{adTypeError}</Form.Text>
              </Form.Group>
            )}

            <Form.Group>
              <Form.Label>Ad Country*</Form.Label>
              <Select
                options={countries.map((country) => ({
                  value: country.isoCode,
                  label: country.name,
                }))}
                value={{ value: country.isoCode, label: country.name }}
                onChange={(selectedOption) => {
                  handleFieldChange("country", {
                    isoCode: selectedOption.value,
                    name: selectedOption.label,
                  });
                }}
                placeholder="Select Country"
                className="rounded py-2 mb-2"
                required
              />
              <Form.Text className="text-danger">{countryError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Ad State/Province*</Form.Label>
              <Select
                options={states.map((state) => ({
                  value: state.isoCode,
                  label: state.name,
                }))}
                value={{
                  value: stateProvince.isoCode,
                  label: stateProvince.name,
                }}
                onChange={(selectedOption) => {
                  handleFieldChange("stateProvince", {
                    isoCode: selectedOption.value,
                    name: selectedOption.label,
                  });
                }}
                placeholder="Select State/Province"
                className="rounded py-2 mb-2"
                required
              />
              <Form.Text className="text-danger">
                {stateProvinceError}
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Ad City*</Form.Label>
              <Select
                options={cities.map((city) => ({
                  value: city.name,
                  label: city.name,
                }))}
                value={{ value: city.name, label: city.name }}
                onChange={(selectedOption) => {
                  handleFieldChange("city", {
                    name: selectedOption.label,
                  });
                }}
                placeholder="Select City"
                className="rounded py-2 mb-2"
                required
              />
              <Form.Text className="text-danger">{cityError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Ad Condition</Form.Label>
              <Form.Control
                as="select"
                value={condition}
                onChange={(e) => handleFieldChange("condition", e.target.value)}
                className="rounded py-2 mb-2"
                required
              >
                <option value="">Select Ad Condition</option>
                {AD_CONDITION_CHOICES.map((type) => (
                  <option key={type[0]} value={type[0]}>
                    {type[1]}
                  </option>
                ))}
              </Form.Control>
              {/* <Form.Text className="text-danger">{conditionError}</Form.Text>
               */}
            </Form.Group>

            <Form.Group>
              <Form.Label>Currency*</Form.Label>
              <Form.Control
                as="select"
                value={currency}
                onChange={(e) => handleFieldChange("currency", e.target.value)}
                className="rounded py-2 mb-2"
                required
              >
                <option value="">Select Currency</option>
                {CURRENCY_CHOICES.map((type) => (
                  <option key={type[0]} value={type[0]}>
                    {type[1]}
                  </option>
                ))}
              </Form.Control>
              <Form.Text className="text-danger">{currencyError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Price*</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => handleFieldChange("price", e.target.value)}
                placeholder="Enter price"
                className="rounded py-2 mb-2"
                required
              />
              <Form.Text className="text-danger">{priceError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                value={brand}
                onChange={(e) => handleFieldChange("brand", e.target.value)}
                placeholder="Enter ad brand"
                className="rounded py-2 mb-2"
                maxLength={100}
              />
              {/* <Form.Text className="text-danger">{brandError}</Form.Text> */}
            </Form.Group>

            <Form.Group>
              <Form.Label>Number In Stock</Form.Label>
              <Form.Control
                type="number"
                value={countInStock}
                onChange={(e) =>
                  handleFieldChange("countInStock", e.target.value)
                }
                placeholder="Enter number of ad in stock"
                className="rounded py-2 mb-2"
                maxLength={100}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Youtube Link</Form.Label>
              <Form.Control
                type="text"
                value={youtubeLink}
                onChange={(e) =>
                  handleFieldChange("youtubeLink", e.target.value)
                }
                placeholder="Enter ad Youtube link"
                className="rounded py-2 mb-2"
                maxLength={225}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Image 1</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => handleFieldChange("image1", e.target.files[0])}
                placeholder="Upload the ID Card Photo"
                className="rounded py-2 mb-2"
              />
              <Form.Text className="text-danger">{image1Error}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Image 2</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => handleFieldChange("image2", e.target.files[0])}
                placeholder="Upload the ID Card Photo"
                className="rounded py-2 mb-2"
                maxLength={100}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Image 3</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => handleFieldChange("image3", e.target.files[0])}
                placeholder="Upload proof of address"
                className="rounded py-2 mb-2"
                maxLength={100}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Duration*</Form.Label>
              <Form.Control
                as="select"
                value={duration}
                onChange={(e) => handleFieldChange("duration", e.target.value)}
                className="rounded py-2 mb-2"
                required
              >
                <option value="">Select Ad Duration</option>
                {DURATION_CHOICES.map((type) => (
                  <option key={type[0]} value={type[0]}>
                    {type[1]}
                  </option>
                ))}
              </Form.Control>
              <Form.Text className="text-danger">{durationError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              {/* <Form.Control
                // type="text"
                as="textarea"
                rows={2}
                value={description}
                onChange={(e) =>
                  handleFieldChange("description", e.target.value)
                }
                placeholder="Enter ad description"
                className="rounded py-2 mb-2"
                required
                maxLength={2000}
              /> */}

              <ReactQuill
                value={description}
                onChange={(value) => handleFieldChange("description", value)}
                placeholder="Enter ad description"
                className="rounded py-2 mb-2"
                modules={modules}
                formats={formats}
                maxLength={4000}
                required
              />

              <Form.Text className="text-danger">{descriptionError}</Form.Text>
            </Form.Group>
          </Form>
          <div className="py-2">
            <Button
              variant="success"
              onClick={handlePostFreeAd}
              className="rounded py-2 mb-2 text-center w-100"
              disabled={loading || success}
            >
              <div className="d-flex justify-content-center">
                <span className="py-1">Post Free Ad</span>
                {loading && <LoaderButton />}
              </div>
            </Button>
          </div>
        </Col>
        <div className="d-flex justify-content-end py-2 mt-2">
          <Button
            variant="outline-danger"
            onClick={handlePostPaidAd}
            className="rounded"
            size="sm"
            disabled={loading || success}
          >
            Post Promoted Ad
          </Button>
        </div>
      </Row>
    </Container>
  );
}

export default PostFreeAd;
