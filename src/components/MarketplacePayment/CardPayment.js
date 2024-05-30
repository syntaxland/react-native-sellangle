// CardPayment.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import DatePicker from "react-native-datepicker";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  createPayment,
  createPaysofterPayment,
} from "../../redux/actions/paymentActions";
import Message from "../../Message";
import Loader from "../../Loader";

const CardPayment = ({
  promoTotalPrice,
  paymentData,
  reference,
  userEmail,
  publicApiKey,
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

  const paysofterPayment = useSelector((state) => state.paysofterPayment);
  const { loading, success, error } = paysofterPayment;

  const [cardType, setCardType] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expirationMonthYear: null,
    expirationMonth: null,
    expirationYear: null,
    cvv: "",
  });

  const [isExpirationMonthYearSelected, setIsExpirationMonthYearSelected] =
    useState(false);

  const handlePaymentDetailsChange = (name, value) => {
    let detectedCardType = "";
    if (/^4/.test(value)) {
      detectedCardType = "Visa";
    } else if (/^5[1-5]/.test(value)) {
      detectedCardType = "Mastercard";
    }
    setCardType(detectedCardType);
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const isFormValid = () => {
    return (
      isExpirationMonthYearSelected &&
      paymentDetails.cardNumber &&
      paymentDetails.cvv
    );
  };

  const createdAt = new Date().toISOString();

  const submitHandler = () => {
    const paysofterPaymentData = {
      payment_id: reference,
      email: userEmail,
      amount: promoTotalPrice,
      public_api_key: publicApiKey,
      created_at: createdAt,
      card_number: paymentDetails.cardNumber,
      expiration_month_year: paymentDetails.expirationMonthYear,
      cvv: paymentDetails.cvv,
    };

    dispatch(createPaysofterPayment(paysofterPaymentData));
  };

  useEffect(() => {
    if (success) {
      dispatch(createPayment(paymentData));
      const timer = setTimeout(() => {
        navigation.navigate("Dashboard");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Debit Card</Text>
      {success && (
        <Message variant="success">Payment made successfully.</Message>
      )}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <View style={styles.form}>
        <Text style={styles.label}>Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="1234 5678 9012 3456"
          value={paymentDetails.cardNumber}
          onChangeText={(value) =>
            handlePaymentDetailsChange("cardNumber", value)
          }
          keyboardType="numeric"
          maxLength={16}
        />
        {cardType && (
          <Text style={styles.cardType}>Detected Card Type: {cardType}</Text>
        )}
        <Text style={styles.label}>Expiration Month/Year</Text>
        <DatePicker
          style={styles.datePicker}
          date={paymentDetails.expirationMonthYear}
          mode="date"
          placeholder="Select month/year"
          format="MM/YY"
          minDate={new Date()}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(date) => {
            setPaymentDetails({
              ...paymentDetails,
              expirationMonthYear: date,
            });
            setIsExpirationMonthYearSelected(!!date);
          }}
        />
        <Text style={styles.label}>CVV</Text>
        <TextInput
          style={styles.input}
          placeholder="123"
          value={paymentDetails.cvv}
          onChangeText={(value) => handlePaymentDetailsChange("cvv", value)}
          secureTextEntry={true}
          keyboardType="numeric"
          maxLength={3}
        />
        <View style={styles.buttonContainer}>
          <Button
            title={`Pay (NGN ${promoTotalPrice?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })})`}
            onPress={submitHandler}
            disabled={!isFormValid()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  form: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
  },
  cardType: {
    marginBottom: 20,
  },
  datePicker: {
    width: "100%",
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default CardPayment;
