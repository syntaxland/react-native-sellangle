// SearchFreeAdScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { searchAds } from "../../redux/actions/marketplaceSellerActions";
import SearchFreeAdCard from "./SearchFreeAdCard";
import Message from "../../Message";
import Loader from "../../Loader";
import { Pagination } from "../../Pagination";

const SearchFreeAdScreen = ({
  selectedCountry,
  selectedState,
  selectedCity,
}) => {
  const dispatch = useDispatch();

  const searchAdsState = useSelector((state) => state.searchAdsState);
  const { loading, error, freeSearchAds } = searchAdsState;

  useEffect(() => {
    const adData = {
      selected_country: selectedCountry,
      selected_state: selectedState,
      selected_city: selectedCity,
    };
    dispatch(searchAds(adData));
  }, [dispatch, selectedCountry, selectedState, selectedCity]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = freeSearchAds?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(freeSearchAds?.length / itemsPerPage);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Running Ads</Text>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {currentItems?.length === 0 ? (
            <Text style={styles.noData}>Running ads appear here.</Text>
          ) : (
            <View style={styles.cardContainer}>
              {currentItems?.map((freeSearchAd) => (
                <View key={freeSearchAd.id} style={styles.card}>
                  <SearchFreeAdCard freeSearchAd={freeSearchAd} />
                </View>
              ))}
            </View>
          )}
          <View style={styles.pagination}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={handlePagination}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  noData: {
    textAlign: "center",
    marginVertical: 20,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  card: {
    width: "100%",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default SearchFreeAdScreen;
