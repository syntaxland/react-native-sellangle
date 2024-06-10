// Feedback.js
import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { listFeedbacks } from "../../redux/actions/feedbackActions";
import Loader from "../../Loader";
import Message from "../../Message";

const Feedback = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const feedbackList = useSelector((state) => state.feedbackList);
  const { loading, error, feedbacks } = feedbackList;

  useEffect(() => {
    dispatch(listFeedbacks());
  }, [dispatch]);

  const handleSendFeedback = () => {
    navigation.navigate("Send Feedback");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>
            <FontAwesomeIcon icon={faComments} /> Feedback
          </Text>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {/* {feedbacks && feedbacks.length > 0 ? (
                feedbacks.map((feedback, index) => (
                  <View key={index} style={styles.feedbackItem}>
                    <Text>{feedback.message}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noFeedbackText}>
                  No feedback available.
                </Text>
              )} */}

              <View style={styles.feedbackPrompt}>
                <Text style={styles.feedbackText}>
                  Would you like to send us a feedback?
                </Text>
                <TouchableOpacity onPress={handleSendFeedback}>
                  <Text style={styles.roundedPrimaryBtn}>Send Feedback</Text>
                </TouchableOpacity>
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
  feedbackPrompt: {
    marginTop: 30,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  feedbackText: {
    fontSize: 18,
    marginBottom: 10,
  },
  roundedPrimaryBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 10,
    borderRadius: 25,
    textAlign: "center",
  },
  feedbackItem: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
  },
  noFeedbackText: {
    textAlign: "center",
    paddingTop: 10,
  },
});

export default Feedback;
