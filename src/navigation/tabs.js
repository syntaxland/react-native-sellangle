// taps.js
import React, { useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getUserProfile } from "../redux/actions/userProfileActions";
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
  const navigation = useNavigation();

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
          backgroundColor: "#007bff",
          paddingBottom: 5,
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#6c757d",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Dashboard") {
            iconName = focused ? "speedometer" : "speedometer-outline";
          } else if (route.name === "Inbox") {
            iconName = focused ? "mail" : "mail-outline";
          } else if (route.name === "Post Free Ad") {
            iconName = focused ? "add" : "add-outline";
          } else if (route.name === "Current Ads") {
            iconName = focused ? "megaphone" : "megaphone-outline";
          }

          return (
            <Ionicons name={iconName} size={focused ? 32 : 18} color={color} />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        options={{
          title: "Home",
        }}
        component={Marketplace}
      />
      {/* <Tab.Screen name="Dashboard" component={Dashboard} /> */}
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (!userInfo) {
              e.preventDefault();
              navigation.navigate("Login");
            }
          },
        })}
      />

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
      {/* <Tab.Screen name="Post Free Ad" component={PostFreeAd} /> */}

      <Tab.Screen
        name="Post Free Ad"
        component={PostFreeAd}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            if (!userInfo) {
              navigation.navigate("Login");
            } else if (userInfo && !profile.is_marketplace_seller) {
              navigation.navigate("Create Seller Account");
            } else {
              navigation.navigate("Post Free Ad");
            }
          },
        })}
      />

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
