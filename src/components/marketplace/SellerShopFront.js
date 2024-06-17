// SellerShopFront.js
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getUserProfile } from "../../redux/actions/userProfileActions";
import {
  getSellerDetail,
} from "../../redux/actions/marketplaceSellerActions";
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
    if (userInfo) {
      dispatch(getUserProfile());
    }
      dispatch(getSellerDetail(seller_username));
  }, [dispatch, userInfo, navigation, seller_username]);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getSellerDetail(seller_username));
    setTimeout(() => setRefreshing(false), 2000);
  }, [dispatch]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.title}>Seller Shop Front</Text>

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
