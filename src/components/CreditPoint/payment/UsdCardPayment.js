// UsdCardPayment.js
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
import DateTimePicker from "@react-native-community/datetimepicker";
// import DatePicker from "react-native-date-picker";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  buyUsdCreditPoint,
  resetbuyUsdCreditPointState,
} from "../../../redux/actions/creditPointActions";
import {
  createPaysofterPayment,
  resetCreatePaysofterPaymentState,
} from "../../../redux/actions/paymentActions";
import Message from "../../../Message";
import Loader from "../../../Loader";
import { formatAmount } from "../../../FormatAmount";

const UsdCardPayment = ({
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
  const [showDatePicker, setShowDatePicker] = useState(false);

  const paysofterPayment = useSelector((state) => state.paysofterPayment);
  const { loading, success, error } = paysofterPayment;

  const buyUsdCreditPointState = useSelector(
    (state) => state.buyUsdCreditPointState
  );
  const {
    success: buyUsdCreditPointSuccess,
    error: buyUsdCreditPointError,
    loading: buyUsdCreditPointLoading,
  } = buyUsdCreditPointState;

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
      amount: amount,
      currency: currency,
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

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || paymentDetails.expirationMonthYear;
    setShowDatePicker(false);
    setPaymentDetails({
      ...paymentDetails,
      expirationMonthYear: currentDate,
    });
    setIsExpirationMonthYearSelected(!!selectedDate);
  };

  useEffect(() => {
    if (success) {
      dispatch(buyUsdCreditPoint(creditPointData));
      // const timer = setTimeout(() => {}, 5000);
      // return () => clearTimeout(timer);
    }
  }, [dispatch, success]);

  useEffect(() => {
    if (buyUsdCreditPointSuccess) {
      dispatch(resetCreatePaysofterPaymentState());
      dispatch(resetbuyUsdCreditPointState());

      const timer = setTimeout(() => {
        navigation.navigate("Home");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [buyUsdCreditPointSuccess, navigation, dispatch]);

  console.log("UsdCardPayment", amount);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Debit Card</Text>
        <Text style={styles.message}>
          {success && (
            <Message variant="success">Payment made successfully.</Message>
          )}
        </Text>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        {buyUsdCreditPointLoading && (
          <Text style={styles.message}>
            {" "}
            Creating CPS ... <Loader />{" "}
          </Text>
        )}

          {buyUsdCreditPointSuccess && (
            <Message variant="success">
              Your account has been credited with the CPS purchased for {amount}{" "}
              {currency}.
            </Message>
          )}
        {buyUsdCreditPointError && (
          <Message variant="danger">{buyUsdCreditPointError}</Message>
        )}

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

        {/* <View style={styles.formGroup}>
          <Text style={styles.label}>Expiration Month/Year</Text>
          <DatePicker
            date={paymentDetails.expirationMonthYear}
            onDateChange={(date) => {
              setPaymentDetails({ ...paymentDetails, expirationMonthYear: date });
              setIsExpirationMonthYearSelected(!!date);
            }}
            mode="date"
            display="spinner"
            placeholder="Select month/year"
            style={styles.datePicker}
          />
        </View> */}

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
    padding: 20,
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

export default UsdCardPayment;
