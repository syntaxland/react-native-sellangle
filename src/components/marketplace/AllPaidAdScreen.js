// AllPaidAdScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllPaidAd } from "../../redux/actions/marketplaceSellerActions";
import Message from "../../Message";
import Loader from "../../Loader";
import { Pagination } from "../../Pagination";
import AllPaidAdCard from "./AllPaidAdCard";

const AllPaidAdScreen = () => {
  const dispatch = useDispatch();

  const getAllPaidAdState = useSelector((state) => state.getAllPaidAdState);
  const { loading, error, paidAds } = getAllPaidAdState;

  useEffect(() => {
    dispatch(getAllPaidAd());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = paidAds?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(paidAds?.length / itemsPerPage);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
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
    // marginVertical: 10,
    // padding: 10,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default AllPaidAdScreen;
