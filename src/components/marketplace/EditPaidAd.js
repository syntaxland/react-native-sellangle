// EditPaidAd.js
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import RNPickerSelect from "react-native-picker-select";
import { Country, State, City } from "country-state-city";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import {
  editPaidAd,
  getPaidAdDetail,
} from "../../redux/actions/marketplaceSellerActions";
import {
  FREE_AD_DURATION_CHOICES,
  AD_CONDITION_CHOICES,
  AD_CATEGORY_CHOICES,
  AD_TYPE_CHOICES,
  CURRENCY_CHOICES,
} from "../../constants";
import Message from "../../Message";
import Loader from "../../Loader";

const EditPaidAd = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { adId } = route.params;
  const richText = useRef();

  const [durationChoices, setDurationChoices] = useState([]);
  const [adConditionChoices, setAdConditionChoices] = useState([]);
  const [adCategoryChoices, setAdCategoryChoices] = useState([]);
  const [adTypeChoices, setAdTypeChoices] = useState([]);
  const [currencyChoices, setCurrencyChoices] = useState([]);

  useEffect(() => {
    setDurationChoices(FREE_AD_DURATION_CHOICES);
    setAdConditionChoices(AD_CONDITION_CHOICES);
    setAdCategoryChoices(AD_CATEGORY_CHOICES);
    setAdTypeChoices(AD_TYPE_CHOICES);
    setCurrencyChoices(CURRENCY_CHOICES);
  }, []);

  const getPaidAdDetailState = useSelector(
    (state) => state.getPaidAdDetailState
  );
  const { ads } = getPaidAdDetailState;
  console.log("Paid Ads:", ads);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  useEffect(() => {
    dispatch(getPaidAdDetail(adId));
  }, [dispatch, adId]);

  const editPaidAdState = useSelector((state) => state.editPaidAdState);
  const { success, error, loading } = editPaidAdState;

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);
  const [editAdChanges, setEditAdChanges] = useState(false);

  const [editAdData, setEditAdData] = useState({
    ad_name: "",
    ad_category: "",
    ad_type: "",
    location: "",
    country: {},
    state_province: {},
    city: {},
    condition: "",
    currency: "",
    price: "",
    brand: "",
    description: "",
    youtube_link: "",
    image1: "",
    image2: "",
    image3: "",
    duration: "",
    promo_code: "",
    discount_percentage: "",
    count_in_stock: "",
    is_price_negotiable: "",
    is_auto_renewal: "",
  });

  useEffect(() => {
    if (ads) {
      setEditAdData({
        ad_name: ads?.ad_name,
        ad_category: ads?.ad_category,
        ad_type: ads?.ad_type,
        location: ads?.location,

        // country: ads?.country ? Country?.getCountryByCode(ads?.country) : {},
        // state_province: ads?.state_province
        //   ? State?.getStateByCodeAndCountry(ads?.state_province, ads?.country)
        //   : {},
        // city: ads?.city
        //   ? City?.getCitiesOfState(ads?.country, ads?.state_province)?.find(
        //       (city) => city.name === ads?.city
        //     )
        //   : {},

        country: ads?.country ? Country?.getCountryByCode(ads?.country) : null,
        state_province: ads?.state_province
          ? State?.getStateByCodeAndCountry(ads?.state_province, ads?.country)
          : null,
        city: ads?.city
          ? City?.getCitiesOfState(ads?.country, ads?.state_province)?.find(
              (city) => city.name === ads?.city
            )
          : null,
        condition: ads?.condition,
        currency: ads?.currency,
        price: ads?.price,
        brand: ads?.brand,
        description: ads?.description,
        youtube_link: ads?.youtube_link,
        image1: ads?.image1,
        image2: ads?.image2,
        image3: ads?.image3,
        duration: ads?.duration,
        promo_code: ads?.promo_code,
        discount_percentage: ads?.discount_percentage,
        count_in_stock: ads?.count_in_stock,
        is_price_negotiable: ads?.is_price_negotiable,
        is_auto_renewal: ads?.is_auto_renewal,
      });
      setEditAdChanges(false);
    }
  }, [ads]);

  useEffect(() => {
    setCountries(Country?.getAllCountries());
  }, []);

  useEffect(() => {
    if (editAdData?.country) {
      setStates(State.getStatesOfCountry(editAdData?.country?.isoCode));
    } else {
      setStates([]);
    }
  }, [editAdData?.country]);

  useEffect(() => {
    if (editAdData.state_province) {
      setCities(
        City.getCitiesOfState(
          editAdData?.country?.isoCode,
          editAdData?.state_province?.isoCode
        )
      );
    } else {
      setCities([]);
    }
  }, [editAdData?.state_province, editAdData?.country?.isoCode]);

  const handleEditAdChanges = (e) => {
    const { name, value, files, checked } = e.target;

    if (name === "is_price_negotiable" || name === "is_auto_renewal") {
      setEditAdData({ ...editAdData, [name]: checked });
    } else if (files) {
      setEditAdData({ ...editAdData, [name]: files[0] });
    } else {
      setEditAdData({ ...editAdData, [name]: value });
    }

    setEditAdChanges(true);
  };

  const handleEditAd = () => {
    const editAdFormData = new FormData();

    editAdFormData.append("ad_name", editAdData.ad_name);
    editAdFormData.append("ad_category", editAdData.ad_category);
    editAdFormData.append("ad_type", editAdData.ad_type);
    editAdFormData.append("country", editAdData.country?.isoCode);
    editAdFormData.append("state_province", editAdData.state_province?.isoCode);
    editAdFormData.append("city", editAdData.city?.name);
    editAdFormData.append("condition", editAdData.condition);
    editAdFormData.append("currency", editAdData.currency);
    editAdFormData.append("price", editAdData.price);
    editAdFormData.append("brand", editAdData.brand);
    editAdFormData.append("description", editAdData.description);
    editAdFormData.append("youtube_link", editAdData.youtube_link);
    editAdFormData.append("duration", editAdData.duration);
    editAdFormData.append("promo_code", editAdData.promo_code);
    editAdFormData.append(
      "discount_percentage",
      editAdData.discount_percentage
    );
    editAdFormData.append("count_in_stock", editAdData.count_in_stock);
    editAdFormData.append(
      "is_price_negotiable",
      editAdData.is_price_negotiable
    );
    editAdFormData.append("ad_id", adId);

    if (editAdFormData.image1 instanceof File) {
      editAdFormData.append("image1", editAdData.image1);
    }

    if (editAdFormData.image2 instanceof File) {
      editAdFormData.append("image2", editAdData.image2);
    }

    if (editAdFormData.image3 instanceof File) {
      editAdFormData.append("image3", editAdData.image3);
    }

    console.log("editAdFormData:", editAdFormData);

    if (!editAdData.country || !editAdData.state_province) {
      setErrorMessage("Please select country, state/province.");
      return;
    }

    dispatch(editPaidAd(editAdFormData));
    setErrorMessage(null);
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

      if (field === "image1") setImage1(file);
      if (field === "image2") setImage2(file);
      if (field === "image3") setImage3(file);
    }
  };

  const removeImage = (imageType) => {
    if (imageType === "image1") setImage1(null);
    if (imageType === "image2") setImage2(null);
    if (imageType === "image3") setImage3(null);
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigation.navigate("CurrentAds");
      }, 3000);
    }
  }, [success, navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Edit Paid AD</Text>

      {loading && <Loader />}
      {success && <Message variant="success">Ad updated successfully.</Message>}
      {error && <Message variant="danger">{error}</Message>}

      <View style={styles.container}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Ad Name *</Text>
          <TextInput
            placeholder="Ad Name"
            value={editAdData?.ad_name}
            onChangeText={(text) => handleEditAdChanges("ad_name", text)}
            style={styles.input}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Ad Category *</Text>
          <RNPickerSelect
            onValueChange={(value) => handleEditAdChanges("ad_category", value)}
            items={adCategoryChoices?.map(([value, label]) => ({
              label,
              value,
            }))}
            style={pickerSelectStyles}
            value={editAdData?.ad_category}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Ad Type *</Text>
          <RNPickerSelect
            onValueChange={(value) => handleEditAdChanges("ad_type", value)}
            items={
              adTypeChoices[editAdData?.ad_category]?.map(([value, label]) => ({
                label,
                value,
              })) || []
            }
            style={pickerSelectStyles}
            value={editAdData?.ad_type}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Country *</Text>
          <Picker
            selectedValue={editAdData?.country}
            onValueChange={(value) => handleEditAdChanges("country", value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Country" value="" />
            {countries?.map((country) => (
              <Picker.Item
                key={country?.isoCode}
                label={country?.name}
                value={country?.isoCode}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>State/Province *</Text>
          <Picker
            selectedValue={editAdData?.state_province}
            onValueChange={(value) =>
              handleEditAdChanges("state_province", value)
            }
            enabled={states?.length > 0}
            style={styles.picker}
          >
            <Picker.Item label="Select State/Province" value="" />
            {states?.map((state) => (
              <Picker.Item
                key={state?.isoCode}
                label={state?.name}
                value={state?.isoCode}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>City *</Text>
          <Picker
            selectedValue={editAdData?.city}
            onValueChange={(value) => handleEditAdChanges("city", value)}
            enabled={cities?.length > 0}
            style={styles.picker}
          >
            <Picker.Item label="Select City" value="" />
            {cities?.map((city) => (
              <Picker.Item
                key={city?.name}
                label={city?.name}
                value={city?.name}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Condition</Text>
          <RNPickerSelect
            onValueChange={(value) => handleEditAdChanges("condition", value)}
            items={adConditionChoices?.map(([value, label]) => ({
              label,
              value,
            }))}
            style={pickerSelectStyles}
            value={editAdData?.condition}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Currency *</Text>
          <RNPickerSelect
            onValueChange={(value) => handleEditAdChanges("currency", value)}
            items={currencyChoices?.map(([value, label]) => ({
              label,
              value,
            }))}
            style={pickerSelectStyles}
            value={editAdData?.currency}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Price *</Text>
          <TextInput
            placeholder="Price"
            value={editAdData?.price}
            onChangeText={(text) => handleEditAdChanges("price", text)}
            style={styles.input}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Brand</Text>
          <TextInput
            placeholder="Brand"
            value={editAdData?.brand}
            onChangeText={(text) => handleEditAdChanges("brand", text)}
            style={styles.input}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>YouTube Link</Text>
          <TextInput
            placeholder="YouTube Link"
            value={editAdData?.youtube_link}
            onChangeText={(text) => handleEditAdChanges("youtube_link", text)}
            style={styles.input}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Count in Stock</Text>
          <TextInput
            placeholder="Count in Stock"
            value={editAdData?.count_in_stock}
            onChangeText={(text) => handleEditAdChanges("count_in_stock", text)}
            keyboardType="numeric"
            style={styles.input}
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
                {editAdData?.image1 ? "Change Image 1" : "Select Image 1"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.imagePicker}
              onPress={() => pickImage("image1", false)}
            >
              <Text style={styles.uploadText}>Capture Image 1</Text>
            </TouchableOpacity>

            {editAdData?.image1 ? (
              <>
                <Image
                  source={{ uri: editAdData?.image1 }}
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
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Image 2</Text>
          <View style={styles.imgContainer}>
            <TouchableOpacity
              style={styles.imagePicker}
              onPress={() => pickImage("image2", true)}
            >
              <Text style={styles.uploadText}>
                {editAdData?.image2 ? "Change Image 2" : "Select Image 2"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.imagePicker}
              onPress={() => pickImage("image2", false)}
            >
              <Text style={styles.uploadText}>Capture Image 2</Text>
            </TouchableOpacity>
            {editAdData?.image2 ? (
              <>
                <Image
                  source={{ uri: editAdData.image2 }}
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
                {editAdData?.image3 ? "Change Image 3" : "Select Image 3"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.imagePicker}
              onPress={() => pickImage("image3", false)}
            >
              <Text style={styles.uploadText}>Capture Image 3</Text>
            </TouchableOpacity>
            {editAdData?.image3 ? (
              <>
                <Image
                  source={{ uri: editAdData?.image3 }}
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
          <RNPickerSelect
            onValueChange={(value) => handleEditAdChanges("duration", value)}
            items={durationChoices?.map(([value, label]) => ({
              label,
              value,
            }))}
            style={pickerSelectStyles}
            value={editAdData?.duration}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description *</Text>
          <View style={styles.descContainer}>
            <RichToolbar
              editor={richText}
              actions={[
                actions.setBold,
                actions.setItalic,
                actions.insertLink,
                actions.setUnderline,
                actions.setStrikethrough,
                actions.undo,
                actions.redo,
              ]}
            />
            <RichEditor
              ref={richText}
              initialContentHTML={editAdData?.description}
              onChange={(text) => handleEditAdChanges("description", text)}
              placeholder="Enter ad description..."
            />
          </View>
        </View>

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
        {loading && <Loader />}

        <View style={styles.formGroup}>
          <TouchableOpacity onPress={handleEditAd} disabled={loading}>
            <Text style={styles.roundedPrimaryBtn}>Update Ad</Text>
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

export default EditPaidAd;
