// CardPayment.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
// import DatePicker from "react-native-date-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
// import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  buyCreditPoint,
  resetbuyCreditPointState,
} from "../../../redux/actions/creditPointActions";
import {
  createPaysofterPayment,
  resetCreatePaysofterPaymentState,
} from "../../../redux/actions/paymentActions";
import Message from "../../../Message";
import Loader from "../../../Loader";
import { formatAmount } from "../../../FormatAmount";

const CardPayment = ({
  amount,
  currency,
  reference,
  userEmail,
  paysofterPublicKey,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

  const createdAt = new Date().toISOString();

  const paysofterPayment = useSelector((state) => state.paysofterPayment);
  const { loading, success, error } = paysofterPayment;

  const buyCreditPointState = useSelector((state) => state.buyCreditPointState);
  const {
    success: buyCreditPointSuccess,
    error: buyCreditPointError,

    loading: buyCreditPointLoading,
  } = buyCreditPointState;

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [cardType, setCardType] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expirationMonthYear: new Date(),
    cvv: "",
  });

  const [isExpirationMonthYearSelected, setIsExpirationMonthYearSelected] =
    useState(false);

  const handlePaymentDetailsChange = (name, value) => {
    let detectedCardType = "";
    if (name === "cardNumber") {
      if (/^4/.test(value)) {
        detectedCardType = "Visa";
      } else if (/^5[1-5]/.test(value)) {
        detectedCardType = "Mastercard";
      }
      setCardType(detectedCardType);
    }
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const isFormValid = () => {
    return (
      isExpirationMonthYearSelected &&
      paymentDetails.cardNumber &&
      paymentDetails.cvv
    );
  };

  const submitHandler = () => {
    const paysofterPaymentData = {
      payment_id: reference,
      email: userEmail,
      currency: currency,
      amount: amount,
      public_api_key: paysofterPublicKey,
      created_at: createdAt,
      card_number: paymentDetails.cardNumber,
      expiration_month_year: paymentDetails.expirationMonthYear,
      cvv: paymentDetails.cvv,
    };

    dispatch(createPaysofterPayment(paysofterPaymentData));
  };

  const creditPointData = {
    amount: amount,
  };

  useEffect(() => {
    if (success) {
      dispatch(buyCreditPoint(creditPointData));
    }
  }, [dispatch, success]);

  useEffect(() => {
    if (buyCreditPointSuccess) {
      dispatch(resetCreatePaysofterPaymentState());
      dispatch(resetbuyCreditPointState());
      const timer = setTimeout(() => {
        navigation.navigate("Home");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [buyCreditPointSuccess, navigation, dispatch]);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || paymentDetails.expirationMonthYear;
    setShowDatePicker(false);
    setPaymentDetails({
      ...paymentDetails,
      expirationMonthYear: currentDate,
    });
    setIsExpirationMonthYearSelected(!!selectedDate);
  };

  console.log("CardPayment", amount);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Debit Card</Text>
        <View style={styles.message}>
          {success && (
            <Message variant="success">Payment made successfully.</Message>
          )}
        </View>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <View style={styles.message}>
          {buyCreditPointSuccess && (
            <Message variant="success">
              Your account has been credited with the CPS purchased for {amount}{" "}
              {currency}.
            </Message>
          )}
        </View>
        {buyCreditPointLoading && <Loader />}

        <Text style={styles.message}>
          {buyCreditPointError && (
            <Message variant="danger">{buyCreditPointError}</Message>
          )}
        </Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Card Number</Text>
          <TextInput
            style={styles.input}
            value={paymentDetails.cardNumber}
            onChangeText={(value) =>
              handlePaymentDetailsChange("cardNumber", value)
            }
            placeholder="1234 5678 9012 3456"
            keyboardType="numeric"
            maxLength={16}
          />
          {cardType ? <Text>Detected Card Type: {cardType}</Text> : null}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Expiration Month/Year</Text>
          <Button
            title="Select Expiration Date"
            onPress={() => setShowDatePicker(true)}
          />
          <Text>
            Selected: {paymentDetails.expirationMonthYear.toLocaleDateString()}
          </Text>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={paymentDetails.expirationMonthYear}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          {/* <Text style={styles.dateText}>
            {moment(paymentDetails.expirationMonthYear).format("YYYY-MM")}
          </Text> */}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>CVV</Text>
          <TextInput
            style={styles.input}
            value={paymentDetails.cvv}
            onChangeText={(value) => handlePaymentDetailsChange("cvv", value)}
            placeholder="123"
            secureTextEntry
            maxLength={3}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={submitHandler}
          disabled={!isFormValid()}
        >
          <Text style={styles.buttonText}>
            Pay ({formatAmount(amount)} {currency})
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  datePicker: {
    // width: "100%",
    // width: 320,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  message: {
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
});

export default CardPayment;
