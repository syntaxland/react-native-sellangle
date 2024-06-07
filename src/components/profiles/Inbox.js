// Inbox.js
import React, { useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet, RefreshControl } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  GetActiveBuyerFreeAdMessages,
  clearBuyerFreeAdMessageCounter,
  listBuyerFreeAdMessages,
  listBuyerPaidAdMessages,
} from "../../redux/actions/marketplaceSellerActions";
import { getUserMessages } from "../../redux/actions/messagingActions";
import GetActiveBuyerFreeAdMsg from "./GetActiveBuyerFreeAdMsg";
import GetActiveBuyerPaidAdMsg from "./GetActiveBuyerPaidAdMsg";
import GetSellerFreeAdMsgInbox from "./GetSellerFreeAdMsgInbox";
import GetSellerPaidAdMsgInbox from "./GetSellerPaidAdMsgInbox";
import MessageInbox from "./MessageInbox";

const Inbox = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(GetActiveBuyerFreeAdMessages());
      dispatch(clearBuyerFreeAdMessageCounter());
      dispatch(listBuyerFreeAdMessages());
      dispatch(listBuyerPaidAdMessages());
      dispatch(getUserMessages());
      setRefreshing(false);
    }, 2000);
  };

  const sections = [
    { key: "GetActiveBuyerFreeAdMsg", component: <GetActiveBuyerFreeAdMsg /> },
    { key: "GetActiveBuyerPaidAdMsg", component: <GetActiveBuyerPaidAdMsg /> },
    { key: "GetSellerFreeAdMsgInbox", component: <GetSellerFreeAdMsgInbox /> },
    { key: "GetSellerPaidAdMsgInbox", component: <GetSellerPaidAdMsgInbox /> },
    { key: "MessageInbox", component: <MessageInbox /> },
  ];

  useEffect(() => {
    dispatch(GetActiveBuyerFreeAdMessages());
    dispatch(clearBuyerFreeAdMessageCounter());
    dispatch(listBuyerFreeAdMessages());
    dispatch(listBuyerPaidAdMessages());
    dispatch(getUserMessages());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>
          <FontAwesomeIcon icon={faEnvelope} /> Inbox
        </Text>
      </View>
      <FlatList
        data={sections}
        renderItem={({ item }) => (
          <View style={styles.section}>{item.component}</View>
        )}
        keyExtractor={(item) => item.key}
        // refreshing={refreshing}
        // onRefresh={onRefresh}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    paddingVertical: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
  },
});

export default Inbox;
