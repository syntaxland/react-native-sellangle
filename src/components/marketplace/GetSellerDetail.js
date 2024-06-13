// GetSellerDetail.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faEnvelope,
  faPhone,
  faShoppingCart,
  faFlag,
  faCheck,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  getSellerAccount,
  getSellerDetail,
} from "../../redux/actions/marketplaceSellerActions";
import Loader from "../../Loader";
import Message from "../../Message";
import RatingSeller from "../../RatingSeller";
import ToggleFollowSeller from "./ToggleFollowSeller";

function GetSellerDetail() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { seller_username } = route.params;
  console.log("GetSellerDetail seller_username:", seller_username);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

  const getSellerDetailState = useSelector(
    (state) => state.getSellerDetailState
  );
  const { loading, error, sellerAvatarUrl, sellerDetail } =
    getSellerDetailState;

  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const handleShowPhoneNumber = () => setShowPhoneNumber(!showPhoneNumber);
  const [isPhoneCopied, setIsPhoneCopied] = useState(false);

  const handleCopyPhoneNumber = async () => {
    await Clipboard.setStringAsync(sellerDetail?.seller_phone);
    setIsPhoneCopied(true);
    setTimeout(() => setIsPhoneCopied(false), 2000);
  };

  useEffect(() => {
    // dispatch(getPaidAdDetail(ad_id));
    dispatch(getSellerAccount());
    dispatch(getSellerDetail(seller_username));
  }, [dispatch, seller_username]);

  function calculateDuration(joinedTimestamp) {
    const now = new Date();
    const joinedDate = new Date(joinedTimestamp);
    const duration = now - joinedDate;

    const years = Math.floor(duration / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor(
      (duration % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
    );
    const weeks = Math.floor(
      (duration % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24 * 7)
    );
    const days = Math.floor(
      (duration % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24)
    );

    if (years > 0) return `${years} year${years > 1 ? "s" : ""}`;
    if (months > 0) return `${months} month${months > 1 ? "s" : ""}`;
    if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""}`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""}`;
    return "Less than a day";
  }

  function calculateLastSeen(lastLoginTimestamp) {
    const now = new Date();
    const lastLoginDate = new Date(lastLoginTimestamp);
    const duration = now - lastLoginDate;
    const days = Math.floor(duration / (1000 * 60 * 60 * 24));

    if (days < 3) return "Last seen recently";
    if (days < 7) return "Last seen within a week";
    if (days < 30) return "Last seen within a month";
    return "Last seen a long time ago";
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <View>
          <View style={styles.card}>
            <Text style={styles.header}>Seller Details</Text>
            <View style={styles.sellerInfo}>
              {sellerAvatarUrl && typeof sellerAvatarUrl === "string" && (
                <Image
                  source={{ uri: sellerAvatarUrl }}
                  style={styles.avatar}
                />
              )}
              <View style={styles.sellerDetails}>
                <Text>{sellerDetail?.seller_username}</Text>
                <Text>
                  <ToggleFollowSeller sellerDetail={sellerDetail} />
                </Text>
                <Text>{calculateLastSeen(sellerDetail?.user_last_login)}</Text>
              </View>
            </View>
            <View style={styles.verified}>
              {sellerDetail?.is_seller_verified ? (
                <Text style={styles.verifiedText}>Verified ID</Text>
              ) : (
                <Text style={styles.notVerifiedText}>ID Not Verified</Text>
              )}
            </View>
            <RatingSeller value={sellerDetail?.rating} color={"green"} />

            <View style={styles.spaceBtwGroup}>
              <TouchableOpacity
                style={styles.squaredPrimaryButton}
                onPress={handleShowPhoneNumber}
              >
                <Text style={styles.btnText}>
                  <FontAwesomeIcon icon={faPhone} color="#fff" />{" "}
                  {showPhoneNumber ? "Hide Contact" : "Show Contact"}
                </Text>
              </TouchableOpacity>
            </View>

            {showPhoneNumber && (
              <View style={styles.spaceBtwGrou}>
                <Text style={styles.phoneNumber}>
                  <TouchableOpacity
                    style={styles.copyPhone}
                    onPress={handleCopyPhoneNumber}
                  >
                    <Text style={styles.label}>
                      {isPhoneCopied ? (
                        <Text style={styles.label}>
                          Phone number copied{" "}
                          <FontAwesomeIcon
                            icon={faCheck}
                            size={16}
                            color="#007bff"
                          />
                        </Text>
                      ) : (
                        <Text style={styles.label}>
                          <Text>{sellerDetail?.seller_phone} </Text>{" "}
                          <FontAwesomeIcon
                            icon={faCopy}
                            size={16}
                            color="#007bff"
                          />
                        </Text>
                      )}
                    </Text>
                  </TouchableOpacity>
                </Text>
              </View>
            )}
            <Text>Business Name: {sellerDetail?.business_name}</Text>
            <Text>Category: {sellerDetail?.business_category}</Text>
            <Text>Description: {sellerDetail?.business_description}</Text>
            <Text>Website: {sellerDetail?.business_website}</Text>
            <Text>Business Address: {sellerDetail?.business_address}</Text>
            <Text>Country: {sellerDetail?.country}</Text>
            <Text>
              Joined since{" "}
              {calculateDuration(sellerDetail?.seller_joined_since)}
            </Text>
          </View>
          <Text style={styles.disclaimer}>
            <Text style={styles.disclaimerBold}>Disclaimer:</Text> Buyers are
            advised to exercise caution and conduct thorough verification when
            dealing with sellers. Ensure the authenticity of both the product
            and the seller before proceeding with any transactions.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sellerInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  sellerDetails: {
    flex: 1,
  },
  verified: {
    marginBottom: 10,
  },
  verifiedText: {
    color: "green",
  },
  notVerifiedText: {
    color: "red",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
  disclaimer: {
    marginTop: 20,
    textAlign: "center",
    color: "red",
  },
  disclaimerBold: {
    fontWeight: "bold",
  },
  label: {
    color: "#007bff",
  },
  phoneNumber: {
    color: "#007bff",
    padding: 10,
  },
  spaceBtwGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 2,
  },
  spaceBtwElement: {
    padding: 10,
  },
  squaredPrimaryButton: {
    backgroundColor: "#007bff",
    padding: 5,
    borderRadius: 5,
  },
  squaredDangerBtn: {
    backgroundColor: "#dc3545",
    padding: 5,
    borderRadius: 5,
    color: "#fff",
  },
  btnText: {
    color: "#fff",
  },
});

export default GetSellerDetail;
