// GetFollowedSellers.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getFollowedSellers } from "../../redux/actions/marketplaceSellerActions";
import Message from "../../Message";
import Loader from "../../Loader";
import { Pagination } from "../../Pagination";
import SellerCard from "./SellerCard";

const GetFollowedSellers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFollowedSellers());
  }, [dispatch]);

  const getFollowedSellersState = useSelector(
    (state) => state.getFollowedSellersState
  );
  const { loading, error, followedSellers } = getFollowedSellersState;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = followedSellers?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(followedSellers?.length / itemsPerPage);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Followed Sellers</Text>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {currentItems?.length === 0 ? (
              <Text style={styles.noData}>No followed sellers found.</Text>
            ) : (
              <View style={styles.cardContainer}>
                {currentItems?.map((followedSeller) => (
                  <View key={followedSeller.id} style={styles.card}>
                    <SellerCard followedSeller={followedSeller} />
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
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

export default GetFollowedSellers;
