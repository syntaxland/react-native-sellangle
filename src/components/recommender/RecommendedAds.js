// RecommendedAds.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import RecommendedFreeAds from "./RecommendedFreeAds";
import RecommendedPaidAds from "./RecommendedPaidAds";

function RecommendedAds() {
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Recommended Ads</Text>
        <RecommendedFreeAds />
        <RecommendedPaidAds />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    paddingVertical: 10,
    fontWeight: "bold",
  },
});

export default RecommendedAds;
