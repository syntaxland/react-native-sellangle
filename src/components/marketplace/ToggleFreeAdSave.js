// ToggleFreeAdSave.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFreeAdSave } from "../../redux/actions/marketplaceSellerActions";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import Loader from "../../Loader";

const ToggleFreeAdSave = ({ ad }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [toggleAdSaveLoading, setToggleAdSaveLoading] = useState(false);
  const [adIsSaved, setAdIsSaved] = useState(ad?.ad_is_saved);
  const [adSaveCount, setAdSaveCount] = useState(ad?.ad_save_count);

  const handleToggleFreeAdSave = async () => {
    if (!userInfo) {
      navigation.navigate("Login");
    } else {
      setToggleAdSaveLoading(true);

      const toggleData = {
        ad_id: ad.id,
      };

      try {
        const response = await dispatch(toggleFreeAdSave(toggleData));
        setAdIsSaved(response?.ad_is_saved);
        setAdSaveCount(response?.ad_save_count);
      } finally {
        setToggleAdSaveLoading(false);
      }
    }
  };

  const formatCount = (saveCount) => {
    if (saveCount >= 1000000) {
      return (saveCount / 1000000).toFixed(1) + "m";
    } else if (saveCount >= 1000) {
      return (saveCount / 1000).toFixed(1) + "k";
    } else {
      return saveCount?.toString();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleToggleFreeAdSave}
        disabled={toggleAdSaveLoading}
      >
        {toggleAdSaveLoading ? (
          <Loader />
        ) : (
          <>
            <FontAwesomeIcon
              icon={adIsSaved ? fasHeart : farHeart}
              style={adIsSaved ? styles.savedIcon : styles.unsavedIcon}
              size={28}
            />
            <Text style={styles.saveCountText}>{formatCount(adSaveCount)}</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  saveButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  savedIcon: {
    color: "red",
  },
  unsavedIcon: {
    color: "gray",
  },
  saveCountText: {
    color: "gray",
  },
});

export default ToggleFreeAdSave;
