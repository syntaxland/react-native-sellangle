// CurrentAds.js
import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import FreeAdScreen from "./FreeAdScreen";
import PaidAdScreen from "./PaidAdScreen";

const CurrentAds = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <FreeAdScreen />
      </View>
      <View style={styles.section}>
        <PaidAdScreen />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  section: {
    marginVertical: 10,
  },
});

export default CurrentAds;
