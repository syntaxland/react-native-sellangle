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

const Tab = createBottomTabNavigator();

export const HomeTabs = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

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
      <Tab.Screen name="Inbox" component={Inbox} />

      {userInfo && profile?.is_marketplace_seller && (
        <>
          <Tab.Screen name="Post Free Ad" component={PostFreeAd} />
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
});
