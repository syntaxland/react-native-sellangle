// BillingPeriod.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import { getAdCpsCharges } from "../../redux/actions/creditPointActions";
import Loader from "../../Loader";
import Message from "../../Message";
import AdChargesReceipt from "./AdChargesReceipt";

const BillingPeriod = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

  const getAdCpsChargesState = useSelector(
    (state) => state.getAdCpsChargesState
  );
  const { loading, adCpsCharges, error } = getAdCpsChargesState;

  const [billingPeriodOptions, setBillingPeriodOptions] = useState([]);
  const [selectedBillingPeriod, setSelectedBillingPeriod] = useState(null);

  useEffect(() => {
    const options =
      adCpsCharges?.reduce((uniqueOptions, charge) => {
        const formattedDate = new Date(charge.created_at).toLocaleString(
          "en-US",
          {
            month: "long",
            year: "numeric",
          }
        );

        if (!uniqueOptions.find((option) => option.label === formattedDate)) {
          uniqueOptions.push({
            value: charge.created_at,
            label: formattedDate,
          });
        }

        return uniqueOptions;
      }, []) || [];

    setBillingPeriodOptions(options);

    if (options.length > 0) {
      setSelectedBillingPeriod(options[options.length - 1]);
    }
  }, [adCpsCharges]);

  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getAdCpsCharges());
    wait(2000).then(() => setRefreshing(false));
  };

  useEffect(() => {
    dispatch(getAdCpsCharges());
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
          <Text style={styles.title}>Billing Period</Text>
          {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>}
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={(value) =>
                setSelectedBillingPeriod(
                  billingPeriodOptions.find((option) => option.value === value)
                )
              }
              items={billingPeriodOptions}
              value={selectedBillingPeriod?.value}
            />
          </View>
          <View style={styles.receiptContainer}>
            <AdChargesReceipt
              adChargesReceiptMonth={selectedBillingPeriod?.label}
              billingPeriodLoading={loading}
            />
          </View>
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
    padding: 20,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  pickerContainer: {
    marginVertical: 20,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 4,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  receiptContainer: {
    marginTop: 20,
  },
});

export default BillingPeriod;
