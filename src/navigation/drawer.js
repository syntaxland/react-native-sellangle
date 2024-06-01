// drawer.js
import React, { useState, useEffect } from "react";
import { TouchableOpacity , Text, View, StyleSheet} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  // DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  HomeStack,
  // UserDashboardStack,
  HomeTabsStack,
} from "./stack";

import { useSelector, useDispatch } from "react-redux";
import {
  useNavigation,
  // useRoute
} from "@react-navigation/native";
// import { styles } from "./screens/screenStyles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faDashboard,
  faUser,
  faUserShield,
  faHandPeace,
  faUserPlus,
  faSackDollar,
  faMessage,
  faHeart,
  faEye,
  faThumbsUp,
  faComments,
  faTicket,
  faGear,
  faAd,
  faLink,
  faMoneyBill,
  faSignIn,
  faSignInAlt,
  faSignOut,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { logout } from "../redux/actions/userActions";
import { getUserProfile } from "../redux/actions/userProfileActions";

const Drawer = createDrawerNavigator();

export const MyDrawer = (props) => {
  return (
    <>
      <SafeAreaProvider>
        <Drawer.Navigator
          // initialRouteName="Home"
          // screenOptions={{ headerShown: false }}

          screenOptions={{
            headerShown: false,
            drawerActiveTintColor: "#007bff",
            drawerInactiveTintColor: "#fff",
            drawerStyle: {
              backgroundColor: "#007bff",
            },
          }}
          drawerContent={(props) => (
            <View style={{ flex: 1, backgroundColor: "#007bff" }}>
              <CustomDrawerContent {...props} />
            </View>
          )}
        >
          <Drawer.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              title: "Home",
            }}
          />

          <Drawer.Screen
            name="HomeTabs"
            component={HomeTabsStack}
            options={{ drawerLabel: "" }}
          />

          {/* <Drawer.Screen
            name="Dashboard"
            component={UserDashboardStack}
            options={{ drawerLabel: "" }}
          /> */}
        </Drawer.Navigator>
      </SafeAreaProvider>
    </>
  );
};

