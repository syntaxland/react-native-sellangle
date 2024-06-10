// ShopFrontLink.js
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Clipboard,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCopy, faShareAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import { getSellerShopfrontLink } from "../../redux/actions/marketplaceSellerActions";
import Loader from "../../Loader"; 
import Message from "../../Message";
// import * as Clipboard from "expo-clipboard";

const ShopFrontLink = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getSellerShopfrontLink());
    setTimeout(() => setRefreshing(false), 2000);
  }, [dispatch]);

  const getSellerShopfrontLinkState = useSelector(
    (state) => state.getSellerShopfrontLinkState
  );
  const { loading, error, shopfrontLink } = getSellerShopfrontLinkState;

  const [isShopfrontLinkCopied, setIsShopfrontLinkCopied] = useState(false);

  useEffect(() => {
    dispatch(getSellerShopfrontLink());
  }, [dispatch]);

  const copyToClipboard = (textToCopy) => {
    Clipboard.setString(textToCopy);
    if (textToCopy === shopfrontLink) {
      setIsShopfrontLinkCopied(true);
      setTimeout(() => setIsShopfrontLinkCopied(false), 2000);
    }
  };

  const shareShopfrontLink = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Shopfront Link",
          text: "Check out my Shopfront link!",
          url: shopfrontLink,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Share failed:", error));
    } else {
      console.log("Web Share API not supported");
      Alert.alert("Please manually share the referral link:", shopfrontLink);
    }
  };

  // const handleCopyPhoneNumber = async () => {
  //   await Clipboard.setStringAsync(ads?.seller_phone);
  //   setIsPhoneCopied(true);
  //   setTimeout(() => setIsPhoneCopied(false), 2000);
  // };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Seller Shopfront Link</Text>
        </View>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <View style={styles.content}>
            <Text style={styles.subtitle}>Your Shopfront Link:</Text>
            <View style={styles.linkContainer}>
              <Text style={styles.link}>{shopfrontLink}</Text>
            </View>

            <View style={styles.labelContainer}>
              <TouchableOpacity onPress={() => copyToClipboard(shopfrontLink)}>
                <Text style={styles.label}>
                  {isShopfrontLinkCopied ? (
                    <Text style={styles.label}>
                      Copied{" "}
                      <FontAwesomeIcon
                        icon={faCheck} 
                        size={16}
                        // style={styles.icon}
                      />
                    </Text>
                  ) : (
                    <Text style={styles.label}>
                      Copy{" "}
                      <FontAwesomeIcon
                        icon={faCopy}
                        size={16}
                        // style={styles.icon}
                      />
                    </Text>
                  )}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={shareShopfrontLink}>
                <Text style={styles.label}>
                  Share{" "}
                  <FontAwesomeIcon
                    icon={faShareAlt}
                    size={16}
                    // style={styles.icon}
                  />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    // justifyContent: "center",
    // alignItems: "center",
    textAlign: "center",
  },
  header: {
    marginVertical: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  link: {
    color: "blue",
    flex: 1,
    marginRight: 10,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  roundedPrimaryBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default ShopFrontLink;
