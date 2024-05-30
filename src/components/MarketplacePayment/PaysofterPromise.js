// PaysofterPromise.js
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import RNPickerSelect from "react-native-picker-select";
import { useSelector } from "react-redux";
import PaysofterAccountFundPromise from "./PaysofterAccountFundPromise";
import PaysofterUsdAccountFundPromise from "./PaysofterUsdAccountFundPromise";
import { useNavigation } from "@react-navigation/native";
import Message from "../../Message";
import Loader from "../../Loader";
import { PAYMENT_DURATION_CHOICES } from "../../constants";

const PaysofterPromise = ({
  buyerEmail,
  currency,
  amount,
  sellerApiKey,
  paymentData,
  reference,
}) => {
  // const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  const debitPaysofterAccountState = useSelector(
    (state) => state.debitPaysofterAccountState
  );
  const { loading, success, error } = debitPaysofterAccountState;
  const [durationChoices, setDurationChoices] = useState([]);

  useEffect(() => {
    setDurationChoices(PAYMENT_DURATION_CHOICES);
  }, []);

  const [duration, setDuration] = useState("Within 1 day");
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showPaysofterAccountFundPromise, setShowPaysofterAccountFundPromise] =
    useState(false);

  const handleShowPaysofterAccountFundPromise = useCallback(() => {
    setShowPaysofterAccountFundPromise(true);
  }, []);

  const handleInfoModalShow = useCallback(() => {
    setShowInfoModal(true);
  }, []);

  const handleInfoModalClose = useCallback(() => {
    setShowInfoModal(false);
  }, []);

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      handleShowPaysofterAccountFundPromise();
    },
    [handleShowPaysofterAccountFundPromise]
  );

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {}, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleFieldChange = (field, value) => {
    if (field === "duration") {
      setDuration(value);
    }
  };
  const handleLearnMore = () => {
    Linking.openURL("https://paysofter.com/");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {showPaysofterAccountFundPromise ? (
          <>
            {currency === "USD" ? (
              <PaysofterUsdAccountFundPromise
                currency={currency}
                amount={amount}
                buyerEmail={buyerEmail}
                sellerApiKey={sellerApiKey}
                paymentData={paymentData}
                reference={reference}
                duration={duration}
              />
            ) : (
              <PaysofterAccountFundPromise
                currency={currency}
                amount={amount}
                buyerEmail={buyerEmail}
                sellerApiKey={sellerApiKey}
                paymentData={paymentData}
                reference={reference}
                duration={duration}
              />
            )}
          </>
        ) : (
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <View style={styles.labelContainer}>
                <Text style={styles.headerText}>Paysofter Promise </Text>
                <TouchableOpacity onPress={handleInfoModalShow}>
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    size={16}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Modal
              visible={showInfoModal}
              onRequestClose={handleInfoModalClose}
              transparent={true}
              animationType="slide"
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Paysofter Promise</Text>
                  <Text style={styles.modalText}>
                    Paysofter Promise option escrows or places in custody the
                    payment made to a seller (using the payer's funded Paysofter
                    Account Fund) until a specified condition has been
                    fulfilled.
                  </Text>
                  <View style={styles.learnMoreBtn}>
                    <Button title="Learn more" onPress={handleLearnMore} />
                  </View>
                  <Button title="Close" onPress={handleInfoModalClose} />
                </View>
              </View>
            </Modal>

            {success && (
              <Message variant="success">Payment made successfully.</Message>
            )}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}

            <View style={styles.formGroup}>
              <Text style={styles.label}>Currency</Text>
              <TextInput
                style={styles.input}
                value={currency}
                editable={false}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Expected Settlement Duration</Text>
              <RNPickerSelect
                onValueChange={(value) => handleFieldChange("duration", value)}
                items={durationChoices?.map(([value, label]) => ({
                  label,
                  value,
                }))}
                style={pickerSelectStyles}
                value={duration}
              />
            </View>

            <View style={styles.formGroup}>
              <TouchableOpacity onPress={submitHandler}>
                <Text style={styles.roundedPrimaryBtn}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
    padding: 2,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 5,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  roundedPrimaryBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  learnMoreBtn: {
    padding: 5,
    marginBottom: 10,
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

export default PaysofterPromise;
