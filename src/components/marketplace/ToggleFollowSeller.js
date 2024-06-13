// ToggleFollowSeller.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFollowSeller } from "../../redux/actions/marketplaceSellerActions";
import { getUserProfile } from "../../redux/actions/userProfileActions";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlusSquare, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../Loader";

const ToggleFollowSeller = ({ sellerDetail }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
    dispatch(getUserProfile());
  }, [dispatch, userInfo, navigation]);

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  const [loading, setLoading] = useState(false);
  // const [isSellerFollowed, setIsSellerFollowed] = useState(false);
  const [isSellerFollowed, setIsSellerFollowed] = useState(
    profile?.followed_sellers?.some(
      (seller) => seller.seller_username === sellerDetail.seller_username
    ) || false
  );
  const [followSellerCount, setFollowSellerCount] = useState(
    sellerDetail?.follow_seller_count
  );

  useEffect(() => {
    if (profile && sellerDetail) {
      const followedSellers = profile.followed_sellers || [];
      const isFollowed = followedSellers.some(
        (seller) => seller.seller_username === sellerDetail.seller_username
      );
      setIsSellerFollowed(isFollowed);
    }
  }, [userInfo, sellerDetail]);

  const handleToggleFollowSeller = async () => {
    if (!userInfo) {
      navigation.navigate("Login");
    } else {
      setLoading(true);

      const toggleData = {
        seller_username: sellerDetail.seller_username,
      };

      try {
        const response = await dispatch(toggleFollowSeller(toggleData));
        setIsSellerFollowed((prev) => !prev);
        setFollowSellerCount(response?.follow_seller_count);
      } finally {
        setLoading(false);
      }
    }
  };

  function formatCount(saveCount) {
    if (saveCount >= 1000000) {
      return (saveCount / 1000000).toFixed(1) + "m";
    } else if (saveCount >= 1000) {
      return (saveCount / 1000).toFixed(1) + "k";
    } else {
      return saveCount?.toString();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.followersContainer}>
        <Text style={styles.followersText}>
          Followers: {formatCount(followSellerCount)}
        </Text>
        {loading && <Loader style={styles.loader} />}
      </View>
      <View style={styles.buttonContainer}>
        {isSellerFollowed ? (
          <TouchableOpacity
            onPress={handleToggleFollowSeller}
            style={[styles.button, styles.unfollowButton]}
          >
            <Text style={styles.buttonText}>Unfollow </Text>
            <FontAwesomeIcon icon={faUserCheck} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleToggleFollowSeller}
            style={[styles.button, styles.followButton]}
          >
            <Text style={styles.buttonText}>Follow </Text>
            <FontAwesomeIcon icon={faPlusSquare} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  followersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  followersText: {
    fontSize: 16,
    color: "gray",
  },
  loader: {
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  followButton: {
    backgroundColor: "#dc3545",
  },
  unfollowButton: {
    backgroundColor: "#007bff",
  },
  buttonText: {
    color: "white",
    marginRight: 5,
  },
});

export default ToggleFollowSeller;
