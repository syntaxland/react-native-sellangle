// SearchResults.js
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
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
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getSellerUsernameSearch,
  searchAds,
  getAllPaidAd,
  getAllFreeAd,
} from "../../redux/actions/marketplaceSellerActions";
import { getUserProfile } from "../../redux/actions/userProfileActions";
import Message from "../../Message";
import Loader from "../../Loader";
import SellerSearchCard from "./SellerSearchCard";
import SearchFreeAdScreen from "./SearchFreeAdScreen";
import SearchPaidAdScreen from "./SearchPaidAdScreen";
// import SearchFilterBar from "./SearchFilterBar";
import { Country, State, City } from "country-state-city";

const SearchResults = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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

  const [searchTerm, setSearchTerm] = useState("");
  const [sellerUsername, setSellerUsername] = useState("");
  const [searchSellerUsername, setSearchSellerUsername] = useState(null);
  const [searchAdResult, setSearchAdResult] = useState(null);

  const [filteredFreeAds, setFilteredFreeAds] = useState([]);
  const [filteredPaidAds, setFilteredPaidAds] = useState([]);

  // const [selectedCategory, setSelectedCategory] = useState(null);
  // const [selectedType, setSelectedType] = useState(null);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [freeAdSearchLength, setFreeAdSearchLength] = useState(0);
  const [paidAdSearchLength, setPaidAdSearchLength] = useState(0);

  useEffect(() => {
    setFreeAdSearchLength(freeSearchAds ? freeSearchAds.length : 0);
    setPaidAdSearchLength(paidSearchAds ? paidSearchAds.length : 0);
  }, [freeSearchAds, paidSearchAds]);

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    const savedCountry = AsyncStorage.getItem("selectedCountry");
    const savedState = AsyncStorage.getItem("selectedState");
    const savedCity = AsyncStorage.getItem("selectedCity");

    if (savedCountry) setSelectedCountry(savedCountry);
    if (savedState) setSelectedState(savedState);
    if (savedCity) setSelectedCity(savedCity);
  }, []);

  useEffect(() => {
    if (selectedCountry)
      AsyncStorage.setItem("selectedCountry", JSON.stringify(selectedCountry));
    if (selectedState)
      AsyncStorage.setItem("selectedState", JSON.stringify(selectedState));
    if (selectedCity)
      AsyncStorage.setItem("selectedCity", JSON.stringify(selectedCity));
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

  // const handleCategoryChange = useCallback(
  //   (category) => {
  //     setSelectedCategory(category);
  //     setSelectedType(null);

  //     const filteredFreeAds = freeSearchAds?.filter(
  //       (ad) => ad.ad_category === category
  //     );
  //     const filteredPaidAds = paidSearchAds?.filter(
  //       (ad) => ad.ad_category === category
  //     );
  //     setFilteredFreeAds(filteredFreeAds);
  //     setFilteredPaidAds(filteredPaidAds);

  //     AsyncStorage.setItem("selectedCategory", category);
  //     AsyncStorage.removeItem("selectedType");
  //   },
  //   [freeSearchAds, paidSearchAds]
  // );

  // const handleTypeChange = useCallback(
  //   (type, filteredFreeAds, filteredPaidAds) => {
  //     setSelectedType(type);
  //     setFilteredFreeAds(filteredFreeAds);
  //     setFilteredPaidAds(filteredPaidAds);
  //   },
  //   []
  // );

  const handleCountryChange = async (country) => {
    setSelectedCountry(country);
    setSelectedState("");
    setSelectedCity("");
    await AsyncStorage.setItem("selectedCountry", JSON.stringify(country));
    await AsyncStorage.removeItem("selectedState");
    await AsyncStorage.removeItem("selectedCity");
  };

  const handleStateChange = async (state) => {
    setSelectedState(state);
    setSelectedCity("");
    await AsyncStorage.setItem("selectedState", JSON.stringify(state));
    await AsyncStorage.removeItem("selectedCity");
  };

  const handleCityChange = async (city) => {
    setSelectedCity(city);
    await AsyncStorage.setItem("selectedCity", JSON.stringify(city));
  };

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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <Text style={styles.sellerResults}>Search Results</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search ads"
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
            />
            <Button title="Search" onPress={handleSearchAds} />
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
                Ad Location ({freeAdSearchLength + paidAdSearchLength} ads)
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

          {/* <SearchFilterBar
            selectedCategory={selectedCategory}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            setSelectedCategory={setSelectedCategory}
            freeSearchAds={freeSearchAds}
            paidSearchAds={paidSearchAds}
            onCategoryChange={handleCategoryChange}
            onTypeChange={handleTypeChange}
          /> */}

          <View style={styles.resultsContainer}>
            {searchAdLoading || sellerUsernameSearchLoading ? (
              <Loader />
            ) : searchAdError || sellerUsernameSearchError ? (
              <Message variant="danger">{searchAdError}</Message>
            ) : (
              <View>
                {/* <View style={styles.adResults}>
                  {freeSearchAds?.map((ad) => (
                    <SearchFreeAdScreen key={ad.id} ad={ad} />
                  ))}
                </View>
                <View style={styles.adResults}>
                  {paidSearchAds?.map((ad) => (
                    <SearchPaidAdScreen key={ad.id} ad={ad} />
                  ))}
                </View>
                <View style={styles.sellerResults}>
                  <Text style={styles.title}>
                    <FontAwesomeIcon icon={faSearch} size={14} /> Search Found (
                    {freeAdSearchLength + paidAdSearchLength} ads)
                  </Text>
                  {serachResults?.map((result) => (
                    <SellerSearchCard key={result.id} result={result} />
                  ))}
                </View> */}

                <View>
                  <View>
                    {searchSellerUsername && (
                      <View>
                        {serachResults && (
                          <SellerSearchCard
                            key={serachResults.id}
                            serachResults={serachResults}
                            sellerAvatarUrl={sellerAvatarUrl}
                          />
                        )}
                      </View>
                    )}
                  </View>

                  <View>
                    <Text style={styles.sellerResults}>
                      <Text style={styles.title}></Text> Search Found (
                      {freeAdSearchLength + paidAdSearchLength})
                    </Text>
                    {searchAdResult && (
                      <View>
                        <View>
                          <View>
                            {freeSearchAds || paidSearchAds ? (
                              <>
                                {/* {paidSearchAds?.map((ad) => (
                                  <View>
                                    {paidSearchAds && (
                                      <SearchPaidAdScreen
                                        key={ad.id}
                                        selectedCountry={selectedCountry}
                                        selectedState={selectedState}
                                        selectedCity={selectedCity}
                                        paidSearchAds={
                                          filteredPaidAds || paidSearchAds
                                        }
                                      />
                                    )}
                                  </View>
                                ))} */}

                                {/* {freeSearchAds?.map((ad) => (
                                  <View>
                                    {freeSearchAds && (
                                      <SearchFreeAdScreen
                                        key={ad.id}
                                        selectedCountry={selectedCountry}
                                        selectedState={selectedState}
                                        selectedCity={selectedCity}
                                        freeSearchAds={
                                          filteredFreeAds || freeSearchAds
                                        }
                                      />
                                    )}
                                  </View>
                                ))} */}

                                <View style={styles.resultsSection}>
                                  <Text style={styles.sectionTitle}>
                                    Paid Ads
                                  </Text>
                                  {filteredPaidAds.length > 0 ? (
                                    filteredPaidAds.map((ad) => (
                                      <SearchPaidAdScreen
                                        key={ad.id}
                                        selectedCountry={selectedCountry}
                                        selectedState={selectedState}
                                        selectedCity={selectedCity}
                                        // ad={ad}
                                        // paidSearchAds={
                                        //   filteredPaidAds || paidSearchAds
                                        // }
                                      />
                                    ))
                                  ) : (
                                    <></>
                                  )}
                                </View>

                                <View style={styles.resultsSection}>
                                  <Text style={styles.sectionTitle}>
                                    Free Ads
                                  </Text>
                                  {filteredFreeAds.length > 0 ? (
                                    filteredFreeAds.map((ad) => (
                                      <SearchFreeAdScreen
                                        key={ad.id}
                                        selectedCountry={selectedCountry}
                                        selectedState={selectedState}
                                        selectedCity={selectedCity}
                                        // freeSearchAds={
                                        //   filteredFreeAds || freeSearchAds
                                        // }
                                        // ad={ad}
                                      />
                                    ))
                                  ) : (
                                    <></>
                                  )}
                                </View>
                              </>
                            ) : (
                              <></>
                            )}
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 50,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
    marginBottom: 10,
  },
  locationContainer: {
    marginBottom: 20,
  },
  location: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  adLocation: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  resultsContainer: {
    flex: 1,
  },
  searchResultText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  adResults: {
    marginBottom: 20,
  },
  sellerResults: {
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default SearchResults;
