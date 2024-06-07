// SellerShopFront.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getUserProfile } from "../../redux/actions/userProfileActions";
import SellerActiveFreeAdScreen from "./SellerActiveFreeAdScreen";
import SellerActivePaidAdScreen from "./SellerActivePaidAdScreen";
import GetSellerDetail from "./GetSellerDetail";

const SellerShopFront = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();

  const { seller_username } = route.params;
  console.log("SellerShopFront seller_username:", seller_username);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    } else {
      dispatch(getUserProfile());
    }
  }, [dispatch, userInfo, navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
       Seller Shop Front
      </Text>

      <View style={styles.section}>
        <GetSellerDetail seller_username={seller_username} />
      </View>

      <View style={styles.section}>
        <SellerActiveFreeAdScreen seller_username={seller_username} />
      </View>

      <View style={styles.section}>
        <SellerActivePaidAdScreen seller_username={seller_username} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
});

export default SellerShopFront;
