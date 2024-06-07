// SearchPaidAdScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { searchAds } from "../../redux/actions/marketplaceSellerActions"; 
import SearchPaidAdCard from "./SearchPaidAdCard";
import Message from "../../Message";
import Loader from "../../Loader";
import { Pagination } from "../../Pagination";

const SearchPaidAdScreen = ({
  selectedCountry,
  selectedState,
  selectedCity,
}) => {
  const dispatch = useDispatch();

  const searchAdsState = useSelector((state) => state.searchAdsState);
  const { loading, error, paidSearchAds } = searchAdsState;

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
  const currentItems = paidSearchAds?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(paidSearchAds?.length / itemsPerPage);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Promoted Ads</Text>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {currentItems?.length === 0 ? (
            <Text style={styles.noData}>Promoted ads appear here.</Text>
          ) : (
            <View style={styles.cardContainer}>
              {currentItems?.map((paidSearchAd) => (
                <View key={paidSearchAd.id} style={styles.card}>
                  <SearchPaidAdCard paidSearchAd={paidSearchAd} />
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

export default SearchPaidAdScreen;
