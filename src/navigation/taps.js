import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../redux/actions/userProfileActions";
// import HomeScreen from "../components/screens/HomeScreen";
import Marketplace from "../components/marketplace/Marketplace";
import PostFreeAd from "../components/marketplace/PostFreeAd";
import CurrentAds from "../components/marketplace/CurrentAds";
import Dashboard from "../components/profiles/Dashboard";
import Inbox from "../components/profiles/Inbox";
import { Ionicons } from "@expo/vector-icons";
import { getUserMessages } from "../redux/actions/messagingActions";
import {
  GetActiveBuyerFreeAdMessages,
  GetActiveBuyerPaidAdMessages,
  listBuyerFreeAdMessages,
  listBuyerPaidAdMessages,
} from "../redux/actions/marketplaceSellerActions";

const Tab = createBottomTabNavigator();

export const HomeTabs = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile());
      dispatch(getUserMessages());
      dispatch(GetActiveBuyerFreeAdMessages());
      dispatch(GetActiveBuyerPaidAdMessages());
      dispatch(listBuyerFreeAdMessages());
      dispatch(listBuyerPaidAdMessages());
      dispatch(listSupportTicket());
    }
  }, [dispatch, userInfo]);

  const getUserMessagesState = useSelector(
    (state) => state.getUserMessagesState
  );
  const { messages } = getUserMessagesState;

  const msgCounted = messages?.reduce(
    (total, userMessages) => total + userMessages.msg_count,
    0
  );
  const listBuyerFreeAdMessagesState = useSelector(
    (state) => state.listBuyerFreeAdMessagesState
  );
  const { freeAdMessages } = listBuyerFreeAdMessagesState;

  const listBuyerPaidAdMessagesState = useSelector(
    (state) => state.listBuyerPaidAdMessagesState
  );
  const { paidAdMessages } = listBuyerPaidAdMessagesState;

  const msgFreeAdCounted = freeAdMessages?.reduce(
    (total, userMessages) => total + userMessages.seller_free_ad_msg_count,
    0
  );

  const msgPaidAdCounted = paidAdMessages?.reduce(
    (total, userMessages) => total + userMessages.seller_paid_ad_msg_count,
    0
  );

  const GetActiveBuyerFreeAdMessageState = useSelector(
    (state) => state.GetActiveBuyerFreeAdMessageState
  );
  const { activeBuyerFreeAdMessages } = GetActiveBuyerFreeAdMessageState;

  const GetActiveBuyerPaidAdMessageState = useSelector(
    (state) => state.GetActiveBuyerPaidAdMessageState
  );
  const { activeBuyerPaidAdMessages } = GetActiveBuyerPaidAdMessageState;

  const msgActiveFreeAdCounted = activeBuyerFreeAdMessages?.reduce(
    (total, userMessages) => total + userMessages.buyer_free_ad_msg_count,
    0
  );

  const msgActivePaidAdCounted = activeBuyerPaidAdMessages?.reduce(
    (total, userMessages) => total + userMessages.buyer_paid_ad_msg_count,
    0
  );

  const totalMsgCount =
    msgCounted +
    msgPaidAdCounted +
    msgFreeAdCounted +
    msgActiveFreeAdCounted +
    msgActivePaidAdCounted;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0f172a",
        },
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "#6c757d",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "HomeTabs") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Dashboard") {
            iconName = focused ? "speedometer" : "speedometer-outline";
          } else if (route.name === "Inbox") {
            iconName = focused ? "mail" : "mail-outline";
          } else if (route.name === "Post Free Ad") {
            iconName = focused ? "add" : "add-outline";
          } else if (route.name === "Current Ads") {
            iconName = focused ? "megaphone " : "megaphone -outline";
          }

          return (
            <Ionicons name={iconName} size={focused ? 32 : 18} color={color} />
          );
        },
      })}
    >
      <Tab.Screen
        name="HomeTaps"
        // name="Home"
        options={{
          title: "Home",
        }}
        component={Marketplace}
      />
      <Tab.Screen name="Dashboard" component={Dashboard} />

      {userInfo && (
        <>
          <Tab.Screen
            name="Inbox"
            component={Inbox}
            options={{
              tabBarBadge:
                totalMsgCount > 0 ? (
                  <Text style={styles.msgCounter}>{totalMsgCount}</Text>
                ) : null,
            }}
          />
        </>
      )}
      <Tab.Screen name="Post Free Ad" component={PostFreeAd} />

      {/* {userInfo && (
        <>
          <Tab.Screen name="Post Free Ad" component={PostFreeAd} />
        </>
      )} */}

      {userInfo && profile?.is_marketplace_seller && (
        <>
          <Tab.Screen name="Current Ads" component={CurrentAds} />
        </>
      )}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tapContainer: {
    padding: 10,
  },
  msgCounter: {
    fontSize: 14,
    backgroundColor: "red",
    color: "#fff",
    fontWeight: "bold",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 50,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: "red",
  },
});
