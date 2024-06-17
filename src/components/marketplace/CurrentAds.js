// CurrentAds.js
import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import FreeAdScreen from "./FreeAdScreen";
import PaidAdScreen from "./PaidAdScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";

const CurrentAds = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>
          <FontAwesomeIcon icon={faBullhorn} style={styles.icon} /> Current Ads
        </Text>
        <View style={styles.section}>
          <FreeAdScreen />
        </View>
        <View style={styles.section}>
          <PaidAdScreen />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    flexDirection: "row", 
    padding: 20,
  },
  icon: {
    marginRight: 10,  
  },
  section: {
    marginVertical: 10,
  },
});

export default CurrentAds;
