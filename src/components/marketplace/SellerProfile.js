// SellerProfile.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSellerAccount,
  updateSellerAccount,
  getSellerPhoto,
  updateSellerPhoto,
  getSellerPaysofterApiKey,
  updateSellerPaysofterApiKey,
} from "../../redux/actions/marketplaceSellerActions";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { List } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
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

function SellerProfile() {
  const dispatch = useDispatch();

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

  const getSellerAccountState = useSelector(
    (state) => state.getSellerAccountState
  );
  const {
    loading: getSellerAccountLoading,
    error: getSellerAccountError,
    sellerAccount,
  } = getSellerAccountState;

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
      Alert.alert("Redirecting to login...");
    }
  }, [userInfo]);

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

  const handleBusinessDataChanges = (name, value) => {
    setBusinessData({ ...businessData, [name]: value });
    setBusinessDataChanges(true);
  };

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

    dispatch(updateSellerAccount(businessFormData));
  };

  const handlePhotoInputChange = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhotoData({ photo: result.uri });
      setPhotoDataChanges(true);
    }
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

  const handleSellerApiKeyDataChanges = (name, value) => {
    setapiKeyData({ ...apiKeyData, [name]: value });
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
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  }, [
    updateSellerAccountSuccess,
    updateSellerPhotoSuccess,
    updateSellerApiKeySuccess,
  ]);

  const renderBusinessInformationForm = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Business Information</Text>
        <View style={styles.formGroup}>
          <Text>Business Name</Text>
          <TextInput
            style={styles.input}
            value={businessData.business_name}
            onChangeText={(text) =>
              handleBusinessDataChanges("business_name", text)
            }
          />
        </View>
        <View style={styles.formGroup}>
          <Text>Business Registration Number</Text>
          <TextInput
            style={styles.input}
            value={businessData.business_reg_num}
            onChangeText={(text) =>
              handleBusinessDataChanges("business_reg_num", text)
            }
          />
        </View>
        <View style={styles.formGroup}>
          <Text>Business Address</Text>
          <TextInput
            style={styles.input}
            value={businessData.business_address}
            onChangeText={(text) =>
              handleBusinessDataChanges("business_address", text)
            }
          />
        </View>
        <View style={styles.formGroup}>
          <Text>ID Type</Text>
          <RNPickerSelect
            onValueChange={(value) =>
              handleBusinessDataChanges("id_type", value)
            }
            items={idTypeChoices?.map((choice) => ({
              label: choice[1],
              value: choice[0],
            }))}
            style={pickerSelectStyles}
          />
        </View>
        <View style={styles.formGroup}>
          <Text>ID Number</Text>
          <TextInput
            style={styles.input}
            value={businessData.id_number}
            onChangeText={(text) =>
              handleBusinessDataChanges("id_number", text)
            }
          />
        </View>

        <View style={styles.formGroup}>
          <Text>Date of Birth</Text>
          <DateTimePicker
            value={new Date(businessData.dob)}
            mode="date"
            display="default"
            // onChange={(event, date) =>
            //   handleBusinessDataChanges("dob", date.toISOString().split("T")[0])
            // }
          />
        </View>

        <View style={styles.formGroup}>
          <Text>Home Address</Text>
          <TextInput
            style={styles.input}
            value={businessData.home_address}
            onChangeText={(text) =>
              handleBusinessDataChanges("home_address", text)
            }
          />
        </View>
        <View style={styles.formGroup}>
          <Text>Staff Size</Text>
          <RNPickerSelect
            onValueChange={(value) =>
              handleBusinessDataChanges("staff_size", value)
            }
            items={staffSizeChoices?.map((choice) => ({
              label: choice[1],
              value: choice[0],
            }))}
            style={pickerSelectStyles}
          />
        </View>
        <View style={styles.formGroup}>
          <Text>Business Industry</Text>
          <RNPickerSelect
            onValueChange={(value) =>
              handleBusinessDataChanges("business_industry", value)
            }
            items={industryChoices?.map((choice) => ({
              label: choice[1],
              value: choice[0],
            }))}
            style={pickerSelectStyles}
          />
        </View>
        <View style={styles.formGroup}>
          <Text>Business Category</Text>
          <RNPickerSelect
            onValueChange={(value) =>
              handleBusinessDataChanges("business_category", value)
            }
            items={businessCategoryChoices?.map((choice) => ({
              label: choice[1],
              value: choice[0],
            }))}
            style={pickerSelectStyles}
          />
        </View>
        <View style={styles.formGroup}>
          <Text>Business Description</Text>
          <TextInput
            style={styles.input}
            value={businessData.business_description}
            onChangeText={(text) =>
              handleBusinessDataChanges("business_description", text)
            }
          />
        </View>
        <View style={styles.formGroup}>
          <Text>Business Phone</Text>
          <PhoneInput
            initialCountry="us"
            value={businessData.business_phone}
            onChangePhoneNumber={(text) =>
              handleBusinessDataChanges("business_phone", text)
            }
          />
        </View>
        <View style={styles.formGroup}>
          <Text>Business Website</Text>
          <TextInput
            style={styles.input}
            value={businessData.business_website}
            onChangeText={(text) =>
              handleBusinessDataChanges("business_website", text)
            }
          />
        </View>
        <View style={styles.formGroup}>
          <Text>Country</Text>
          <RNPickerSelect
            onValueChange={(value) =>
              handleBusinessDataChanges("country", value)
            }
            items={countryChoices?.map((choice) => ({
              label: choice[1],
              value: choice[0],
            }))}
            style={pickerSelectStyles}
          />
        </View>
        <Button
          title="Update Business Information"
          onPress={handleUpdateBusinessAccount}
        />
      </View>
    );
  };

  const renderPhotoForm = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Seller Photo</Text>
        <View style={styles.formGroup}>
          <Image source={{ uri: photoData.photo }} style={styles.photo} />
          <Button title="Change Photo" onPress={handlePhotoInputChange} />
        </View>
        <Button title="Update Photo" onPress={handleUpdatePhoto} />
      </View>
    );
  };

  const renderApiKeyForm = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Seller API Key</Text>
        <View style={styles.formGroup}>
          <Text>Paysofter API Key</Text>
          <TextInput
            style={styles.input}
            value={apiKeyData.live_api_key}
            onChangeText={(text) =>
              handleSellerApiKeyDataChanges("live_api_key", text)
            }
          />
        </View>
        <Button title="Update API Key" onPress={handleSellerApiKey} />
      </View>
    );
  };

  return (
    <ScrollView>
      {successMessage && (
        <Text style={styles.successMessage}>{successMessage}</Text>
      )}
      <List.Section>
        <List.Accordion
          title="Business Information"
          left={(props) => <List.Icon {...props} icon="account" />}
        >
          {renderBusinessInformationForm()}
        </List.Accordion>
        <List.Accordion
          title="Seller Photo"
          left={(props) => <List.Icon {...props} icon="image" />}
        >
          {renderPhotoForm()}
        </List.Accordion>
        <List.Accordion
          title="Seller API Key"
          left={(props) => <List.Icon {...props} icon="key" />}
        >
          {renderApiKeyForm()}
        </List.Accordion>
      </List.Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  successMessage: {
    color: "green",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  header: {
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    padding: 20,
    backgroundColor: "#fff",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default SellerProfile;
