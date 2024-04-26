// CreateMarketplaceSeller.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { createMarketplaceSeller } from "../../actions/marketplaceSellerActions";
import Message from "../Message";
import Loader from "../Loader";
import DatePicker from "react-datepicker";
import LoaderButton from "../LoaderButton";
import Select from "react-select";
// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";

function CreateMarketplaceSeller({ history }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  const marketplaceSellerState = useSelector(
    (state) => state.marketplaceSellerState
  );
  const { success, error, loading } = marketplaceSellerState;

  // const [selectedCountry] = useState("US");
  const [businessName, setBusinessName] = useState("");
  const [businessRegNum, setBusinessRegNum] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [staffSize, setStaffSize] = useState("");
  const [businessIndustry, setBusinessIndustry] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");

  const [businessPhone, setBusinessPhone] = useState("");
  const [businessPhoneError, setBusinessPhoneError] = useState("");

  const [businessWebsite, setBusinessWebsite] = useState("");
  const [country, setCountry] = useState("");

  const [businessNameError, setBusinessNameError] = useState("");
  const [businessAddressError, setBusinessAddressError] = useState("");
  const [businessTypeError, setBusinessTypeError] = useState("");
  const [staffSizeError, setStaffSizeError] = useState("");
  const [businessIndustryError, setBusinessIndustryError] = useState("");
  const [businessCategoryError, setBusinessCategoryError] = useState("");
  const [countryError, setCountryError] = useState("");

  const [idType, setIdType] = useState("");
  const [idTypeError, setIdTypeError] = useState("");

  const [idNumber, setIdNumber] = useState("");
  const [idNumberError, setIdNumberError] = useState("");

  const [idCardImage, setIdCardImage] = useState("");
  const [idCardImageError, setIdCardImageError] = useState("");

  const [dob, setDob] = useState("");
  const [dobError, setDobError] = useState("");

  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");

  const [formError, setFormError] = useState("");

  const handleFieldChange = (fieldName, value) => {
    switch (fieldName) {
      case "businessName":
        setBusinessName(value);
        setBusinessNameError("");
        break;

      case "businessRegNum":
        setBusinessRegNum(value);
        break;

      case "businessAddress":
        setBusinessAddress(value);
        setBusinessAddressError("");
        break;

      case "businessType":
        setBusinessType(value);
        setBusinessTypeError("");
        break;
      case "staffSize":
        setStaffSize(value);
        setStaffSizeError("");
        break;
      case "businessIndustry":
        setBusinessIndustry(value);
        setBusinessIndustryError("");
        break;
      case "businessCategory":
        setBusinessCategory(value);
        setBusinessCategoryError("");
        break;

      case "businessPhone":
        setBusinessPhone(value);
        setBusinessPhoneError("");
        break;

      case "country":
        setCountry(value);
        setCountryError("");
        break;

      case "idType":
        setIdType(value);
        setIdTypeError("");
        break;

      case "idNumber":
        setIdNumber(value);
        setIdNumberError("");
        break;
      case "idCardImage":
        setIdCardImage(value);
        setIdCardImageError("");
        break;
      case "dob":
        setDob(value);
        setDobError("");
        break;
      case "address":
        setAddress(value);
        setAddressError("");
        break;

      default:
        break;
    }
  };

  const BUSINESS_TYPE_CHOICES = [
    ["Registered", "Registered"],
    ["Unregistered", "Unregistered"],
  ];

  const STAFF_SIZE_CHOICES = [
    ["Small", "Small (1-50 employees)"],
    ["Medium", "Medium (51-250 employees)"],
    ["Large", "Large (251+ employees)"],
  ];

  const BUSINESS_INDUSTRY_CHOICES = [
    ["Information Technology", "Information Technology"],
    ["Healthcare", "Healthcare"],
    ["Finance", "Finance"],
    ["Education", "Education"],
    ["Retail", "Retail"],
    ["Manufacturing", "Manufacturing"],
    ["Services", "Services"],
    ["Entertainment", "Entertainment"],
    ["Food & Beverage", "Food & Beverage"],
    ["Travel & Tourism", "Travel & Tourism"],
    ["Real Estate", "Real Estate"],
    ["Construction", "Construction"],
    ["Automotive", "Automotive"],
    ["Agriculture", "Agriculture"],
    ["Energy", "Energy"],
    ["Environmental", "Environmental"],
    ["Government", "Government"],
    ["Nonprofit", "Nonprofit"],
    ["Others", "Others"],
  ];

  const BUSINESS_CATEGORY_CHOICES = [
    ["Startup", "Startup"],
    ["Small Business", "Small Business"],
    ["Medium Business", "Medium Business"],
    ["Large Business", "Large Business"],
    ["Corporation", "Corporation"],
    ["Sole Proprietorship", "Sole Proprietorship"],
    ["Partnership", "Partnership"],
    ["Franchise", "Franchise"],
    ["Family Owned", "Family Owned"],
    ["Online Business", "Online Business"],
    ["Brick and Mortar", "Brick and Mortar"],
    ["Service Provider", "Service Provider"],
    ["Retailer", "Retailer"],
    ["Wholesaler", "Wholesaler"],
    ["Manufacturer", "Manufacturer"],
    ["Restaurant", "Restaurant"],
    ["Hospitality", "Hospitality"],
    ["Healthcare", "Healthcare"],
    ["Education", "Education"],
    ["Tech", "Tech"],
    ["Creative", "Creative"],
    ["Entertainment", "Entertainment"],
    ["Travel", "Travel"],
    ["Construction", "Construction"],
    ["Automotive", "Automotive"],
    ["Agriculture", "Agriculture"],
    ["Energy", "Energy"],
    ["Environmental", "Environmental"],
    ["Government", "Government"],
    ["Nonprofit", "Nonprofit"],
    ["Others", "Others"],
  ];

  const ID_TYPE_CHOICES = [
    // ["NIN", "NIN"],
    ["Intl Passport", "Int'l Passport"],
    ["Driving License", "Driving License"],
    ["Govt Issued ID", "Govt Issued ID"],
  ];

  const COUNTRY_CHOICES = [
    ["Afghanistan", "Afghanistan"],
    ["Albania", "Albania"],
    ["Algeria", "Algeria"],
    ["Andorra", "Andorra"],
    ["Angola", "Angola"],
    ["Antigua and Barbuda", "Antigua and Barbuda"],
    ["Argentina", "Argentina"],
    ["Armenia", "Armenia"],
    ["Australia", "Australia"],
    ["Austria", "Austria"],
    ["Azerbaijan", "Azerbaijan"],
    ["Bahamas", "Bahamas"],
    ["Bahrain", "Bahrain"],
    ["Bangladesh", "Bangladesh"],
    ["Barbados", "Barbados"],
    ["Belarus", "Belarus"],
    ["Belgium", "Belgium"],
    ["Belize", "Belize"],
    ["Benin", "Benin"],
    ["Bhutan", "Bhutan"],
    ["Bolivia", "Bolivia"],
    ["Bosnia and Herzegovina", "Bosnia and Herzegovina"],
    ["Botswana", "Botswana"],
    ["Brazil", "Brazil"],
    ["Brunei", "Brunei"],
    ["Bulgaria", "Bulgaria"],
    ["Burkina Faso", "Burkina Faso"],
    ["Burundi", "Burundi"],
    ["Cabo Verde", "Cabo Verde"],
    ["Cambodia", "Cambodia"],
    ["Cameroon", "Cameroon"],
    ["Canada", "Canada"],
    ["Central African Republic", "Central African Republic"],
    ["Chad", "Chad"],
    ["Chile", "Chile"],
    ["China", "China"],
    ["Colombia", "Colombia"],
    ["Comoros", "Comoros"],
    ["Congo", "Congo"],
    ["Costa Rica", "Costa Rica"],
    ["Croatia", "Croatia"],
    ["Cuba", "Cuba"],
    ["Cyprus", "Cyprus"],
    ["Czech Republic", "Czech Republic"],
    ["Denmark", "Denmark"],
    ["Djibouti", "Djibouti"],
    ["Dominica", "Dominica"],
    ["Dominican Republic", "Dominican Republic"],
    ["Ecuador", "Ecuador"],
    ["Egypt", "Egypt"],
    ["El Salvador", "El Salvador"],
    ["Equatorial Guinea", "Equatorial Guinea"],
    ["Eritrea", "Eritrea"],
    ["Estonia", "Estonia"],
    ["Eswatini", "Eswatini"],
    ["Ethiopia", "Ethiopia"],
    ["Fiji", "Fiji"],
    ["Finland", "Finland"],
    ["France", "France"],
    ["Gabon", "Gabon"],
    ["Gambia", "Gambia"],
    ["Georgia", "Georgia"],
    ["Germany", "Germany"],
    ["Ghana", "Ghana"],
    ["Greece", "Greece"],
    ["Grenada", "Grenada"],
    ["Guatemala", "Guatemala"],
    ["Guinea", "Guinea"],
    ["Guinea-Bissau", "Guinea-Bissau"],
    ["Guyana", "Guyana"],
    ["Haiti", "Haiti"],
    ["Honduras", "Honduras"],
    ["Hungary", "Hungary"],
    ["Iceland", "Iceland"],
    ["India", "India"],
    ["Indonesia", "Indonesia"],
    ["Iran", "Iran"],
    ["Iraq", "Iraq"],
    ["Ireland", "Ireland"],
    ["Israel", "Israel"],
    ["Italy", "Italy"],
    ["Jamaica", "Jamaica"],
    ["Japan", "Japan"],
    ["Jordan", "Jordan"],
    ["Kazakhstan", "Kazakhstan"],
    ["Kenya", "Kenya"],
    ["Kiribati", "Kiribati"],
    ["Korea, North", "Korea, North"],
    ["Korea, South", "Korea, South"],
    ["Kosovo", "Kosovo"],
    ["Kuwait", "Kuwait"],
    ["Kyrgyzstan", "Kyrgyzstan"],
    ["Laos", "Laos"],
    ["Latvia", "Latvia"],
    ["Lebanon", "Lebanon"],
    ["Lesotho", "Lesotho"],
    ["Liberia", "Liberia"],
    ["Libya", "Libya"],
    ["Liechtenstein", "Liechtenstein"],
    ["Lithuania", "Lithuania"],
    ["Luxembourg", "Luxembourg"],
    ["Madagascar", "Madagascar"],
    ["Malawi", "Malawi"],
    ["Malaysia", "Malaysia"],
    ["Maldives", "Maldives"],
    ["Mali", "Mali"],
    ["Malta", "Malta"],
    ["Marshall Islands", "Marshall Islands"],
    ["Mauritania", "Mauritania"],
    ["Mauritius", "Mauritius"],
    ["Mexico", "Mexico"],
    ["Micronesia", "Micronesia"],
    ["Moldova", "Moldova"],
    ["Monaco", "Monaco"],
    ["Mongolia", "Mongolia"],
    ["Montenegro", "Montenegro"],
    ["Morocco", "Morocco"],
    ["Mozambique", "Mozambique"],
    ["Myanmar", "Myanmar"],
    ["Namibia", "Namibia"],
    ["Nauru", "Nauru"],
    ["Nepal", "Nepal"],
    ["Netherlands", "Netherlands"],
    ["New Zealand", "New Zealand"],
    ["Nicaragua", "Nicaragua"],
    ["Niger", "Niger"],
    ["Nigeria", "Nigeria"],
    ["North Macedonia", "North Macedonia"],
    ["Norway", "Norway"],
    ["Oman", "Oman"],
    ["Pakistan", "Pakistan"],
    ["Palau", "Palau"],
    ["Panama", "Panama"],
    ["Papua New Guinea", "Papua New Guinea"],
    ["Paraguay", "Paraguay"],
    ["Peru", "Peru"],
    ["Philippines", "Philippines"],
    ["Poland", "Poland"],
    ["Portugal", "Portugal"],
    ["Qatar", "Qatar"],
    ["Romania", "Romania"],
    ["Russia", "Russia"],
    ["Rwanda", "Rwanda"],
    ["Saint Kitts and Nevis", "Saint Kitts and Nevis"],
    ["Saint Lucia", "Saint Lucia"],
    ["Saint Vincent and the Grenadines", "Saint Vincent and the Grenadines"],
    ["Samoa", "Samoa"],
    ["San Marino", "San Marino"],
    ["Sao Tome and Principe", "Sao Tome and Principe"],
    ["Saudi Arabia", "Saudi Arabia"],
    ["Senegal", "Senegal"],
    ["Serbia", "Serbia"],
    ["Seychelles", "Seychelles"],
    ["Sierra Leone", "Sierra Leone"],
    ["Singapore", "Singapore"],
    ["Slovakia", "Slovakia"],
    ["Slovenia", "Slovenia"],
    ["Solomon Islands", "Solomon Islands"],
    ["Somalia", "Somalia"],
    ["South Africa", "South Africa"],
    ["South Sudan", "South Sudan"],
    ["Spain", "Spain"],
    ["Sri Lanka", "Sri Lanka"],
    ["Sudan", "Sudan"],
    ["Suriname", "Suriname"],
    ["Sweden", "Sweden"],
    ["Switzerland", "Switzerland"],
    ["Syria", "Syria"],
    ["Taiwan", "Taiwan"],
    ["Tajikistan", "Tajikistan"],
    ["Tanzania", "Tanzania"],
    ["Thailand", "Thailand"],
    ["Timor-Leste", "Timor-Leste"],
    ["Togo", "Togo"],
    ["Tonga", "Tonga"],
    ["Trinidad and Tobago", "Trinidad and Tobago"],
    ["Tunisia", "Tunisia"],
    ["Turkey", "Turkey"],
    ["Turkmenistan", "Turkmenistan"],
    ["Tuvalu", "Tuvalu"],
    ["Uganda", "Uganda"],
    ["Ukraine", "Ukraine"],
    ["United Arab Emirates", "United Arab Emirates"],
    ["United Kingdom", "United Kingdom"],
    ["United States", "United States"],
    ["Uruguay", "Uruguay"],
    ["Uzbekistan", "Uzbekistan"],
    ["Vanuatu", "Vanuatu"],
    ["Vatican City", "Vatican City"],
    ["Venezuela", "Venezuela"],
    ["Vietnam", "Vietnam"],
    ["Yemen", "Yemen"],
    ["Zambia", "Zambia"],
    ["Zimbabwe", "Zimbabwe"],
  ];

  const sellerData = new FormData();
  sellerData.append("business_name", businessName);
  sellerData.append("business_reg_num", businessRegNum);
  sellerData.append("business_address", businessAddress);
  sellerData.append("business_status", businessType);
  sellerData.append("staff_size", staffSize);
  sellerData.append("business_industry", businessIndustry);
  sellerData.append("business_category", businessCategory);
  sellerData.append("business_description", businessDescription);
  sellerData.append("business_website", businessWebsite);
  sellerData.append("business_phone", businessPhone);
  sellerData.append("country", country);
  sellerData.append("id_type", idType);
  sellerData.append("id_number", idNumber);
  sellerData.append("id_card_image", idCardImage);
  sellerData.append("dob", dob);
  sellerData.append("home_address", address);

  console.log("businessPhone:", businessPhone);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        history.push("/seller/photo");
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success, history]);

  const handleCreateMarketplaceSeller = (e) => {
    e.preventDefault(e);

    if (!businessName) {
      setBusinessNameError("Please enter the business name.");
    } else {
      setBusinessNameError("");
    }

    if (!businessAddress) {
      setBusinessAddressError("Please enter the business address.");
    } else {
      setBusinessAddressError("");
    }

    if (!businessType) {
      setBusinessTypeError("Please select the business type.");
    } else {
      setBusinessTypeError("");
    }

    if (!staffSize) {
      setStaffSizeError("Please select the staff size.");
    } else {
      setStaffSizeError("");
    }

    if (!businessIndustry) {
      setBusinessIndustryError("Please select the business industry.");
    } else {
      setBusinessIndustryError("");
    }

    if (!businessCategory) {
      setBusinessCategoryError("Please select the business category.");
    } else {
      setBusinessCategoryError("");
    }

    // if (!businessPhone) {
    //   setBusinessPhoneError("Please enter the business phone.");
    // } else {
    //   setBusinessPhoneError("");
    // }

    if (!businessPhone) {
      setBusinessPhoneError("Please enter your phone number.");
    } else if (businessPhone.length < 9) {
      setBusinessPhoneError("Phone number must be at least 9 digits.");
    } else {
      setBusinessPhoneError("");
    }

    if (!country) {
      setCountryError("Please enter the country.");
    } else {
      setCountryError("");
    }

    if (!idType) {
      setIdTypeError("Please select the ID type.");
    } else {
      setIdTypeError("");
    }

    if (!idNumber) {
      setIdNumberError("Please enter the ID  number.");
    } else {
      setIdNumberError("");
    }

    if (!idCardImage) {
      setIdCardImageError("Please upload the ID card Photo.");
    } else {
      setIdCardImageError("");
    }

    if (!dob) {
      setDobError("Please enter your date of birth.");
    } else {
      setDobError("");
    }

    if (!address) {
      setAddressError("Please enter your home address.");
    } else {
      setAddressError("");
    }

    if (
      !idType ||
      !idNumber ||
      !idCardImage ||
      !dob ||
      !address ||
      !businessName ||
      !businessAddress ||
      !businessType ||
      !staffSize ||
      !businessIndustry ||
      !businessCategory ||
      !businessPhone ||
      !country
    ) {
      setFormError("Please fix the errors in the form.");
      return;
    } else {
      setDobError("");
      dispatch(createMarketplaceSeller(sellerData));
    }
  };

  return (
    <Container>
      <Row className="justify-content-center py-2">
        <Col xs={12} md={6}>
          <h2 className="text-center py-2">Seller Registration</h2>
          {loading && <Loader />}

          {success && (
            <Message variant="success" fixed>
              Form submitted successfully.
            </Message>
          )}
          {error && (
            <Message variant="danger" fixed>
              {error}
            </Message>
          )}

          <Form>
            <Form.Group>
              <Form.Label>Business Name*</Form.Label>
              <Form.Control
                type="text"
                value={businessName}
                onChange={(e) =>
                  handleFieldChange("businessName", e.target.value)
                }
                placeholder="Enter business name"
                className="rounded py-2 mb-2"
                required
                maxLength={100}
              />
              <Form.Text className="text-danger">{businessNameError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Business Status*</Form.Label>
              <Form.Control
                as="select"
                value={businessType}
                onChange={(e) =>
                  handleFieldChange("businessType", e.target.value)
                }
                className="rounded py-2 mb-2"
                required
              >
                <option value="">Select Business Status</option>
                {BUSINESS_TYPE_CHOICES.map((type) => (
                  <option key={type[0]} value={type[0]}>
                    {type[1]}
                  </option>
                ))}
              </Form.Control>
              <Form.Text className="text-danger">{businessTypeError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Business Registration Number</Form.Label>
              <Form.Control
                type="text"
                value={businessRegNum}
                onChange={(e) =>
                  handleFieldChange("businessRegNum", e.target.value)
                }
                placeholder="Enter business registration number"
                className="rounded py-2 mb-2"
                maxLength={50}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Business Industry*</Form.Label>
              <Form.Control
                as="select"
                value={businessIndustry}
                onChange={(e) =>
                  handleFieldChange("businessIndustry", e.target.value)
                }
                className="rounded py-2 mb-2"
                required
              >
                <option value="">Select Business Industry</option>
                {BUSINESS_INDUSTRY_CHOICES.map((industry) => (
                  <option key={industry[0]} value={industry[0]}>
                    {industry[1]}
                  </option>
                ))}
              </Form.Control>
              <Form.Text className="text-danger">
                {businessIndustryError}
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Business Category*</Form.Label>
              <Form.Control
                as="select"
                value={businessCategory}
                onChange={(e) =>
                  handleFieldChange("businessCategory", e.target.value)
                }
                className="rounded py-2 mb-2"
                required
              >
                <option value="">Select Business Category</option>
                {BUSINESS_CATEGORY_CHOICES.map((category) => (
                  <option key={category[0]} value={category[0]}>
                    {category[1]}
                  </option>
                ))}
              </Form.Control>
              <Form.Text className="text-danger">
                {businessCategoryError}
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Staff Size*</Form.Label>
              <Form.Control
                as="select"
                value={staffSize}
                onChange={(e) => handleFieldChange("staffSize", e.target.value)}
                className="rounded py-2 mb-2"
                required
              >
                <option value="">Select Staff Size</option>
                {STAFF_SIZE_CHOICES.map((size) => (
                  <option key={size[0]} value={size[0]}>
                    {size[1]}
                  </option>
                ))}
              </Form.Control>
              <Form.Text className="text-danger">{staffSizeError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Business Phone</Form.Label>
              <Form.Control
                type="text"
                value={businessPhone}
                onChange={(e) =>
                  handleFieldChange("businessPhone", e.target.value)
                }
                // onChange={(e) => setBusinessPhone(e.target.value)}
                placeholder="Enter business phone"
                className="rounded py-2 mb-2"
                maxLength={18}
                required
              />

              {/* <PhoneInput
                country={selectedCountry}
                value={businessPhone}
                maxLength={18}
                onChange={(value) => {
                  setBusinessPhone(value);
                  handleFieldChange("businessPhone", value);
                }}
              />               */}
              <Form.Text className="text-danger">
                {businessPhoneError}
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Business Website</Form.Label>
              <Form.Control
                type="text"
                value={businessWebsite}
                onChange={(e) => setBusinessWebsite(e.target.value)}
                placeholder="Enter business description"
                className="rounded py-2 mb-2"
                maxLength={100}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Business Description</Form.Label>
              <Form.Control
                type="text"
                value={businessDescription}
                onChange={(e) => setBusinessDescription(e.target.value)}
                placeholder="Enter business description"
                className="rounded py-2 mb-2"
                maxLength={100}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Business Address*</Form.Label>
              <Form.Control
                type="text"
                value={businessAddress}
                onChange={(e) =>
                  handleFieldChange("businessAddress", e.target.value)
                }
                placeholder="Enter business address"
                className="rounded py-2 mb-2"
                maxLength={225}
                required
              />
              <Form.Text className="text-danger">
                {businessAddressError}
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Home Address*</Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => handleFieldChange("address", e.target.value)}
                placeholder="Enter home address"
                className="rounded py-2 mb-2"
                maxLength={225}
                required
              />
              <Form.Text className="text-danger">{addressError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Country*</Form.Label>
              {/* <Form.Control
                type="text"
                value={country}
                onChange={(e) => handleFieldChange("country", e.target.value)}
                placeholder="Enter country"
                className="rounded py-2 mb-2"
                maxLength={100}
                required
              /> */}

              <Select
                value={{ value: country, label: country }}
                onChange={(selectedOption) =>
                  handleFieldChange("country", selectedOption.value)
                }
                options={COUNTRY_CHOICES.map((type) => ({
                  value: type[0],
                  label: type[1],
                }))}
              />
              <Form.Text className="text-danger">{countryError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Personal ID Type*</Form.Label>
              <Form.Control
                as="select"
                value={idType}
                onChange={(e) => handleFieldChange("idType", e.target.value)}
                className="rounded py-2 mb-2"
                required
              >
                <option value="">ID Type</option>
                {ID_TYPE_CHOICES.map((type) => (
                  <option key={type[0]} value={type[0]}>
                    {type[1]}
                  </option>
                ))}
              </Form.Control>
              <Form.Text className="text-danger">{idTypeError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Personal ID Number*</Form.Label>
              <Form.Control
                type="text"
                value={idNumber}
                onChange={(e) => handleFieldChange("idNumber", e.target.value)}
                placeholder="Enter ID Number"
                className="rounded py-2 mb-2"
                required
                maxLength={100}
              />
              <Form.Text className="text-danger">{idNumberError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Personal ID Card Photo* </Form.Label>
              <Form.Control
                type="file"
                onChange={(e) =>
                  handleFieldChange("idCardImage", e.target.files[0])
                }
                placeholder="Upload the ID Card Photo"
                className="rounded py-2 mb-2"
                required
                maxLength={100}
              />
              <Form.Text className="text-danger">{idCardImageError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Date Of Birth*</Form.Label>
              {/* <Form.Control
                type="text"
                value={dob}
                onChange={(e) => handleFieldChange("dob", e.target.value)}
                placeholder="Enter date of birth"
                className="rounded py-2 mb-2"
                maxLength={50}
                required
              /> */}
              <div>
                <DatePicker
                  selected={dob ? new Date(dob) : null}
                  // onChange={(date) => setDob(date)}
                  onChange={(date) => {
                    setDob(date);
                    handleFieldChange("dob", date);
                  }}
                  dateFormat="dd/MM/yyyy"
                  className="rounded py-2 mb-2 form-control"
                  placeholderText="Select date of birth"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  scrollableMonthYearDropdown
                />
              </div>

              <Form.Text className="text-danger">{dobError}</Form.Text>
            </Form.Group>

            {formError && (
              <Message variant="danger" fixed>
                {formError}
              </Message>
            )}
            {/* {loading && <Loader />} */}
            {/* {success && (
              <Message variant="success" fixed>Form submitted successfully.</Message>
            )}
            {error && <Message variant="danger">{error}</Message>} */}
          </Form>
          <Button
            variant="primary"
            onClick={handleCreateMarketplaceSeller}
            className="rounded py-2 mb-2 text-center w-100"
            disabled={loading || success}
          >
            <span className="d-flex justify-content-center">
              {loading && <LoaderButton />} {"  "}Continue
            </span>
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateMarketplaceSeller;
