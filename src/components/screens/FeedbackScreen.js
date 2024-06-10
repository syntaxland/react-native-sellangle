// FeedbackScreen.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import {
  createFeedback,
  resetFeedback,
} from "../../redux/actions/feedbackActions";
import Loader from "../../Loader";
import Message from "../../Message";
import { SUPPORT_CHOICES } from "../../constants";

const FeedbackScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [supportChoices, setSupportChoices] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  useEffect(() => {
    setSupportChoices(SUPPORT_CHOICES);
  }, []);

  const feedbackCreate = useSelector((state) => state.feedbackCreate);
  const { loading, success, error } = feedbackCreate;

  const submitHandler = () => {
    const feedbackData = {
      subject,
      category,
      message,
    };

    dispatch(createFeedback(feedbackData));
  };

  useEffect(() => {
    if (success) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => {
        setSubject("");
        setCategory("");
        setMessage("");
        setShowSuccessMessage(false);
        dispatch(resetFeedback());
        navigation.navigate("Home");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <Text style={styles.headerText}>Feedback</Text>
          {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>}
          {showSuccessMessage && (
            <Message variant="success">Feedback sent successfully.</Message>
          )}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Category</Text>
            <RNPickerSelect
              onValueChange={(value) => setCategory(value)}
              items={supportChoices.map(([value, label]) => ({ label, value }))}
              style={pickerSelectStyles}
              value={category}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Subject</Text>
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={(text) => setSubject(text)}
              placeholder="Enter subject"
              maxLength={80}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Message</Text>
            <TextInput
              style={[styles.input, styles.textarea]}
              value={message}
              onChangeText={(text) => setMessage(text)}
              placeholder="Enter message"
              maxLength={1000}
              multiline
              numberOfLines={4}
            />
          </View>

          <TouchableOpacity
            onPress={submitHandler}
            style={styles.submitButton}
            disabled={message === "" || subject === "" || loading}
          >
            <Text style={styles.submitButtonText}>Submit Feedback</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollViewContainer: {
    padding: 16,
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderColor: "#ced4da",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#e9ecef",
  },
  textarea: {
    height: 100,
  },
  submitButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    backgroundColor: "#e9ecef",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    backgroundColor: "#e9ecef",
  },
});

export default FeedbackScreen;