export const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const route = useRoute();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  const [greeting, setGreeting] = useState("");
  const [showCreditPointLinks, setShowCreditPointLinks] = useState(false);

  const toggleCreditPointLinks = () => {
    setShowCreditPointLinks(!showCreditPointLinks);
  };

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch, userInfo]);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 0 && currentHour < 12) {
      setGreeting("Good morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
  };

  // const getLabelStyle = (currentRoute) => {
  // const route = useRoute();
  //   return route.name === currentRoute
  //     ? [styles.drawerItemLabel, styles.activeDrawerItemLabel]
  //     : styles.drawerItemLabel;
  // };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.greetingContainer}>
        <View style={styles.drawerItemContainer}>
          <Text style={styles.greetingText}>
            {userInfo
              ? `${greeting}, ${
                  userInfo.first_name.charAt(0).toUpperCase() +
                  userInfo.first_name.slice(1)
                }!`
              : `${greeting}!`}
          </Text>
          <FontAwesomeIcon
            color={styles.greetingIconColor}
            icon={faHandPeace}
            size={styles.iconSize}
            style={styles.icon}
          />
        </View>
      </View>

      {userInfo ? (
        <View style={styles.drawerContainer}>
          <Text style={styles.title}>User Metrics</Text>
          <View style={styles.drawerItemContainer}>
            <FontAwesomeIcon
              color={styles.iconColor}
              icon={faDashboard}
              size={styles.iconSize}
              style={styles.icon}
            />
            <DrawerItem
              label="Dashboard"
              onPress={() => navigation.navigate("Dashboard")}
              style={styles.drawerItem}
              labelStyle={styles.drawerItemLabel}
              // labelStyle={getLabelStyle("Dashboard")}
            />
          </View>

          <View style={styles.drawerItemContainer}>
            <FontAwesomeIcon
              color={styles.iconColor}
              icon={faUser}
              size={styles.iconSize}
              style={styles.icon}
            />
            <DrawerItem
              label="Profile"
              onPress={() => navigation.navigate("UserProfile")}
              style={styles.drawerItem}
              labelStyle={styles.drawerItemLabel}
              // labelStyle={getLabelStyle("UserProfile")}
            />
          </View>

          <View style={styles.drawerItemContainer}>
            <FontAwesomeIcon
              color={styles.iconColor}
              icon={faUserPlus}
              size={styles.iconSize}
              style={styles.icon}
            />
            <DrawerItem
              label="Referral"
              onPress={() => navigation.navigate("Referral")}
              style={styles.drawerItem}
              labelStyle={styles.drawerItemLabel}
            />
          </View>

          <View style={styles.drawerItemContainer}>
            <FontAwesomeIcon
              color={styles.iconColor}
              icon={faSackDollar}
              size={styles.iconSize}
              style={styles.icon}
            />

            <TouchableOpacity
              onPress={toggleCreditPointLinks}
              style={styles.toggleContainer}
            >
              <DrawerItem
                label="Credit Point"
                onPress={toggleCreditPointLinks}
                style={styles.drawerItem}
                labelStyle={styles.drawerItemLabel}
              />
              <FontAwesomeIcon
                color={styles.iconColor}
                icon={faCaretDown}
                // size={styles.iconSize}
                style={styles.toggleIcon}
              />
            </TouchableOpacity>
          </View>

          {showCreditPointLinks && (
            <>
              <View style={styles.drawerItemContainer}>
                <FontAwesomeIcon
                  color={styles.iconColor}
                  icon={faSackDollar}
                  size={styles.iconSize}
                  style={styles.icon}
                />
                <DrawerItem
                  label="CPS Bonuses"
                  onPress={() => navigation.navigate("CPS Bonuses")}
                  style={styles.drawerItem}
                  labelStyle={styles.drawerItemLabel}
                />
              </View>

              <View style={styles.drawerItemContainer}>
                <FontAwesomeIcon
                  color={styles.iconColor}
                  icon={faSackDollar}
                  size={styles.iconSize}
                  style={styles.icon}
                />
                <DrawerItem
                  label="CPS Ad Charges"
                  onPress={() => navigation.navigate("CPS Ad Charges")}
                  style={styles.drawerItem}
                  labelStyle={styles.drawerItemLabel}
                />
              </View>

              <View style={styles.drawerItemContainer}>
                <FontAwesomeIcon
                  color={styles.iconColor}
                  icon={faSackDollar}
                  size={styles.iconSize}
                  style={styles.icon}
                />
                <DrawerItem
                  label="Bought NGN CPS List"
                  onPress={() => navigation.navigate("Bought NGN CPS List")}
                  style={styles.drawerItem}
                  labelStyle={styles.drawerItemLabel}
                />
              </View>

              <View style={styles.drawerItemContainer}>
                <FontAwesomeIcon
                  color={styles.iconColor}
                  icon={faSackDollar}
                  size={styles.iconSize}
                  style={styles.icon}
                />
                <DrawerItem
                  label="Bought USD CPS List"
                  onPress={() => navigation.navigate("Bought USD CPS List")}
                  style={styles.drawerItem}
                  labelStyle={styles.drawerItemLabel}
                />
              </View>

              <View style={styles.drawerItemContainer}>
                <FontAwesomeIcon
                  color={styles.iconColor}
                  icon={faSackDollar}
                  size={styles.iconSize}
                  style={styles.icon}
                />
                <DrawerItem
                  label="Sold CPS List"
                  onPress={() => navigation.navigate("Sold CPS List")}
                  style={styles.drawerItem}
                  labelStyle={styles.drawerItemLabel}
                />
              </View>

              <View style={styles.drawerItemContainer}>
                <FontAwesomeIcon
                  color={styles.iconColor}
                  icon={faSackDollar}
                  size={styles.iconSize}
                  style={styles.icon}
                />
                <DrawerItem
                  label="Recieved CPS List"
                  onPress={() => navigation.navigate("Recieved CPS List")}
                  style={styles.drawerItem}
                  labelStyle={styles.drawerItemLabel}
                />
              </View>
            </>
          )}

          <View style={styles.drawerItemContainer}>
            <FontAwesomeIcon
              color={styles.iconColor}
              icon={faMessage}
              size={styles.iconSize}
              style={styles.icon}
            />
            <DrawerItem
              label="Inbox"
              onPress={() => navigation.navigate("Inbox")}
              style={styles.drawerItem}
              labelStyle={styles.drawerItemLabel}
            />
          </View>

          <View style={styles.drawerItemContainer}>
            <FontAwesomeIcon
              color={styles.iconColor}
              icon={faHeart}
              size={styles.iconSize}
              style={styles.icon}
            />
            <DrawerItem
              label="Saved Ads"
              onPress={() => navigation.navigate("Saved Ads")}
              style={styles.drawerItem}
              labelStyle={styles.drawerItemLabel}
            />
          </View>

          <View style={styles.drawerItemContainer}>
            <FontAwesomeIcon
              color={styles.iconColor}
              icon={faEye}
              size={styles.iconSize}
              style={styles.icon}
            />
            <DrawerItem
              label="Viewed Ads"
              onPress={() => navigation.navigate("Viewed Ads")}
              style={styles.drawerItem}
              labelStyle={styles.drawerItemLabel}
            />
          </View>

          <View style={styles.drawerItemContainer}>
            <FontAwesomeIcon
              color={styles.iconColor}
              icon={faThumbsUp}
              size={styles.iconSize}
              style={styles.icon}
            />
            <DrawerItem
              label="Recommended Ads"
              onPress={() => navigation.navigate("Recommended Ads")}
              style={styles.drawerItem}
              labelStyle={styles.drawerItemLabel}
            />
          </View>

          <View style={styles.drawerItemContainer}>
            <FontAwesomeIcon
              color={styles.iconColor}
              icon={faComments}
              size={styles.iconSize}
              style={styles.icon}
            />
            <DrawerItem
              label="Feedback"
              onPress={() => navigation.navigate("Feedback")}
              style={styles.drawerItem}
              labelStyle={styles.drawerItemLabel}
            />
          </View>

          <View style={styles.drawerItemContainer}>
            <FontAwesomeIcon
              color={styles.iconColor}
              icon={faTicket}
              size={styles.iconSize}
              style={styles.icon}
            />
            <DrawerItem
              label="Support"
              onPress={() => navigation.navigate("Support")}
              style={styles.drawerItem}
              labelStyle={styles.drawerItemLabel}
            />
          </View>

          <View style={styles.drawerItemContainer}>
            <FontAwesomeIcon
              color={styles.iconColor}
              icon={faGear}
              size={styles.iconSize}
              style={styles.icon}
            />
            <DrawerItem
              label="Settings"
              onPress={() => navigation.navigate("Edit Free Ad")}
              style={styles.drawerItem}
              labelStyle={styles.drawerItemLabel}
            />
          </View>
        </View>
      ) : (
        <></>
      )}

      {userInfo ? (
        <>
          {!profile?.is_marketplace_seller ? (
            <View style={styles.drawerContainer}>
              <View style={styles.drawerItemContainer}>
                <FontAwesomeIcon
                  color={styles.iconColor}
                  icon={faDashboard}
                  size={styles.iconSize}
                  style={styles.icon}
                />
                <DrawerItem
                  label="Create Seller Account"
                  onPress={() => navigation.navigate("Create Seller Account")}
                  style={styles.drawerItem}
                  labelStyle={styles.drawerItemLabel}
                />
              </View>
            </View>
          ) : (
            <>
              <View style={styles.drawerContainer}>
                <Text style={styles.title}>Seller Aspect</Text>
                <View style={styles.drawerItemContainer}>
                  <FontAwesomeIcon
                    color={styles.iconColor}
                    icon={faDashboard}
                    size={styles.iconSize}
                    style={styles.icon}
                  />
                  <DrawerItem
                    label="Dashboard (Seller)"
                    onPress={() => navigation.navigate("Dashboard (Seller)")}
                    style={styles.drawerItem}
                    labelStyle={styles.drawerItemLabel}
                  />
                </View>

                <View style={styles.drawerItemContainer}>
                  <FontAwesomeIcon
                    color={styles.iconColor}
                    icon={faUserShield}
                    size={styles.iconSize}
                    style={styles.icon}
                  />
                  <DrawerItem
                    label="Seller Account"
                    onPress={() => navigation.navigate("Seller Account")}
                    style={styles.drawerItem}
                    labelStyle={styles.drawerItemLabel}
                  />
                </View>

                <View style={styles.drawerItemContainer}>
                  <FontAwesomeIcon
                    color={styles.iconColor}
                    icon={faAd}
                    size={styles.iconSize}
                    style={styles.icon}
                  />
                  <DrawerItem
                    label="Current Ads"
                    onPress={() => navigation.navigate("Current Ads")}
                    style={styles.drawerItem}
                    labelStyle={styles.drawerItemLabel}
                  />
                </View>

                <View style={styles.drawerItemContainer}>
                  <FontAwesomeIcon
                    color={styles.iconColor}
                    icon={faAd}
                    size={styles.iconSize}
                    style={styles.icon}
                  />
                  <DrawerItem
                    label="Post Free Ad"
                    onPress={() => navigation.navigate("Post Free Ad")}
                    style={styles.drawerItem}
                    labelStyle={styles.drawerItemLabel}
                  />
                </View>

                <View style={styles.drawerItemContainer}>
                  <FontAwesomeIcon
                    color={styles.iconColor}
                    icon={faAd}
                    size={styles.iconSize}
                    style={styles.icon}
                  />
                  <DrawerItem
                    label="Post Paid Ad"
                    onPress={() => navigation.navigate("Post Paid Ad")}
                    style={styles.drawerItem}
                    labelStyle={styles.drawerItemLabel}
                  />
                </View>

                <View style={styles.drawerItemContainer}>
                  <FontAwesomeIcon
                    color={styles.iconColor}
                    icon={faMoneyBill}
                    size={styles.iconSize}
                    style={styles.icon}
                  />
                  <DrawerItem
                    label="Billing"
                    onPress={() => navigation.navigate("Billing")}
                    style={styles.drawerItem}
                    labelStyle={styles.drawerItemLabel}
                  />
                </View>

                <View style={styles.drawerItemContainer}>
                  <FontAwesomeIcon
                    color={styles.iconColor}
                    icon={faLink}
                    size={styles.iconSize}
                    style={styles.icon}
                  />
                  <DrawerItem
                    label="Shop Front Link"
                    onPress={() => navigation.navigate("Shop Front Link")}
                    style={styles.drawerItem}
                    labelStyle={styles.drawerItemLabel}
                  />
                </View>
              </View>
            </>
          )}
        </>
      ) : (
        <></>
      )}

      <DrawerItem
        label={() => (
          <Text style={styles.accountStyle}>
            {userInfo ? (
              <Text>
                <FontAwesomeIcon
                  color={styles.iconColor}
                  icon={faSignOut}
                  size={styles.iconSize}
                  style={styles.icon}
                />{" "}
                Logout
              </Text>
            ) : (
              <Text>
                <FontAwesomeIcon
                  color={styles.iconColor}
                  icon={faSignIn}
                  size={styles.iconSize}
                  style={styles.icon}
                />{" "}
                Login
              </Text>
            )}
          </Text>
        )}
        onPress={() => {
          if (userInfo) {
            logoutHandler();
          } else {
            navigation.navigate("Login");
          }
        }}
        style={styles.drawerItem}
        labelStyle={styles.drawerItemLabel}
      />

      <DrawerItem
        label={() => (
          <Text style={styles.accountStyle}>
            {userInfo ? (
              <Text></Text>
            ) : (
              <Text>
                <FontAwesomeIcon
                  color={styles.iconColor}
                  icon={faSignInAlt}
                  size={styles.iconSize}
                  style={styles.icon}
                />{" "}
                Register
              </Text>
            )}
          </Text>
        )}
        onPress={() => {
          if (!userInfo) {
            navigation.navigate("Register");
          }
        }}
        style={styles.accountStyle}
        // style={styles.drawerItem}
        labelStyle={styles.drawerItemLabel}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    paddingVertical: 15,
    color: "#fff",
  },
  greetingContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },
  greetingText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 5,
    color: "#fff",
  },
  drawerItem: {
    color: "#cbd5e1",
    flex: 1,
  },
  accountStyle: {
    color: "blue",
  },
  drawerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },
  drawerItemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  drawerItemLabel: {
    color: "#cbd5e1",
  },
  activeDrawerItemLabel: {
    color: "blue",
    fontWeight: "bold",
  },
  icon: {
    marginRight: 1,
  },
  iconSize: 14,
  iconColor: "#cbd5e1",
  greetingIconColor: "#fff",
  toggleIcon: {
    marginLeft: "auto",
    padding: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
});
