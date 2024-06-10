// AdminFeedback.js
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { listFeedbacks } from "../../redux/actions/feedbackActions";
import Message from "../../Message";
import Loader from "../../Loader";
import { Pagination } from "../../Pagination";

const AdminFeedback = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const feedbackList = useSelector((state) => state.feedbackList);
  const { loading, feedbacks, error } = feedbackList;
  console.log("feedbacks:", feedbacks);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(listFeedbacks());
      setRefreshing(false);
    }, 2000);
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = feedbacks
    ? feedbacks.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  useEffect(() => {
    dispatch(listFeedbacks());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <Text style={styles.title}>
            <Text style={styles.icon}>
              {" "}
              <FontAwesomeIcon icon={faComments} />
            </Text>{" "}
            Feedbacks
          </Text>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {currentItems.length === 0 ? (
                <Text style={styles.noFeedbackText}>
                  Feedbacks appear here.
                </Text>
              ) : (
                <ScrollView horizontal={true}>
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>SN</DataTable.Title>
                      <DataTable.Title>User</DataTable.Title>
                      <DataTable.Title>Subject</DataTable.Title>
                      <DataTable.Title>Category</DataTable.Title>
                      <DataTable.Title>Message</DataTable.Title>
                      <DataTable.Title>Created At</DataTable.Title>
                    </DataTable.Header>
                    {currentItems.map((feedback, index) => (
                      <DataTable.Row key={feedback.id}>
                        <DataTable.Cell>{index + 1}</DataTable.Cell>
                        <DataTable.Cell>{feedback.email}</DataTable.Cell>
                        <DataTable.Cell>{feedback.subject}</DataTable.Cell>
                        <DataTable.Cell>{feedback.category}</DataTable.Cell>
                        <DataTable.Cell>{feedback.message}</DataTable.Cell>
                        <DataTable.Cell>
                          {new Date(feedback.created_at).toLocaleString(
                            "en-US",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              second: "numeric",
                            }
                          )}
                        </DataTable.Cell>
                      </DataTable.Row>
                    ))}
                  </DataTable>
                </ScrollView>
              )}
              <View style={styles.pagination}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(feedbacks.length / itemsPerPage)}
                  paginate={paginate}
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  icon: {
    fontSize: 20,
  },
  noFeedbackText: {
    textAlign: "center",
    paddingTop: 10,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default AdminFeedback;
