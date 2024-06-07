// Marketplace.js
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faMapMarkerAlt,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import AllPaidAdScreen from "./AllPaidAdScreen";
import AllFreeAdScreen from "./AllFreeAdScreen";
import SellerSearchCard from "./SellerSearchCard";
import FilterBar from "./FilterBar";
import Quotes from "./Quotes";
import { getUserProfile } from "../../redux/actions/userProfileActions";
import {
  getSellerUsernameSearch,
  getAllPaidAd,
  getAllFreeAd,
} from "../../redux/actions/marketplaceSellerActions";
import { Country, State, City } from "country-state-city";
import Message from "../../Message";
import Loader from "../../Loader";

const Marketplace = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  const getAllPaidAdState = useSelector((state) => state.getAllPaidAdState);
  const { paidAds } = getAllPaidAdState;

  const getAllFreeAdState = useSelector((state) => state.getAllFreeAdState);
  const { freeAds } = getAllFreeAdState;

  const searchAdsState = useSelector((state) => state.searchAdsState);
  const {
    loading: searchAdLoading,
    error: searchAdError,
    freeSearchAds,
    paidSearchAds,
  } = searchAdsState;

  const getSellerUsernameSearchState = useSelector(
    (state) => state.getSellerUsernameSearchState
  );
  const {
    loading: sellerUsernameSearchLoading,
    error: sellerUsernameSearchError,
    serachResults,
    sellerAvatarUrl,
  } = getSellerUsernameSearchState;

  const [sellerUsername, setSellerUsername] = useState("");
  const [searchSellerUsername, setSearchSellerUsername] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [freeAdLength, setFreeAdLength] = useState(0);
  const [paidAdLength, setPaidAdLength] = useState(0);

  const [filteredFreeAds, setFilteredFreeAds] = useState([]);
  const [filteredPaidAds, setFilteredPaidAds] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    const fetchData = async () => {
      const storedCategory = await AsyncStorage.getItem("selectedCategory");
      const storedType = await AsyncStorage.getItem("selectedType");

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
    };

    fetchData();
  }, [freeAds, paidAds]);

  useEffect(() => {
    const fetchData = async () => {
      const savedCountry = await AsyncStorage.getItem("selectedCountry");
      // const savedState = await AsyncStorage.getItem("selectedState");
      // const savedCity = await AsyncStorage.getItem("selectedCity");

      if (savedCountry) setSelectedCountry(savedCountry);
      // if (savedState) setSelectedState(savedState);
      // if (savedCity) setSelectedCity(savedCity);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      if (selectedCountry)
        await AsyncStorage.setItem("selectedCountry", selectedCountry);
      if (selectedState)
        await AsyncStorage.setItem("selectedState", selectedState);
      if (selectedCity)
        await AsyncStorage.setItem("selectedCity", selectedCity);
    };

    saveData();
  }, [selectedCountry, selectedState, selectedCity]);

  useEffect(() => {
    const adData = {
      selected_country: selectedCountry,
      selected_state: selectedState,
      selected_city: selectedCity,
    };
    dispatch(getAllPaidAd(adData));
    dispatch(getAllFreeAd(adData));
  }, [dispatch, selectedCountry, selectedState, selectedCity]);

  useEffect(() => {
    setFreeAdLength(freeAds ? freeAds.length : 0);
    setPaidAdLength(paidAds ? paidAds.length : 0);
  }, [freeAds, paidAds]);

  const handleCategoryChange = useCallback(
    async (category) => {
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

      await AsyncStorage.setItem("selectedCategory", category);
      await AsyncStorage.removeItem("selectedType");
    },
    [freeAds, paidAds]
  );

  const handleTypeChange = useCallback(
    async (type, filteredFreeAds, filteredPaidAds) => {
      setSelectedType(type);
      setFilteredFreeAds(filteredFreeAds);
      setFilteredPaidAds(filteredPaidAds);
    },
    []
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const adData = {
      selected_country: selectedCountry,
      selected_state: selectedState,
      selected_city: selectedCity,
    };
    dispatch(getAllPaidAd(adData));
    dispatch(getAllFreeAd(adData));
    setTimeout(() => setRefreshing(false), 500);
  }, [dispatch, selectedCountry, selectedState, selectedCity]);

  const handlePostFreeAd = () => {
    if (!userInfo) {
      navigation.navigate("Login");
    } else if (userInfo && !profile.is_marketplace_seller) {
      navigation.navigate("Create Seller Account");
    } else {
      navigation.navigate("Post Free Ad");
    }
  };

  const handleSearchAds = () => {
    navigation.navigate("Search Results");
  };

  const handleSellerUsernameSearch = async (e) => {
    e.preventDefault();
    if (sellerUsername.trim() !== "") {
      const lowerCaseUsername = sellerUsername.toLowerCase().trim();
      const result = dispatch(getSellerUsernameSearch(lowerCaseUsername));
      setSearchSellerUsername(lowerCaseUsername);
      if (result && !sellerUsernameSearchError) {
        await AsyncStorage.setItem("sellerUsername", lowerCaseUsername);
      }
    } else {
      setSellerUsername("");
      setSearchSellerUsername(null);
    }
  };

  const handleCountryChange = async (country) => {
    setSelectedCountry(country);
    setSelectedState("");
    setSelectedCity("");
    await AsyncStorage.setItem("selectedCountry", country);
    await AsyncStorage.removeItem("selectedState");
    await AsyncStorage.removeItem("selectedCity");
  };

  const handleStateChange = async (state) => {
    setSelectedState(state);
    setSelectedCity("");
    // await AsyncStorage.setItem("selectedState", state);
    // await AsyncStorage.removeItem("selectedCity");
  };

  const handleCityChange = async (city) => {
    setSelectedCity(city);
    // await AsyncStorage.setItem("selectedCity", city);
  };

  console.log("Hey Sellangle!");

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <View>
            <Quotes />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handlePostFreeAd}>
              <Text style={styles.roundedPrimaryBtn}>
                Post Free Ad{" "}
                <FontAwesomeIcon
                  icon={faPlusSquare}
                  size={14}
                  // style={styles.icon}
                  color="white"
                />
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSearchAds}>
              <Text style={styles.roundedPrimaryBtn}>
                Search Ads{" "}
                <FontAwesomeIcon
                  icon={faSearch}
                  size={14}
                  // style={styles.icon}
                  color="white"
                />
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by Seller Username"
              value={sellerUsername}
              onChangeText={(text) => setSellerUsername(text)}
            />
            <Button title="Search" onPress={handleSellerUsernameSearch} />
          </View>

          <View style={styles.locationContainer}>
            <View style={styles.location}>
              <Text style={styles.title}>
                <FontAwesomeIcon icon={faMapMarkerAlt} size={14} />
                Ad Location ({freeAdLength + paidAdLength} ads)
              </Text>
            </View>

            <View>
              <Text style={styles.pickerLabel}>Country:</Text>
              <View style={styles.adLocation}>
                <Picker
                  selectedValue={selectedCountry}
                  onValueChange={handleCountryChange}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Country" value="" />
                  {Country.getAllCountries().map((country) => (
                    <Picker.Item
                      key={country.isoCode}
                      label={country.name}
                      value={country.isoCode}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View>
              <Text style={styles.pickerLabel}>State/Province:</Text>
              <View style={styles.adLocation}>
                <Picker
                  selectedValue={selectedState}
                  onValueChange={handleStateChange}
                  style={styles.picker}
                >
                  <Picker.Item label="Select State/Province" value="" />
                  {State.getStatesOfCountry(selectedCountry).map((state) => (
                    <Picker.Item
                      key={state.isoCode}
                      label={state.name}
                      value={state.isoCode}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View>
              <Text style={styles.pickerLabel}>City:</Text>
              <View style={styles.adLocation}>
                <Picker
                  selectedValue={selectedCity}
                  onValueChange={handleCityChange}
                  style={styles.picker}
                >
                  <Picker.Item label="Select City" value="" />
                  {City.getCitiesOfState(selectedCountry, selectedState).map(
                    (city) => (
                      <Picker.Item
                        key={city.name}
                        label={city.name}
                        value={city.name}
                      />
                    )
                  )}
                </Picker>
              </View>
            </View>
          </View>

          <View>
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
          </View>

          <View>
            {searchAdLoading && <Loader />}
            {searchAdError && <Message>{searchAdError}</Message>}

            {sellerUsernameSearchLoading && <Loader />}
            {sellerUsernameSearchError && (
              <Message>{sellerUsernameSearchError}</Message>
            )}

            {searchSellerUsername && (
              <SellerSearchCard
                sellerUsername={searchSellerUsername}
                searchResults={serachResults}
                sellerAvatarUrl={sellerAvatarUrl}
              />
            )}
          </View>

          <View style={styles.adContainer}>
            <AllPaidAdScreen
              selectedCountry={selectedCountry}
              selectedState={selectedState}
              selectedCity={selectedCity}
              // paidAds={filteredPaidAds}
              // paidAds={selectedType ? filteredPaidAds : paidAds}
              paidAds={filteredPaidAds || paidAds}
            />
          </View>

          <View style={styles.adContainer}>
            <AllFreeAdScreen
              selectedCountry={selectedCountry}
              selectedState={selectedState}
              selectedCity={selectedCity}
              freeAds={filteredFreeAds || freeAds}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    // padding: 8,
    paddingVertical: 10,
    paddingBottom: 10,
  },
  container: {
    // flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    // paddingHorizontal: 20,
    paddingVertical: 10,
    // padding: 5,
  },
  headerContainer: {
    padding: 20,
    backgroundColor: "#6c757d",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {
    flex: 1,
    borderColor: "#ced4da",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  scrollViewContainer: {
    paddingBottom: 20,
  },
  locationContainer: {
    padding: 20,
  },
  location: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  adLocation: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,

    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 10,
  },
  adContainer: {
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
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
});

export default Marketplace;
