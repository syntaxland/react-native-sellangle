// PostPaidAd.js
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image,
  Modal,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import * as ImagePicker from "expo-image-picker";
import { postPaidAd } from "../../redux/actions/marketplaceSellerActions";
import { Picker } from "@react-native-picker/picker";
import RNPickerSelect from "react-native-picker-select";
import { Checkbox } from "react-native-paper";
import { Country, State, City } from "country-state-city";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import Message from "../../Message";
import Loader from "../../Loader";
// import LoaderButton from "../../LoaderButton";
import {
  PAID_AD_DURATION_CHOICES,
  AD_CONDITION_CHOICES,
  AD_CATEGORY_CHOICES,
  AD_TYPE_CHOICES,
  CURRENCY_CHOICES,
  MAIN_CURRENCY_CHOICES,
} from "../../constants";

function PostPaidAd() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [durationChoices, setDurationChoices] = useState([]);
  const [adConditionChoices, setAdConditionChoices] = useState([]);
  const [adCategoryChoices, setAdCategoryChoices] = useState([]);
  const [adTypeChoices, setAdTypeChoices] = useState([]);
  const [currencyChoices, setCurrencyChoices] = useState([]);
  const [mainCurrencyChoices, setMainCurrencyChoices] = useState([]);

  useEffect(() => {
    setDurationChoices(PAID_AD_DURATION_CHOICES);
    setAdConditionChoices(AD_CONDITION_CHOICES);
    setAdCategoryChoices(AD_CATEGORY_CHOICES);
    setAdTypeChoices(AD_TYPE_CHOICES);
    setCurrencyChoices(CURRENCY_CHOICES);
    setMainCurrencyChoices(MAIN_CURRENCY_CHOICES);
  }, []);

  const richText = useRef();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  const postPaidAdState = useSelector((state) => state.postPaidAdState);
  const { success, error, loading } = postPaidAdState;

  const [adName, setAdName] = useState("");
  const [adNameError, setAdNameError] = useState("");

  const [adCategory, setAdCategory] = useState("");
  const [adCategoryError, setAdCategoryError] = useState("");

  const [adType, setAdType] = useState("");
  const [adTypeError, setAdTypeError] = useState("");

  const [country, setCountry] = useState("");
  const [countryError, setCountryError] = useState("");

  const [stateProvince, setStateProvince] = useState("");
  const [stateProvinceError, setStateProvinceError] = useState("");

  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");

  const [condition, setCondition] = useState("");
  // const [conditionError, setConditionError] = useState("");

  const [currency, setCurrency] = useState("NGN");
  const [currencyError, setCurrencyError] = useState("");

  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState("");

  const [usdPrice, setUsdPrice] = useState("");
  const [usdCurrency, setUsdCurrency] = useState("USD");

  const [brand, setBrand] = useState("");
  // const [brandError, setBrandError] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

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

  const [promoCode, setPromoCode] = useState("");
  const [promoCodeError, setPromoCodeError] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [discountPercentageError, setDiscountPercentageError] = useState("");
  const [countInStock, setCountInStock] = useState("");

  const [isPriceNegotiable, setIsPriceNegotiable] = useState("");
  const [isAutoRenewal, setIsAutoRenewal] = useState("");

  const [showStrikethroughPromoPrice, setShowStrikethroughPromoPrice] =
    useState("");

  const [formError, setFormError] = useState("");

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [showMainCurrencyInfoModal, setShowMainCurrencyInfoModal] =
    useState(false);
  const [showAltCurrencyInfoModal, setShowAltCurrencyInfoModal] =
    useState(false);
  const [showLineThrougPriceInfoModal, setShowLineThrougPriceInfoModal] =
    useState(false);

  const handleMainCurrencyInfoModalShow = () => {
    setShowMainCurrencyInfoModal(true);
  };

  const handleMainCurrencyInfoModalClose = () => {
    setShowMainCurrencyInfoModal(false);
  };

  const handleAltCurrencyInfoModalShow = () => {
    setShowAltCurrencyInfoModal(true);
  };

  const handleAltCurrencyInfoModalClose = () => {
    setShowAltCurrencyInfoModal(false);
  };

  const handleLineThrougPriceInfoModalShow = () => {
    setShowLineThrougPriceInfoModal(true);
  };
  const handleLineThrougPriceInfoModalClose = () => {
    setShowLineThrougPriceInfoModal(false);
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setAdNameError("");
    setAdName("");
    setAdCategoryError("");
    setAdCategory("");
    setAdTypeError("");
    setAdType("");
    setCountryError("");
    setCountry({});
    setStateProvinceError("");
    setStateProvince({});
    setCityError("");
    setCity({});
    setCondition("");
    setPrice("");
    setCurrencyError("");
    setCurrency("");
    setPriceError("");
    setBrand("");
    setDescription("");
    setDescriptionError("");
    setCountInStock("");
    setYoutubeLink("");
    setImage1("");
    setImage1Error("");
    setImage2("");
    setImage3("");
    setDuration("");
    setDurationError("");
    setTimeout(() => setRefreshing(false), 2000);
  }, [dispatch]);

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

  const handleCategoryChange = (value) => {
    setAdCategory(value);
    setAdCategoryError("");
    setAdType("");
  };

  const handleTypeChange = (value) => {
    setAdType(value);
    setAdTypeError("");
  };

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

      case "usdPrice":
        setUsdPrice(value);
        break;

      case "usdCurrency":
        setUsdCurrency(value);
        break;

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

      case "promoCode":
        setPromoCode(value);
        setPromoCodeError("");
        break;

      case "discountPercentage":
        setDiscountPercentage(value);
        setDiscountPercentageError("");
        break;

      case "countInStock":
        setCountInStock(value);
        break;

      case "isPriceNegotiable":
        setIsPriceNegotiable(value);
        break;

      case "showStrikethroughPromoPrice":
        setShowStrikethroughPromoPrice(value);
        break;

      case "isAutoRenewal":
        setIsAutoRenewal(value);
        break;

      case "duration":
        setDuration(value);
        setDurationError("");
        break;

      default:
        break;
    }
  };

  const sellerData = new FormData();
  sellerData.append("ad_name", adName);
  sellerData.append("ad_category", adCategory);
  sellerData.append("ad_type", adType);
  sellerData.append("country", country.isoCode);
  sellerData.append("state_province", stateProvince.isoCode);
  sellerData.append("city", city.name);
  sellerData.append("condition", condition);
  sellerData.append("currency", currency);
  sellerData.append("usd_currency", usdCurrency);
  sellerData.append("price", price);
  sellerData.append("usd_price", usdPrice);
  sellerData.append("brand", brand);
  sellerData.append("description", description);
  sellerData.append("youtube_link", youtubeLink);
  sellerData.append("image1", image1);
  sellerData.append("image2", image2);
  sellerData.append("image3", image3);
  sellerData.append("duration", duration);
  sellerData.append("promo_code", promoCode);
  sellerData.append("discount_percentage", discountPercentage);
  sellerData.append("count_in_stock", countInStock);
  sellerData.append("is_price_negotiable", isPriceNegotiable);
  sellerData.append(
    "show_strike_through_promo_price",
    showStrikethroughPromoPrice
  );
  sellerData.append("is_auto_renewal", isAutoRenewal);

  // console.log("sellerData:", sellerData);

  const handlePostPaidAd = (e) => {
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

    if (promoCode && promoCode.length < 3) {
      setPromoCodeError("Promo Code must be at least 3 characters.");
      return;
    } else if (/[^a-zA-Z0-9_]/.test(promoCode)) {
      setPromoCodeError("Promo Code must not contain special characters.");
      return;
    } else {
      setPromoCodeError("");
    }

    if (promoCode && !discountPercentage) {
      setDiscountPercentageError(
        "Discount Percentage is required when Promo Code is entered."
      );
    } else if (!/^\d*\.?\d*$/.test(discountPercentage)) {
      setDiscountPercentageError(
        "Discount Percentage must contain only digits and decimal points."
      );
    } else {
      setDiscountPercentageError("");
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
      dispatch(postPaidAd(sellerData));
    }
  };

  const pickImage = async (field, useLibrary) => {
    let result;
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    };

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync(options);
    }

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const file = {
        uri: uri,
        name: uri.split("/").pop(),
        type: `image/${uri.split(".").pop()}`,
      };

      switch (field) {
        case "image1":
          setImage1(file);
          break;
        case "image2":
          setImage2(file);
          break;
        case "image3":
          setImage3(file);
          break;
        default:
          break;
      }
    }
  };

  const removeImage = (imageType) => {
    if (imageType === "image1") setImage1(null);
    if (imageType === "image2") setImage2(null);
    if (imageType === "image3") setImage3(null);
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        onRefresh();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, onRefresh]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Post Paid Ad</Text>
        <Text style={styles.note}>
          * All fields marked with asterisks are required
        </Text>

        {error && (
          <Message fixed style={styles.errorText}>
            {error}
          </Message>
        )}
        {success && (
          <Message fixed>
            <Text>Ad Posted successfully</Text>
          </Message>
        )}

        <View style={styles.formGroup}>
          <Text style={styles.label}>Ad Title *</Text>
          <TextInput
            style={styles.input}
            value={adName}
            onChangeText={(text) => handleFieldChange("adName", text)}
            placeholder="Enter ad name..."
          />
          {adNameError && <Text style={styles.errorText}>{adNameError}</Text>}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Category *</Text>
          <View style={styles.formContainer}>
            <RNPickerSelect
              onValueChange={(value) => handleCategoryChange(value)}
              items={adCategoryChoices?.map(([value, label]) => ({
                label,
                value,
              }))}
              style={pickerSelectStyles}
            />
            {adCategoryError && (
              <Text style={styles.errorText}>{adCategoryError}</Text>
            )}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Type *</Text>
          <View style={styles.formContainer}>
            <RNPickerSelect
              onValueChange={(value) => handleTypeChange(value)}
              items={
                adTypeChoices[adCategory]?.map(([value, label]) => ({
                  label,
                  value,
                })) || []
              }
              style={pickerSelectStyles}
            />
            {adTypeError && <Text style={styles.errorText}>{adTypeError}</Text>}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Country *</Text>
          <View style={styles.locationContainer}>
            <Picker
              selectedValue={country}
              onValueChange={(value) => handleFieldChange("country", value)}
            >
              <Picker.Item label="Select Country" value="" />
              {countries.map((country) => (
                <Picker.Item
                  key={country.isoCode}
                  label={country.name}
                  value={country}
                />
              ))}
            </Picker>
            {countryError ? (
              <Text style={styles.error}>{countryError}</Text>
            ) : null}
          </View>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>State/Province *</Text>
          <View style={styles.locationContainer}>
            <Picker
              selectedValue={stateProvince}
              onValueChange={(value) =>
                handleFieldChange("stateProvince", value)
              }
              enabled={states.length > 0}
            >
              <Picker.Item label="Select State/Province" value="" />
              {states.map((state) => (
                <Picker.Item
                  key={state.isoCode}
                  label={state.name}
                  value={state}
                />
              ))}
            </Picker>
            {stateProvinceError ? (
              <Text style={styles.error}>{stateProvinceError}</Text>
            ) : null}
          </View>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>City *</Text>
          <View style={styles.locationContainer}>
            <Picker
              selectedValue={city}
              onValueChange={(value) => handleFieldChange("city", value)}
              enabled={cities.length > 0}
            >
              <Picker.Item label="Select City" value="" />
              {cities.map((city) => (
                <Picker.Item key={city.name} label={city.name} value={city} />
              ))}
            </Picker>
            {cityError ? <Text style={styles.error}>{cityError}</Text> : null}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Condition</Text>
          <View style={styles.formContainer}>
            <RNPickerSelect
              onValueChange={(value) => handleFieldChange("condition", value)}
              items={adConditionChoices?.map(([value, label]) => ({
                label,
                value,
              }))}
              style={pickerSelectStyles}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Currency *</Text>
            <TouchableOpacity
              onPress={() => setShowMainCurrencyInfoModal(true)}
            >
              <FontAwesomeIcon
                icon={faInfoCircle}
                size={16}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <RNPickerSelect
              onValueChange={(value) => handleFieldChange("currency", value)}
              items={mainCurrencyChoices?.map(([value, label]) => ({
                label,
                value,
              }))}
              style={pickerSelectStyles}
            />

            <Modal
              visible={showMainCurrencyInfoModal}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setShowMainCurrencyInfoModal(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalLabelTitle}>Main Currency Info</Text>
                  <Text style={styles.modalLabelBody}>
                    This is the main currency price that can be used for
                    Paysofter Promise checkout.
                  </Text>
                  <Button
                    title="Close"
                    onPress={() => setShowMainCurrencyInfoModal(false)}
                  />
                </View>
              </View>
            </Modal>
          </View>
          {currencyError && (
            <Text style={styles.errorText}>{currencyError}</Text>
          )}
        </View>

        {currency && (
          <View style={styles.formGroup}>
            <Text style={styles.label}>Price *</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => handleFieldChange("price", text)}
              keyboardType="numeric"
              placeholder="Enter ad price..."
            />
            {priceError && <Text style={styles.errorText}>{priceError}</Text>}
          </View>
        )}

        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Alternative Currency</Text>
            <TouchableOpacity onPress={() => setShowAltCurrencyInfoModal(true)}>
              <FontAwesomeIcon
                icon={faInfoCircle}
                size={16}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <RNPickerSelect
              onValueChange={(value) => handleFieldChange("usdCurrency", value)}
              items={currencyChoices?.map(([value, label]) => ({
                label,
                value,
              }))}
              style={pickerSelectStyles}
            />

            <Modal
              visible={showAltCurrencyInfoModal}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setShowAltCurrencyInfoModal(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalLabelTitle}>
                    Alternative Currency Info
                  </Text>
                  <Text style={styles.modalLabelBody}>
                    This is optional and could be the alternative currency.
                  </Text>
                  <Button
                    title="Close"
                    onPress={() => setShowAltCurrencyInfoModal(false)}
                  />
                </View>
              </View>
            </Modal>
          </View>
        </View>

        {usdCurrency && (
          <View style={styles.formGroup}>
            <Text style={styles.label}>Price Alternative</Text>
            <TextInput
              style={styles.input}
              value={usdPrice}
              onChangeText={(text) => handleFieldChange("usdPrice", text)}
              keyboardType="numeric"
              placeholder="Enter alternative ad price..."
            />
            {priceError && <Text style={styles.errorText}>{priceError}</Text>}
          </View>
        )}

        <View style={styles.formGroup}>
          <Text style={styles.label}>Promo Code</Text>
          <TextInput
            style={styles.input}
            value={promoCode}
            onChangeText={(text) => handleFieldChange("promoCode", text)}
            placeholder="Enter ad promo code..."
          />
          {promoCodeError && (
            <Text style={styles.errorText}>{promoCodeError}</Text>
          )}
        </View>

        {promoCode && (
          <>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Discount Percentage*</Text>
              <View style={styles.formContainer}>
                <TextInput
                  value={discountPercentage}
                  onChangeText={(value) =>
                    handleFieldChange("discountPercentage", value)
                  }
                  placeholder="Enter ad discount percentage"
                  keyboardType="numeric"
                  maxLength={4}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Strike Through Old Price</Text>
                <TouchableOpacity
                  onPress={() => setShowLineThrougPriceInfoModal(true)}
                >
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    size={16}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.formContainer}>
                <Checkbox.Item
                  label="Show strike through promo price?"
                  status={showStrikethroughPromoPrice ? "checked" : "unchecked"}
                  onPress={() =>
                    handleFieldChange(
                      "showStrikethroughPromoPrice",
                      !showStrikethroughPromoPrice
                    )
                  }
                />
              </View>

              <Modal
                visible={showLineThrougPriceInfoModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowLineThrougPriceInfoModal(false)}
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalLabelTitle}>
                      Show Strike Through Price
                    </Text>
                    <Text style={styles.modalLabelBody}>
                      This shows the line through price. E.g. 100 USD ad price
                      at 5% discount rate will display thus:
                      <Text style={{ textDecorationLine: "line-through" }}>
                        100 USD
                      </Text>{" "}
                      95 USD (5% Off).
                    </Text>
                    <Button
                      title="Close"
                      onPress={() => setShowLineThrougPriceInfoModal(false)}
                    />
                  </View>
                </View>
              </Modal>
            </View>
          </>
        )}

        <View style={styles.formGroup}>
          <Text style={styles.label}>Brand</Text>
          <TextInput
            style={styles.input}
            value={brand}
            onChangeText={(text) => handleFieldChange("brand", text)}
            placeholder="Enter ad brand..."
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>YouTube Link</Text>
          <TextInput
            style={styles.input}
            value={youtubeLink}
            onChangeText={(text) => handleFieldChange("youtubeLink", text)}
            placeholder="Enter ad youtube link..."
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Count in Stock</Text>
          <TextInput
            style={styles.input}
            value={countInStock}
            onChangeText={(text) => handleFieldChange("countInStock", text)}
            keyboardType="numeric"
            placeholder="Enter number of ads in stock ..."
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Image 1 *</Text>
          <View style={styles.imgContainer}>
            <TouchableOpacity
              style={styles.imagePicker}
              onPress={() => pickImage("image1", true)}
            >
              <Text style={styles.uploadText}>
                {image1 ? "Change Image 1" : "Select Image 1"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.imagePicker}
              onPress={() => pickImage("image1", false)}
            >
              <Text style={styles.uploadText}>Capture Image 1</Text>
            </TouchableOpacity>
            {image1 ? (
              <>
                <Image
                  source={{ uri: image1.uri }}
                  style={styles.imagePreview}
                />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeImage("image1")}
                >
                  <Text style={styles.removeButtonText}>Remove Image 1</Text>
                </TouchableOpacity>
              </>
            ) : null}
          </View>
          {image1Error && <Text style={styles.errorText}>{image1Error}</Text>}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Image 2</Text>
          <View style={styles.imgContainer}>
            <TouchableOpacity
              style={styles.imagePicker}
              onPress={() => pickImage("image2", true)}
            >
              <Text style={styles.uploadText}>
                {image2 ? "Change Image 2" : "Select Image 2"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.imagePicker}
              onPress={() => pickImage("image2", false)}
            >
              <Text style={styles.uploadText}>Capture Image 2</Text>
            </TouchableOpacity>
            {image2 ? (
              <>
                <Image
                  source={{ uri: image2.uri }}
                  style={styles.imagePreview}
                />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeImage("image2")}
                >
                  <Text style={styles.removeButtonText}>Remove Image 2</Text>
                </TouchableOpacity>
              </>
            ) : null}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Image 3</Text>
          <View style={styles.imgContainer}>
            <TouchableOpacity
              style={styles.imagePicker}
              onPress={() => pickImage("image3", true)}
            >
              <Text style={styles.uploadText}>
                {image3 ? "Change Image 3" : "Select Image 3"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.imagePicker}
              onPress={() => pickImage("image3", false)}
            >
              <Text style={styles.uploadText}>Capture Image 3</Text>
            </TouchableOpacity>
            {image3 ? (
              <>
                <Image
                  source={{ uri: image3.uri }}
                  style={styles.imagePreview}
                />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeImage("image3")}
                >
                  <Text style={styles.removeButtonText}>Remove Image 3</Text>
                </TouchableOpacity>
              </>
            ) : null}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Duration *</Text>
          <View style={styles.formContainer}>
            <RNPickerSelect
              onValueChange={(value) => handleFieldChange("duration", value)}
              items={durationChoices?.map(([value, label]) => ({
                label,
                value,
              }))}
              style={pickerSelectStyles}
            />
          </View>
          {durationError && (
            <Text style={styles.errorText}>{durationError}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Auto-Renewal</Text>
          <View style={styles.formContainer}>
            <Checkbox.Item
              label="Renew Automatically?"
              status={isAutoRenewal ? "checked" : "unchecked"}
              onPress={() => handleFieldChange("isAutoRenewal", !isAutoRenewal)}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description *</Text>
          <View style={styles.descContainer}>
            <RichToolbar
              editor={richText}
              actions={[
                actions.insertImage,
                actions.setBold,
                actions.setItalic,
                actions.insertBulletsList,
                actions.insertOrderedList,
                actions.insertLink,
                actions.setUnderline,
                actions.setStrikethrough,
                actions.undo,
                actions.redo,
              ]}
            />
            <RichEditor
              ref={richText}
              editorStyle={styles.editor}
              onChange={(text) => handleFieldChange("description", text)}
              placeholder="Enter ad description..."
              initialContentHTML={description}
            />
          </View>
          {descriptionError && (
            <Text style={styles.errorText}>{descriptionError}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          {loading && <Loader />}
          {formError && (
            <View style={styles.message}>
              <Message fixed style={styles.errorText}>
                {formError}
              </Message>
            </View>
          )}
          {error && (
            <View style={styles.message}>
              <Message style={styles.errorText}>{error}</Message>
            </View>
          )}
          {success && (
            <View style={styles.message}>
              <Message fixed>
                <Text>Ad Posted successfully</Text>
              </Message>
            </View>
          )}
        </View>

        <View style={styles.formGroup}>
          <TouchableOpacity onPress={handlePostPaidAd}>
            <Text style={styles.roundedPrimaryBtn}>Post Paid Ad</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  descContainer: {
    width: "100%",
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  locationContainer: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },

  imgContainer: {
    width: "100%",
    minHeight: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  note: {
    fontSize: 12,
    color: "gray",
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
    justifyContent: "center",
    textAlign: "center",
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  editor: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 20,
    borderRadius: 5,
    minHeight: 400,
  },
  message: {
    padding: 10,
  },
  errorText: {
    color: "red",
    marginTop: 8,
  },
  uploadText: {
    color: "#007BFF",
    textDecorationLine: "underline",
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  removeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#ff0000",
    borderRadius: 5,
    alignItems: "center",
  },
  removeButtonText: {
    color: "#fff",
  },
  paidAdText: {
    marginTop: 20,
    textAlign: "center",
    color: "#007BFF",
  },
  roundedPrimaryBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  roundedDangerBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  roundedInfoBtn: {
    backgroundColor: "#17a2b8",
    color: "#fff",
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  roundedSecBtn: {
    backgroundColor: "#6c757d",
    color: "#fff",
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  roundedSuccessBtn: {
    backgroundColor: "#28a745)",
    color: "#fff",
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  checkBox: {
    backgroundColor: "white",
    borderWidth: 0,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalLabelBody: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
  },
  modalLabelTitle: {
    fontWeight: "bold",
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
  },
  icon: {
    marginLeft: 10,
    color: "#007bff",
  },
});

const pickerSelectStyles = StyleSheet.create({
  // inputIOS: {
  //   fontSize: 16,
  //   paddingVertical: 12,
  //   paddingHorizontal: 10,
  //   borderWidth: 1,
  //   borderColor: "gray",
  //   borderRadius: 4,
  //   color: "black",
  //   paddingRight: 30,
  // },
  // inputAndroid: {
  //   fontSize: 16,
  //   paddingHorizontal: 10,
  //   paddingVertical: 8,
  //   borderWidth: 0.5,
  //   borderColor: "purple",
  //   borderRadius: 8,
  //   color: "black",
  //   paddingRight: 30,
  // },
});

export default PostPaidAd;
