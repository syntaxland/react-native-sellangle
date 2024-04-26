// SellerProfile.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import {
  getSellerAccount,
  updateSellerAccount,
  getSellerPhoto,
  updateSellerPhoto,
  getSellerPaysofterApiKey,
  updateSellerPaysofterApiKey,
} from "../../actions/marketplaceSellerActions";
import { Form, Button, Row, Col, Container, Accordion } from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";
import LoaderButton from "../LoaderButton";
import DatePicker from "react-datepicker";
import { parseISO } from "date-fns";
import Select from "react-select";
// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";

function SellerProfile() {
  const dispatch = useDispatch();
  // const [selectedCountry] = useState("US");

  const getSellerAccountState = useSelector(
    (state) => state.getSellerAccountState
  );
  const {
    loading: getSellerAccountLoading,
    error: getSellerAccountError,
    sellerAccount,
  } = getSellerAccountState;
  // console.log("sellerAccount:", sellerAccount);

  const updateSellerAccountState = useSelector(
    (state) => state.updateSellerAccountState
  );
  const {
    loading: updateSellerAccountLoading,
    success: updateSellerAccountSuccess,
    error: updateSellerAccountError,
  } = updateSellerAccountState;

  const getSellerPhotoState = useSelector((state) => state.getSellerPhotoState);
  const { sellerPhoto } = getSellerPhotoState;
  // console.log("sellerPhoto:", sellerPhoto);

  const updateSellerPhotoState = useSelector(
    (state) => state.updateSellerPhotoState
  );
  const {
    loading: updateSellerPhotoLoading,
    success: updateSellerPhotoSuccess,
    error: updateSellerPhotoError,
  } = updateSellerPhotoState;

  const getSellerApiKeyState = useSelector(
    (state) => state.getSellerApiKeyState
  );
  const { sellerApiKey } = getSellerApiKeyState;
  // console.log("sellerApiKey:", sellerApiKey);

  const updateSellerApiKeyState = useSelector(
    (state) => state.updateSellerApiKeyState
  );
  const {
    loading: updateSellerApiKeyLoading,
    success: updateSellerApiKeySuccess,
    error: updateSellerApiKeyError,
  } = updateSellerApiKeyState;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

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

  const [businessDataChanges, setBusinessDataChanges] = useState(false);
  const [photoDataChanges, setPhotoDataChanges] = useState(false);
  const [sellerApiKeyDataChanges, setSellerApiKeyDataChanges] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [businessData, setBusinessData] = useState({
    business_name: "",
    business_status: "",
    business_reg_num: "",
    business_reg_cert: "",
    business_address: "",
    staff_size: "",
    business_industry: "",
    business_category: "",
    business_description: "",
    business_phone: "",
    business_website: "",
    country: "",
    id_type: "",
    id_number: "",
    id_card_image: "",
    dob: "",
    home_address: "",
  });

  const [photoData, setPhotoData] = useState({
    photo: "",
  });

  const [apiKeyData, setapiKeyData] = useState({
    live_api_key: "",
  });

  useEffect(() => {
    if (sellerAccount) {
      setBusinessData({
        business_name: sellerAccount?.business_name,
        business_reg_num: sellerAccount?.business_reg_num,
        business_reg_cert: sellerAccount?.business_reg_cert,
        business_address: sellerAccount?.business_address,
        business_status: sellerAccount?.business_status,
        staff_size: sellerAccount?.staff_size,
        business_industry: sellerAccount?.business_industry,
        business_category: sellerAccount?.business_category,
        business_description: sellerAccount?.business_description,
        business_phone: sellerAccount?.business_phone,
        business_website: sellerAccount?.business_website,
        country: sellerAccount?.country,
        id_type: sellerAccount?.id_type,
        id_number: sellerAccount?.id_number,
        id_card_image: sellerAccount?.id_card_image,
        dob: sellerAccount?.dob,
        home_address: sellerAccount?.home_address,
      });
      setBusinessDataChanges(false);
    }
  }, [sellerAccount]);

  const handleBusinessDataChanges = (e) => {
    const { name, value, files } = e.target;

    if (name === "dob" && typeof value === "string") {
      const parsedDate = parseISO(value);
      setBusinessData({ ...businessData, [name]: parsedDate });
    } else {
      if (files) {
        setBusinessData({ ...businessData, [name]: files[0] });
      } else {
        setBusinessData({ ...businessData, [name]: value });
      }
    }

    setBusinessDataChanges(true);
  };

  // const handleBusinessDataChanges = (e) => {
  //   const { name, value, files } = e.target;

  //   if (name === "dob" && typeof value === "string") {
  //     const parsedDate = parseISO(value);
  //     setBusinessData({ ...businessData, [name]: parsedDate });
  //   } else {
  //     if (files) {
  //       setBusinessData({ ...businessData, [name]: files[0] });
  //     } else {
  //       // Check if the field is 'country', if yes, provide a default value ('US' in this case)
  //       setBusinessData({
  //         ...businessData,
  //         [name]: name === "country" ? value || "US" : value,
  //       });
  //     }
  //   }

  //   if (name !== "country") {
  //     setBusinessDataChanges(true);
  //   }
  // };

  const handleUpdateBusinessAccount = () => {
    const businessFormData = new FormData();
    businessFormData.append("business_name", businessData.business_name);
    businessFormData.append("business_reg_num", businessData.business_reg_num);
    businessFormData.append("business_address", businessData.business_address);
    businessFormData.append("business_status", businessData.business_status);
    businessFormData.append("staff_size", businessData.staff_size);
    businessFormData.append("id_type", businessData.id_type);
    businessFormData.append("id_number", businessData.id_number);
    businessFormData.append("dob", businessData.dob);
    businessFormData.append("home_address", businessData.home_address);

    businessFormData.append(
      "business_industry",
      businessData.business_industry
    );
    businessFormData.append(
      "business_category",
      businessData.business_category
    );
    businessFormData.append(
      "business_description",
      businessData.business_description
    );
    businessFormData.append("business_phone", businessData?.business_phone);
    businessFormData.append("business_website", businessData.business_website);
    businessFormData.append("country", businessData.country);

    if (businessData.business_reg_cert instanceof File) {
      businessFormData.append(
        "business_reg_cert",
        businessData.business_reg_cert
      );
    }

    if (businessData.id_card_image instanceof File) {
      businessFormData.append("id_card_image", businessData.id_card_image);
    }

    // console.log("business_reg_cert:", businessData.business_reg_cert);
    // console.log("businessFormData:", businessFormData);

    dispatch(updateSellerAccount(businessFormData));
  };

  const handlePhotoInputChange = (e) => {
    const file = e.target.files[0];
    setPhotoData({ photo: file });
    setPhotoDataChanges(true);
  };

  useEffect(() => {
    if (sellerPhoto) {
      setPhotoData({
        photo: sellerPhoto?.photo,
      });
      setPhotoDataChanges(false);
    }
  }, [sellerPhoto]);

  const handleUpdatePhoto = () => {
    const photoFormData = new FormData();

    if (photoData.photo instanceof File) {
      photoFormData.append("photo", photoData.photo);
    }

    // console.log("photoFormData:", photoFormData);
    // console.log("photoData.photo:", photoData.photo);
    // console.log("photoData:", photoData);

    dispatch(updateSellerPhoto(photoFormData));
  };

  useEffect(() => {
    if (sellerApiKey) {
      setapiKeyData({
        live_api_key: sellerApiKey?.live_api_key,
      });
      setSellerApiKeyDataChanges(false);
    }
  }, [sellerApiKey]);

  const handleSellerApiKeyDataChanges = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setapiKeyData({ ...apiKeyData, [name]: files[0] });
    } else {
      setapiKeyData({ ...apiKeyData, [name]: value });
    }
    setSellerApiKeyDataChanges(true);
  };

  const handleSellerApiKey = () => {
    const apiKeyFormData = new FormData();
    apiKeyFormData.append("live_api_key", apiKeyData.live_api_key);

    dispatch(updateSellerPaysofterApiKey(apiKeyFormData));
  };

  useEffect(() => {
    if (userInfo) {
      dispatch(getSellerAccount());
      dispatch(getSellerPaysofterApiKey());
      dispatch(getSellerPhoto());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    let successMessage = "";

    if (updateSellerAccountSuccess) {
      successMessage = "Seller account updated successfully.";
    } else if (updateSellerPhotoSuccess) {
      successMessage = "Seller photo updated successfully.";
    } else if (updateSellerApiKeySuccess) {
      successMessage = "Seller API Key updated successfully.";
    }

    if (successMessage) {
      setSuccessMessage(successMessage);
      setTimeout(() => {
        setSuccessMessage("");
        window.location.reload();
      }, 3000);
    }
  }, [
    updateSellerAccountSuccess,
    updateSellerPhotoSuccess,
    updateSellerApiKeySuccess,
  ]);

  return (
    <Container Fluid>
      <Row className="d-flex justify-content-center py-2">
        <h2 className="text-center py-2">
          Seller Account<i className="fas fa-user"></i>
        </h2>

        <div className="d-flex justify-content-center text-center py-2">
          {successMessage && (
            <Message variant="success" fixed>
              {successMessage}
            </Message>
          )}

          {getSellerAccountLoading && <Loader />}
          {getSellerAccountError && (
            <Message variant="danger" fixed>
              {getSellerAccountError}
            </Message>
          )}

          {updateSellerAccountLoading && <Loader />}
          {updateSellerAccountError && (
            <Message variant="danger" fixed>
              {updateSellerAccountError}
            </Message>
          )}

          {updateSellerPhotoLoading && <Loader />}
          {updateSellerPhotoError && (
            <Message variant="danger" fixed>
              {updateSellerPhotoError}
            </Message>
          )}

          {updateSellerApiKeyLoading && <Loader />}
          {updateSellerApiKeyError && (
            <Message variant="danger" fixed>
              {updateSellerApiKeyError}
            </Message>
          )}
        </div>
        <p className="d-flex justify-content-left">
          <i> Verified ID </i>
          {sellerAccount?.is_seller_verified ? (
            <i
              className="fas fa-check-circle"
              style={{ fontSize: "18px", color: "blue" }}
            ></i>
          ) : (
            <i
              className="fas fa-times-circle"
              style={{ fontSize: "18px", color: "red" }}
            ></i>
          )}
        </p>

        <Col>
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Seller Account</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Business Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_name"
                      value={businessData.business_name}
                      onChange={handleBusinessDataChanges}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Status</Form.Label>
                    <Form.Control
                      as="select"
                      name="business_status"
                      value={businessData.business_status}
                      onChange={handleBusinessDataChanges}
                    >
                      <option value="">Select Business Status</option>
                      {BUSINESS_TYPE_CHOICES.map((type) => (
                        <option key={type[0]} value={type[0]}>
                          {type[1]}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Registration Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_reg_num"
                      value={businessData.business_reg_num}
                      onChange={handleBusinessDataChanges}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Registration Certificate</Form.Label>
                    <div className="py-2">
                      {sellerAccount?.business_reg_cert && (
                        <img
                          src={sellerAccount?.business_reg_cert}
                          alt="Business Reg Cert"
                          style={{ maxWidth: "100%", maxHeight: "100px" }}
                        />
                      )}
                    </div>
                    <Form.Control
                      type="file"
                      name="business_reg_cert"
                      onChange={handleBusinessDataChanges}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Staff Size</Form.Label>
                    <Form.Control
                      as="select"
                      name="staff_size"
                      value={businessData?.staff_size}
                      onChange={handleBusinessDataChanges}
                    >
                      <option value="">Select Staff Size</option>
                      {STAFF_SIZE_CHOICES.map((size) => (
                        <option key={size[0]} value={size[0]}>
                          {size[1]}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Industry</Form.Label>
                    <Form.Control
                      as="select"
                      name="business_industry"
                      value={businessData?.business_industry}
                      onChange={handleBusinessDataChanges}
                    >
                      <option value="">Select Business Industry</option>
                      {BUSINESS_INDUSTRY_CHOICES.map((industry) => (
                        <option key={industry[0]} value={industry[0]}>
                          {industry[1]}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Category</Form.Label>
                    <Form.Control
                      as="select"
                      name="business_category"
                      value={businessData?.business_category}
                      onChange={handleBusinessDataChanges}
                    >
                      <option value="">Select Business Category</option>
                      {BUSINESS_CATEGORY_CHOICES.map((category) => (
                        <option key={category[0]} value={category[0]}>
                          {category[1]}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_description"
                      value={businessData?.business_description}
                      onChange={handleBusinessDataChanges}
                    />
                  </Form.Group>

                  {/* <Form.Group>
                    <Form.Label>Business Phone</Form.Label>
                    <PhoneInput
                      // country={businessData?.country}
                      // country="US"
                      // country={selectedCountry}
                      value={businessData?.business_phone}
                      onChange={(value) =>
                        handleBusinessDataChanges({
                          target: { name: "business_phone", value },
                        })
                      }
                      placeholder="Enter phone number" 
                      maxLength={18}
                    />
                  </Form.Group> */}

                  <Form.Group>
                    <Form.Label>Business Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_phone"
                      value={businessData.business_phone}
                      onChange={handleBusinessDataChanges}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Website</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_website"
                      value={businessData?.business_website}
                      onChange={handleBusinessDataChanges}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_address"
                      value={businessData?.business_address}
                      onChange={handleBusinessDataChanges}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Country</Form.Label>
                    {/* <Form.Control
                      type="text"
                      name="country"
                      value={businessData.country}
                      onChange={handleBusinessDataChanges}
                    /> */}

                    <Select
                      value={{
                        value: businessData?.country,
                        label: businessData?.country,
                      }}
                      onChange={(selectedOption) =>
                        handleBusinessDataChanges({
                          target: {
                            name: "country",
                            value: selectedOption.value,
                          },
                        })
                      }
                      options={COUNTRY_CHOICES?.map((type) => ({
                        value: type[0],
                        label: type[1],
                      }))}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Personal ID Type</Form.Label>
                    <Form.Control
                      as="select"
                      name="id_type"
                      value={businessData?.id_type}
                      onChange={handleBusinessDataChanges}
                    >
                      <option value="">ID Type</option>
                      {ID_TYPE_CHOICES.map((type) => (
                        <option key={type[0]} value={type[0]}>
                          {type[1]}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Personal ID Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="id_number"
                      value={businessData?.id_number}
                      onChange={handleBusinessDataChanges}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>ID Card Image</Form.Label>

                    <div className="py-2">
                      {sellerAccount?.id_card_image && (
                        <img
                          src={sellerAccount?.id_card_image}
                          alt="ID Card "
                          style={{ maxWidth: "100%", maxHeight: "100px" }}
                        />
                      )}
                    </div>
                    <Form.Control
                      type="file"
                      name="id_card_image"
                      onChange={handleBusinessDataChanges}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Date of Birth</Form.Label>

                    <div>
                      <DatePicker
                        selected={
                          businessData.dob ? new Date(businessData?.dob) : null
                        }
                        onChange={(date) =>
                          handleBusinessDataChanges({
                            target: { name: "dob", value: date },
                          })
                        }
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        scrollableMonthYearDropdown
                        className="rounded py-2 mb-2 form-control"
                        placeholderText="Select date of birth"
                      />
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Home Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="home_address"
                      value={businessData?.home_address}
                      onChange={handleBusinessDataChanges}
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-end py-2">
                    <Button
                      className="rounded"
                      variant="primary"
                      onClick={handleUpdateBusinessAccount}
                      disabled={
                        !businessDataChanges ||
                        updateSellerAccountLoading ||
                        updateSellerAccountSuccess
                      }
                    >
                      <span className="d-flex justify-content-between">
                        {updateSellerAccountLoading && <LoaderButton />}
                        Update Business Account
                      </span>
                    </Button>{" "}
                  </div>
                </Form>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Seller Photo</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Group>
                    {/* <Form.Label>Seller Photo</Form.Label> */}
                    <div className="py-2">
                      {sellerPhoto?.photo && (
                        <img
                          src={sellerPhoto?.photo}
                          alt="Seller"
                          style={{ maxWidth: "100%", maxHeight: "100px" }}
                        />
                      )}
                    </div>

                    <Form.Control
                      type="file"
                      name="photo"
                      onChange={handlePhotoInputChange}
                    />
                  </Form.Group>
                </Form>

                <div className="d-flex justify-content-end py-2">
                  <Button
                    className="rounded"
                    variant="primary"
                    onClick={handleUpdatePhoto}
                    disabled={
                      !photoDataChanges ||
                      updateSellerPhotoLoading ||
                      updateSellerPhotoSuccess
                    }
                  >
                    <span className="d-flex justify-content-between">
                      {updateSellerPhotoLoading && <LoaderButton />}
                      Update Photo
                    </span>
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Paysofter API Key</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>API Key</Form.Label>
                    <Form.Control
                      type="text"
                      name="live_api_key"
                      value={apiKeyData?.live_api_key}
                      onChange={handleSellerApiKeyDataChanges}
                    />
                  </Form.Group>
                </Form>
                <div className="d-flex justify-content-end py-2">
                  <Button
                    className="rounded"
                    variant="primary"
                    onClick={handleSellerApiKey}
                    disabled={
                      !sellerApiKeyDataChanges ||
                      updateSellerApiKeyLoading ||
                      updateSellerApiKeySuccess
                    }
                  >
                    <span className="d-flex justify-content-between">
                      {updateSellerApiKeyLoading && <LoaderButton />}
                      Save API Key
                    </span>
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default SellerProfile;
