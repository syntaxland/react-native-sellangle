// CreateMarketplaceSeller.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createMarketplaceSeller } from "../../redux/actions/marketplaceSellerActions";
import * as ImagePicker from "expo-image-picker";
import DatePicker from "react-native-date-picker";
import PhoneInput from "react-native-phone-input";
import RNPickerSelect from "react-native-picker-select";
import Message from "../../Message";
import Loader from "../../Loader";
import {
  ID_TYPE_CHOICES,
  COUNTRY_CHOICES,
  BUSINESS_TYPE_CHOICES,
  STAFF_SIZE_CHOICES,
  BUSINESS_INDUSTRY_CHOICES,
  BUSINESS_CATEGORY_CHOICES,
} from "../../constants";

const CreateMarketplaceSeller = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [idTypeChoices, setIdTypeChoices] = useState([]);
  const [countryChoices, setCountryChoices] = useState([]);
  const [businessTypeChoices, setBusinessTypeChoices] = useState([]);
  const [staffSizeChoices, setStaffSizeChoices] = useState([]);
  const [industryChoices, setIndustryChoices] = useState([]);
  const [businessCategoryChoices, setBusinessCategoryChoices] = useState([]);

  useEffect(() => {
    setIdTypeChoices(ID_TYPE_CHOICES);
    setCountryChoices(COUNTRY_CHOICES);
    setBusinessTypeChoices(BUSINESS_TYPE_CHOICES);
    setStaffSizeChoices(STAFF_SIZE_CHOICES);
    setIndustryChoices(BUSINESS_INDUSTRY_CHOICES);
    setBusinessCategoryChoices(BUSINESS_CATEGORY_CHOICES);
  }, []);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  const marketplaceSellerState = useSelector(
    (state) => state.marketplaceSellerState
  );
  const { success, error, loading } = marketplaceSellerState;

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

  const [dob, setDob] = useState(new Date());
  // const [dobError, setDobError] = useState("");
  const [open, setOpen] = useState(false);

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
      case "businessDescription":
        setBusinessDescription(value);
        break;
      case "businessPhone":
        setBusinessPhone(value);
        setBusinessPhoneError("");
        break;
      case "businessWebsite":
        setBusinessWebsite(value);
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
        // setDobError("");
        break;
      case "address":
        setAddress(value);
        setAddressError("");
        break;
      default:
        break;
    }
  };

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
  // sellerData.append("dob", dob.toISOString().split("T")[0]);
  sellerData.append("home_address", address);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigation.navigate("Seller Photo");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success, navigation]);

  const handleCreateMarketplaceSeller = (e) => {
    e.preventDefault();

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
      setIdNumberError("Please enter the ID number.");
    } else {
      setIdNumberError("");
    }

    if (!idCardImage) {
      setIdCardImageError("Please upload the ID card Photo.");
    } else {
      setIdCardImageError("");
    }

    // if (!dob) {
    //   setDobError("Please enter your date of birth.");
    // } else {
    //   setDobError("");
    // }

    if (!address) {
      setAddressError("Please enter your home address.");
    } else {
      setAddressError("");
    }

    if (
      !idType ||
      !idNumber ||
      !idCardImage ||
      // !dob ||
      !address ||
      !businessName ||
      !businessAddress ||
      !businessType ||
      !staffSize ||
      !businessIndustry ||
      !businessCategory ||
      // !businessPhone ||
      !country
    ) {
      setFormError("Please fix the errors in the form.");
      return;
    } else {
      setFormError("");
      dispatch(createMarketplaceSeller(sellerData));
      // navigation.navigate("Seller Photo"); 
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

    if (!result.cancelled) {
      const uri = result.assets[0].uri;
      const file = {
        uri: uri,
        name: uri.split("/").pop(),
        type: `image/${uri.split(".").pop()}`,
      };

      setIdCardImage(file);
      setIdCardImageError("");
    }
  };

  const removeImage = () => {
    setIdCardImage(null);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Become a Seller</Text>

        {loading && <Loader />}
        {success && (
          <Message variant="success">
            Seller Created Successfully. Redirecting to Photo Upload Page...
          </Message>
        )}
        {formError && <Message variant="danger">{formError}</Message>}
        {error && <Message variant="danger">{error}</Message>}

        <View style={styles.formGroup}>
          <Text>Business Name</Text>
          <TextInput
            style={styles.input}
            value={businessName}
            onChangeText={(value) => handleFieldChange("businessName", value)}
          />
          {businessNameError && (
            <Text style={styles.error}>{businessNameError}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text>Business Reg Number</Text>
          <TextInput
            style={styles.input}
            value={businessRegNum}
            onChangeText={(value) => handleFieldChange("businessRegNum", value)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text>Business Address</Text>
          <TextInput
            style={styles.input}
            value={businessAddress}
            onChangeText={(value) =>
              handleFieldChange("businessAddress", value)
            }
          />
          {businessAddressError && (
            <Text style={styles.error}>{businessAddressError}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text>Business Type</Text>
          <View style={styles.formContainer}>
            <RNPickerSelect
              onValueChange={(value) =>
                handleFieldChange("businessType", value)
              }
              items={businessTypeChoices?.map(([value, label]) => ({
                label,
                value,
              }))}
              style={pickerSelectStyles}
            />
          </View>
          {businessTypeError && (
            <Text style={styles.error}>{businessTypeError}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text>Staff Size</Text>
          <View style={styles.formContainer}>
            <RNPickerSelect
              onValueChange={(value) => handleFieldChange("staffSize", value)}
              items={staffSizeChoices?.map(([value, label]) => ({
                label,
                value,
              }))}
              style={pickerSelectStyles}
            />
          </View>
          {staffSizeError && <Text style={styles.error}>{staffSizeError}</Text>}
        </View>

        <View style={styles.formGroup}>
          <Text>Business Industry</Text>
          <View style={styles.formContainer}>
            <RNPickerSelect
              onValueChange={(value) =>
                handleFieldChange("businessIndustry", value)
              }
              items={industryChoices?.map(([value, label]) => ({
                label,
                value,
              }))}
              style={pickerSelectStyles}
            />
          </View>
          {businessIndustryError && (
            <Text style={styles.error}>{businessIndustryError}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text>Business Category</Text>
          <View style={styles.formContainer}>
            <RNPickerSelect
              onValueChange={(value) =>
                handleFieldChange("businessCategory", value)
              }
              items={businessCategoryChoices?.map(([value, label]) => ({
                label,
                value,
              }))}
              style={pickerSelectStyles}
            />
          </View>
          {businessCategoryError && (
            <Text style={styles.error}>{businessCategoryError}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text>Business Description</Text>
          <TextInput
            style={styles.input}
            value={businessDescription}
            onChangeText={(value) =>
              handleFieldChange("businessDescription", value)
            }
          />
        </View>

        <View style={styles.formGroup}>
          <Text>Business Phone</Text>
          <PhoneInput
            style={styles.input}
            initialCountry="us"
            value={businessPhone}
            onChangePhoneNumber={(value) =>
              handleFieldChange("businessPhone", value)
            }
          />
          {businessPhoneError && (
            <Text style={styles.error}>{businessPhoneError}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text>Business Website</Text>
          <TextInput
            style={styles.input}
            value={businessWebsite}
            onChangeText={(value) =>
              handleFieldChange("businessWebsite", value)
            }
          />
        </View>

        <View style={styles.formGroup}>
          <Text>Country</Text>
          <View style={styles.formContainer}>
            <RNPickerSelect
              onValueChange={(value) => handleFieldChange("country", value)}
              items={countryChoices?.map(([value, label]) => ({
                label,
                value,
              }))}
              style={pickerSelectStyles}
            />
          </View>
          {countryError && <Text style={styles.error}>{countryError}</Text>}
        </View>

        <View style={styles.formGroup}>
          <Text>ID Type</Text>
          <View style={styles.formContainer}>
            <RNPickerSelect
              onValueChange={(value) => handleFieldChange("idType", value)}
              items={idTypeChoices?.map(([value, label]) => ({
                label,
                value,
              }))}
              style={pickerSelectStyles}
            />
          </View>
          {idTypeError && <Text style={styles.error}>{idTypeError}</Text>}
        </View>

        <View style={styles.formGroup}>
          <Text>ID Number</Text>
          <TextInput
            style={styles.input}
            value={idNumber}
            onChangeText={(value) => handleFieldChange("idNumber", value)}
          />
          {idNumberError && <Text style={styles.error}>{idNumberError}</Text>}
        </View>

        <View style={styles.formGroup}>
          <Text>ID Card Photo</Text>
          <View style={styles.imgContainer}>
            <TouchableOpacity
              style={styles.imagePicker}
              onPress={() => pickImage("idCardImage", true)}
            >
              <Text style={styles.uploadText}>
                {idCardImage ? "Change Photo" : "Select Photo"}
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.imagePicker} onPress={() => pickImage("idCardImage", false)}>
              <Text style={styles.uploadText}>Capture Photo</Text>
            </TouchableOpacity> */}
            {idCardImage ? (
              <>
                <Image
                  source={{ uri: idCardImage.uri }}
                  style={styles.imagePreview}
                />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={removeImage}
                >
                  <Text style={styles.removeButtonText}>Remove Photo</Text>
                </TouchableOpacity>
              </>
            ) : null}
          </View>
          {idCardImageError && (
            <Text style={styles.error}>{idCardImageError}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text>Date of Birth</Text>
          <View style={styles.dobContainer}>
            <Button title="Select Date" onPress={() => setOpen(true)} />
            <DatePicker
              modal
              open={open}
              // style={styles.input}
              date={dob}
              mode="date"
              onConfirm={(date) => {
                setOpen(false);
                setDob(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
              placeholder="Select date"
              confirmText="Confirm"
              cancelText="Cancel"
              onDateChange={(date) => handleFieldChange("dob", date)}
            />
          </View>
          {/* {dobError && <Text style={styles.error}>{dobError}</Text>} */}
        </View>

        <View style={styles.formGroup}>
          <Text>Home Address</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={(value) => handleFieldChange("address", value)}
          />
          {addressError && <Text style={styles.error}>{addressError}</Text>}
        </View>

        <View style={styles.formGroup}>
          {loading && <Loader />}
          {formError && <Message variant="danger">{formError}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {success && (
            <Message variant="success">
              Seller Created Successfully. Redirecting to Photo Upload Page...
            </Message>
          )}
        </View>

        <View style={styles.submitBtn}>
          <TouchableOpacity onPress={handleCreateMarketplaceSeller}>
            <Text style={styles.roundedPrimaryBtn}>Create Seller</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  form: {
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginTop: 8,
  },
  uploadText: {
    color: "#007BFF",
    textDecorationLine: "underline",
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
  dobContainer: {
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
  roundedPrimaryBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  submitBtn: {
    padding: 10,
  },
  error: {
    color: "red",
    marginTop: 8,
  },
});

const pickerSelectStyles = StyleSheet.create({
  // inputIOS: {
  //   height: 40,
  //   borderColor: "#ccc",
  //   borderWidth: 1,
  //   paddingHorizontal: 8,
  //   marginTop: 8,
  // },
  // inputAndroid: {
  //   height: 40,
  //   borderColor: "#ccc",
  //   borderWidth: 1,
  //   paddingHorizontal: 8,
  //   marginTop: 8,
  // },
});

export default CreateMarketplaceSeller;
