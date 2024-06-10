// SavedPaidAds.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUserSavedPaidAds } from "../../redux/actions/marketplaceSellerActions";
import AllPaidAdCard from "./AllPaidAdCard";
import Message from "../../Message";
import Loader from "../../Loader"; 
import { Pagination } from "../../Pagination";

const SavedPaidAds = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserSavedPaidAds());
  }, [dispatch]);

  const getUserSavedPaidAdsState = useSelector(
    (state) => state.getUserSavedPaidAdsState
  );
  const { loading, error, savedAds } = getUserSavedPaidAdsState;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = savedAds?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Promoted Ads</Text>
      </View>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {currentItems?.length === 0 ? (
            <View style={styles.emptyMessage}>
              <Text>Saved promoted ads appear here.</Text>
            </View>
          ) : (
            <View style={styles.adsContainer}>
              {currentItems?.map((product) => (
                <View key={product.id} style={styles.adCard}>
                  <AllPaidAdCard product={product} />
                </View>
              ))}
            </View>
          )}
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={savedAds?.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  header: {
    alignItems: "center",
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  emptyMessage: {
    alignItems: "center",
    marginVertical: 20,
  },
  adsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  adCard: {
    flexBasis: "98%",
    marginBottom: 20,
  },
});

export default SavedPaidAds;
