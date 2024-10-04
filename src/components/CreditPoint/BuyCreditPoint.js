// BuyCreditPoint.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { getPaymentApiKeys } from "../../redux/actions/paymentActions";
import PaymentScreen from "./PaymentScreen";
// import {
//   buyCreditPoint,
//   resetbuyCreditPointState,
// } from "../../redux/actions/creditPointActions";
import Message from "../../Message";
import Loader from "../../Loader";

const BuyCreditPoint = ({ currency }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const getPaymentApiKeysState = useSelector(
    (state) => state.getPaymentApiKeysState
  );
  const { loading, error, paystackPublicKey, paysofterPublicKey } =
    getPaymentApiKeysState;
  console.log("apiKeys:", paystackPublicKey, paysofterPublicKey);

  // const buyCreditPointState = useSelector((state) => state.buyCreditPointState);
  // const {
  //   loading: buyCreditPointLoading,
  //   success: buyCreditPointSuccess,
  //   error: buyCreditPointError,
  // } = buyCreditPointState;

  // const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    } else {
      dispatch(getPaymentApiKeys());
    }
  }, [userInfo, dispatch]);

  const userEmail = userInfo ? userInfo.email : null;
  console.log("userEmail:", userEmail);

  const [amount, setAmount] = useState("");
  const [showPaymentScreen, setShowPaymentScreen] = useState(false);

  const handleShowPaymentScreen = () => {
    setShowPaymentScreen(true);
  };

  const BUY_CPS_CHOICES = [
    { label: "500 cps for 500 NGN", value: "500" },
    { label: "1,000 cps for 1,000 NGN", value: "1000" },
    { label: "5,200 cps for 5,000 NGN", value: "5000" },
    { label: "10,800 cps for 10,000 NGN", value: "10000" },
    { label: "16,500 cps for 15,000 NGN", value: "15000" },
    { label: "24,000 cps for 20,000 NGN", value: "20000" },
    { label: "60,000 cps for 50,000 NGN", value: "50000" },
    { label: "125,000 cps for 100,000 NGN", value: "100000" },
    { label: "255,000 cps for 200,000 NGN", value: "200000" },
    { label: "700,000 cps for 500,000 NGN", value: "500000" },
    { label: "1,500,000 cps for 1,000,000 NGN", value: "1000000" },
  ];

  // const handleOnSuccess = () => {
  //   console.log("handling onSuccess...");
  //   const creditPointData = {
  //     amount: amount,
  //     currency: currency,
  //   };
  //   dispatch(buyCreditPoint(creditPointData));
  // };

  // const onSuccess = () => {
  //   handleOnSuccess();
  // };

  // const handleOnClose = () => {
  //   console.log("handling onClose...");
  //   navigation.navigate("Home");
  // };

  // const onClose = () => {
  //   handleOnClose();
  // };

  // useEffect(() => {
  //   if (buyCreditPointSuccess) {
  //     setShowSuccessMessage(true);
  //     dispatch(resetbuyCreditPointState());
  //     setTimeout(() => {
  //       navigation.navigate("Home");
  //       setShowSuccessMessage(false);
  //     }, 3000);
  //   }
  // }, [dispatch, buyCreditPointSuccess, navigation]);

  return (
    <ScrollView>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.container}>
            {/* {showSuccessMessage && (
              <Message variant="success">
                Your account has been credited with the CPS purchased for{" "}
                {amount} {currency}.
              </Message>
            )}
            {buyCreditPointLoading && <Loader />}
            {buyCreditPointError && (
              <Message variant="danger" fixed>
                {buyCreditPointError}
              </Message>
            )} */}
            {showPaymentScreen ? (
              <View style={styles.paymentContainer}>
                <PaymentScreen
                  currency={currency}
                  amount={amount}
                  paysofterPublicKey={paysofterPublicKey}
                  paystackPublicKey={paystackPublicKey}
                  email={userEmail}
                  // onSuccess={onSuccess}
                  // onClose={onClose}
                />
              </View>
            ) : (
              <>
                <View style={styles.formContainer}>
                  <Text style={styles.label}>Select CPS Amount</Text>
                  <View style={styles.selectBorder}>
                    <RNPickerSelect
                      onValueChange={(value) => setAmount(value)}
                      items={BUY_CPS_CHOICES}
                      placeholder={{ label: "Select CPS Amount", value: null }}
                      style={pickerSelectStyles}
                      value={amount}
                    />
                  </View>

                  {loading && <Loader />}
                  {error && <Message variant="danger">{error}</Message>}

                  <TouchableOpacity
                    onPress={handleShowPaymentScreen}
                    disabled={amount === ""}
                    style={
                      amount === ""
                        ? styles.roundedDisabledBtn
                        : styles.roundedPrimaryBtn
                    }
                  >
                    <Text style={styles.btnText}>Buy Credit Point (NGN)</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
    padding: 2,
    justifyContent: "center",
  },
  paymentContainer: {
    padding: 20,
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  formGroup: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  selectBorder: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
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

  roundedPrimaryBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  roundedDisabledBtn: {
    backgroundColor: "#d3d3d3",
    color: "#fff",
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

const pickerSelectStyles = StyleSheet.create({
  // inputIOS: {
  //   fontSize: 16,
  //   paddingVertical: 12,
  //   paddingHorizontal: 10,
  //   borderWidth: 1,
  //   borderColor: "gray",
  //   borderRadius: 4,
  //   color: "black",
  //   paddingRight: 30,
  //   marginBottom: 20,
  // },
  // inputAndroid: {
  //   fontSize: 16,
  //   paddingHorizontal: 10,
  //   paddingVertical: 8,
  //   borderWidth: 0.5,
  //   borderColor: "gray",
  //   borderRadius: 8,
  //   color: "black",
  //   paddingRight: 30,
  //   marginBottom: 20,
  // },
});

export default BuyCreditPoint;
