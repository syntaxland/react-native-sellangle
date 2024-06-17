// SellerSearchCard.js
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";

function SellerSearchCard({ searchResults, sellerAvatarUrl }) {
  const navigation = useNavigation();

  console.log("seller_username:", searchResults?.seller_username);

  function calculateDuration(joinedTimestamp) {
    const now = new Date();
    const joinedDate = new Date(joinedTimestamp);
    const duration = now - joinedDate;

    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""}`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""}`;
    } else if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? "s" : ""}`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""}`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""}`;
    }
  }

  const handleSellerShopFront = () => {
    navigation.navigate("Seller Shop Front", {
      seller_username: searchResults?.seller_username,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seller Found</Text>
      <View style={styles.sellerInfo}>
        {sellerAvatarUrl && (
          <Image source={{ uri: sellerAvatarUrl }} style={styles.avatar} />
        )}
        <Text style={styles.sellerUsername}>
          {searchResults?.seller_username}
        </Text>
      </View>
      <View style={styles.verifiedInfo}>
        <Text style={styles.businessName}>
          Business Name: {searchResults?.business_name}
        </Text>
        <View style={styles.verifiedBadge}>
          {searchResults?.is_seller_verified ? (
            <Text style={styles.verifiedText}>
              <FontAwesomeIcon icon={faCheckCircle} color="green" /> Verified ID
            </Text>
          ) : (
            <Text style={styles.unverifiedText}>
              <FontAwesomeIcon icon={faTimesCircle} color="red" /> ID Not
              Verified
            </Text>
          )}
        </View>
      </View>
      <View style={styles.joinedInfo}>
        <Text>
          Joined since {calculateDuration(searchResults?.seller_joined_since)}
        </Text>
      </View>

      <View style={styles.shopfront}>
        <TouchableOpacity
          style={styles.shopfrontButton}
          onPress={handleSellerShopFront}
        >
          <Text style={styles.shopfrontButtonText}>
            <FontAwesomeIcon icon={faShoppingCart} color="#fff" /> Go to Seller Shopfront
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sellerInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  sellerUsername: {
    fontSize: 16,
    fontWeight: "bold",
  },
  verifiedInfo: {
    marginBottom: 8,
  },
  businessName: {
    fontSize: 16,
    marginBottom: 4,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  verifiedText: {
    color: "green",
  },
  unverifiedText: {
    color: "red",
  },
  joinedInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  shopfront: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  shopfrontButton: {
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 4,
  },
  shopfrontButtonText: {
    color: "#fff",
  },
});

export default SellerSearchCard;
