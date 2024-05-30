// ReportPaidAd.js
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Button,
  Alert,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { reportPaidAd } from "../../redux/actions/marketplaceSellerActions";
import Message from "../../Message";
import Loader from "../../Loader";
import RNPickerSelect from "react-native-picker-select";

const AD_REPORT_CHOICES = [
  { label: "Misleading Content", value: "Misleading Content" },
  { label: "Inappropriate Content", value: "Inappropriate Content" },
  { label: "Irrelevant or Unwanted Ads", value: "Irrelevant or Unwanted Ads" },
  { label: "Malware or Phishing", value: "Malware or Phishing" },
  { label: "Privacy Concerns", value: "Privacy Concerns" },
  { label: "Low-Quality or Unprofessional Design", value: "Low-Quality or Unprofessional Design" },
  { label: "Counterfeit or Fraudulent Products", value: "Counterfeit or Fraudulent Products" },
  { label: "Political or Social Issues", value: "Political or Social Issues" },
  { label: "Technical Issues", value: "Technical Issues" },
  { label: "Unsolicited or Spammy Ads", value: "Unsolicited or Spammy Ads" },
  { label: "Disallowed Content", value: "Disallowed Content" },
  { label: "Unverified Claims", value: "Unverified Claims" },
  { label: "Unrealistic Promises", value: "Unrealistic Promises" },
];

const ReportPaidAd = ({ route }) => {
  const { adId } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [adReport, setAdReport] = useState("Inappropriate Content");
  const [refreshing, setRefreshing] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const reportPaidAdState = useSelector((state) => state.reportPaidAdState);
  const { loading, success, error } = reportPaidAdState;

  const adReportData = {
    ad_report: adReport,
    ad_id: adId,
  };

  const submitHandler = () => {
    dispatch(reportPaidAd(adReportData));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(reportPaidAd(adReportData));
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch]);

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  useEffect(() => {
    if (success) {
      Alert.alert("Success", "Ad reported successfully.");
      const timer = setTimeout(() => {
        navigation.goBack();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, navigation]);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <Text style={styles.title}>Report Ad</Text>
          {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>}
          {success && <Message variant="success">Ad reported successfully.</Message>}
          <RNPickerSelect
            onValueChange={(value) => setAdReport(value)}
            items={AD_REPORT_CHOICES}
            value={adReport}
            placeholder={{
              label: "Select Report",
              value: null,
            }}
            style={pickerSelectStyles}
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Submit Report"
              onPress={submitHandler}
              color="#007bff"
              disabled={loading || success}
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
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20,
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
    paddingRight: 30,
    marginVertical: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    marginVertical: 10,
  },
});

export default ReportPaidAd;
