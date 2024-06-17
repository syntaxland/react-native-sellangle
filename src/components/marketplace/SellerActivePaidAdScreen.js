// SellerActivePaidAdScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getSellerActivePaidAds } from "../../redux/actions/marketplaceSellerActions";
import AllPaidAdCard from "./AllPaidAdCard";
import Loader from "../../Loader";
import Message from "../../Message";
import { Pagination } from "../../Pagination"; 

const SellerActivePaidAdScreen = ({ seller_username }) => {
  const dispatch = useDispatch();

  const getSellerActivePaidAdsState = useSelector(
    (state) => state.getSellerActivePaidAdsState
  );
  const { loading, error, ads } = getSellerActivePaidAdsState;

  useEffect(() => {
    dispatch(getSellerActivePaidAds(seller_username));
  }, [dispatch, seller_username]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ads?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(ads?.length / itemsPerPage);

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
              {currentItems?.map((product) => (
                <View key={product.id} style={styles.card}>
                  <AllPaidAdCard product={product} />
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

export default SellerActivePaidAdScreen;
