// Referrals.js
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCopy, faShareAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import * as Clipboard from "expo-clipboard";
import {
  generateReferralLink,
  getUserReferrals,
} from "../../redux/actions/promoActions";
import Loader from "../../Loader";
import Message from "../../Message";

const Referrals = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const referralState = useSelector((state) => state.referral);
  const { referralLink, referralCode, referralError, loading } = referralState;

  const referralButton = useSelector((state) => state.referralButton);
  const { referralErrorButton, loading: loadingButton } = referralButton;

  const userReferralState = useSelector((state) => state.userReferralState);
  const {
    loading: userReferralsLoading,
    userReferrals,
    error: userReferralsError,
  } = userReferralState;

  const [isReferralLinkCopied, setIsReferralLinkCopied] = useState(false);
  const [isReferralCodeCopied, setIsReferralCodeCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(generateReferralLink());
    dispatch(getUserReferrals());
  }, [dispatch]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(generateReferralLink());
    dispatch(getUserReferrals());
    setTimeout(() => setRefreshing(false), 2000);
  }, [dispatch]);

  const copyToClipboard = async (textToCopy) => {
    await Clipboard.setStringAsync(textToCopy);
    if (textToCopy === referralLink) {
      setIsReferralLinkCopied(true);
      setTimeout(() => setIsReferralLinkCopied(false), 2000);
    } else if (textToCopy === referralCode) {
      setIsReferralCodeCopied(true);
      setTimeout(() => setIsReferralCodeCopied(false), 2000);
    }
  };

  const shareReferralLink = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Referral Link",
          text: "Check out this referral link!",
          url: referralLink,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Share failed:", error));
    } else {
      Alert.alert("Please manually share the referral link:", referralLink);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Referrals</Text>
        </View>
        <View style={styles.content}>
          {userReferralsLoading ? (
            <Loader />
          ) : userReferralsError ? (
            <Message variant="danger">{userReferralsError}</Message>
          ) : (
            <>
              <Text style={styles.subtitle}>
                Referred Users:{" "}
                {userReferrals?.length > 0 ? userReferrals.length : 0}
              </Text>
            </>
          )}
        </View>
        <View style={styles.header}>
          <Text style={styles.title}>Referral Link</Text>
        </View>
        {loading || loadingButton ? (
          <Loader />
        ) : referralError || referralErrorButton ? (
          <Message variant="danger">
            {referralError || referralErrorButton}
          </Message>
        ) : (
          <View style={styles.content}>
            <Text style={styles.subtitle}>Your Referral Code:</Text>
            <View style={styles.linkContainer}>
              <Text style={styles.link}>{referralCode}</Text>
              <TouchableOpacity onPress={() => copyToClipboard(referralCode)}>
                <Text style={styles.label}>
                  {isReferralCodeCopied ? (
                    <Text style={styles.label}>
                      Copied <FontAwesomeIcon icon={faCheck} size={16} />
                    </Text>
                  ) : (
                    <Text style={styles.label}>
                      Copy <FontAwesomeIcon icon={faCopy} size={16} />
                    </Text>
                  )}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.subtitle}>Your Referral Link:</Text>
            <View style={styles.linkContainer}>
              <Text style={styles.link}>{referralLink}</Text>
              <TouchableOpacity onPress={() => copyToClipboard(referralLink)}>
                <Text style={styles.label}>
                  {isReferralLinkCopied ? (
                    <Text style={styles.label}>
                      Copied <FontAwesomeIcon icon={faCheck} size={16} />
                    </Text>
                  ) : (
                    <Text style={styles.label}>
                      Copy <FontAwesomeIcon icon={faCopy} size={16} />
                    </Text>
                  )}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={shareReferralLink}>
                <Text style={styles.label}>
                  Share <FontAwesomeIcon icon={faShareAlt} size={16} />
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
    padding: 20,
    backgroundColor: "#fff",
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
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
});

export default Referrals;
