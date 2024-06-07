// ViewedAds.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import ViewedFreeAds from "../marketplace/ViewedFreeAds";
import ViewedPaidAds from "../marketplace/ViewedPaidAds";

function ViewedAds() {
  const navigation = useNavigation();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  return (
    <ScrollView >
      <View style={styles.container}>
        <Text style={styles.header}>Viewed Ads</Text>
        <ViewedFreeAds />
        <ViewedPaidAds />
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

export default ViewedAds;
