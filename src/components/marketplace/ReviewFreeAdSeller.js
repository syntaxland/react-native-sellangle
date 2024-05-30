// ReviewFreeAdSeller.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Modal,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { reviewFreeAdSeller } from "../../redux/actions/marketplaceSellerActions";
import Loader from "../../Loader";
// import GetFreeAdSellerReviews from "./GetFreeAdSellerReviews";
import RNPickerSelect from "react-native-picker-select";

const SELLER_REVIEW_CHOICES = [
  { label: "1 - Poor", value: "1" },
  { label: "1.5", value: "1.5" },
  { label: "2 - Fair", value: "2" },
  { label: "2.5", value: "2.5" },
  { label: "3 - Good", value: "3" },
  { label: "3.5", value: "3.5" },
  { label: "4 - Very Good", value: "4" },
  { label: "4.5", value: "4.5" },
  { label: "5 - Excellent", value: "5" },
];

function ReviewFreeAdSeller({ adId }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const reviewFreeAdSellerState = useSelector(
    (state) => state.reviewFreeAdSellerState
  );
  const { loading, success } = reviewFreeAdSellerState;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [reviewSellerModal, setReviewSellerModal] = useState(false);

  const handleReviewSellerOpen = () => {
    setReviewSellerModal(true);
  };

  const handleReviewSellerClose = () => {
    setReviewSellerModal(false);
  };

  const handleFieldChange = (fieldName, value) => {
    switch (fieldName) {
      case "rating":
        setRating(value);
        break;
      case "comment":
        setComment(value);
        break;
      default:
        break;
    }
  };

  const reviewData = {
    ad_id: adId,
    rating: rating,
    comment: comment,
  };

  const submitHandler = () => {
    dispatch(reviewFreeAdSeller(reviewData));
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        handleReviewSellerClose();
      }, 3000);
    }
  }, [success]);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        {userInfo ? (
          <TouchableOpacity onPress={handleReviewSellerOpen}>
            <Text style={styles.link}>Seller Reviews</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Seller Reviews</Text>
          </TouchableOpacity>
        )}

        <Modal
          visible={reviewSellerModal}
          onRequestClose={handleReviewSellerClose}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Seller Reviews</Text>

            <ScrollView contentContainerStyle={styles.modalContent}>
              <Text style={styles.subTitle}>Rate Seller</Text>
              {loading && <Loader />}
              {/* Add success and error message handling if needed */}

              <View style={styles.formGroup}>
                <Text style={styles.label}>Rating</Text>
                <RNPickerSelect
                  onValueChange={(value) => handleFieldChange("rating", value)}
                  items={SELLER_REVIEW_CHOICES}
                  value={rating}
                  style={pickerSelectStyles}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Comment</Text>
                <TextInput
                  style={styles.textInput}
                  multiline
                  numberOfLines={4}
                  value={comment}
                  onChangeText={(text) => handleFieldChange("comment", text)}
                  placeholder="Enter comment"
                  maxLength={225}
                />
              </View>

              <Button
                title="Submit"
                onPress={submitHandler}
                disabled={comment === ""}
              />
            </ScrollView>

            {/* <GetFreeAdSellerReviews adId={adId} /> */}

            <Button title="Close" onPress={handleReviewSellerClose} />
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
    textAlign: "center",
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  modalContent: {
    flexGrow: 1,
    padding: 16,
  },
  formGroup: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default ReviewFreeAdSeller;
