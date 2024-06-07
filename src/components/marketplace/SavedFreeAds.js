// SavedFreeAds.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUserSavedFreeAds } from "../../redux/actions/marketplaceSellerActions";
import AllFreeAdCard from "./AllFreeAdCard";
import Message from "../../Message";
import Loader from "../../Loader";
import { Pagination } from "../../Pagination";

const SavedFreeAds = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserSavedFreeAds());
  }, [dispatch]);

  const getUserSavedFreeAdsState = useSelector(
    (state) => state.getUserSavedFreeAdsState
  );
  const { loading, error, savedAds } = getUserSavedFreeAdsState;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = savedAds?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Running Ads</Text>
      </View>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {currentItems?.length === 0 ? (
            <View style={styles.emptyMessage}>
              <Text>Saved running ads appear here.</Text>
            </View>
          ) : (
            <View style={styles.adsContainer}>
              {currentItems?.map((product) => (
                <View key={product.id} style={styles.adCard}>
                  <AllFreeAdCard product={product} />
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

export default SavedFreeAds;
