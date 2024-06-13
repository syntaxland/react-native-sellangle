// FreeAdProductDetail.js
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  Modal,
  TouchableOpacity,
  RefreshControl,
  useWindowDimensions,
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
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  getSellerAccount,
  getFreeAdDetail,
} from "../../redux/actions/marketplaceSellerActions";
import RenderHtml from "react-native-render-html";
import ToggleFreeAdSave from "./ToggleFreeAdSave";
import ReviewFreeAdSeller from "./ReviewFreeAdSeller";
import ReportFreeAd from "./ReportFreeAd";
import Carousel from "react-native-reanimated-carousel";
import Loader from "../../Loader";
import Message from "../../Message";
import RatingSeller from "../../RatingSeller";
import PromoTimer from "../../PromoTimer";
import { formatAmount } from "../../FormatAmount";

const FreeAdProductDetail = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  const { width } = useWindowDimensions();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

  const getFreeAdDetailState = useSelector(
    (state) => state.getFreeAdDetailState
  );
  const {
    loading,
    error,
    ads,
    sellerAvatarUrl,
    isSellerVerified,
    sellerRating,
    sellerReviewCount,
  } = getFreeAdDetailState;

  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [reportAdModal, setReportAdModal] = useState(false);

  useEffect(() => {
    dispatch(getFreeAdDetail(id));
    dispatch(getSellerAccount());
  }, [dispatch, id]);

  const handleClickMore = () => setExpanded(!expanded);
  const handleReportAdOpen = () => setReportAdModal(true);
  const handleReportAdClose = () => setReportAdModal(false);

  const handleShowPhoneNumber = () => setShowPhoneNumber(!showPhoneNumber);
  const [isPhoneCopied, setIsPhoneCopied] = useState(false);

  const handleCopyPhoneNumber = async () => {
    await Clipboard.setStringAsync(ads?.seller_phone);
    setIsPhoneCopied(true);
    setTimeout(() => setIsPhoneCopied(false), 2000);
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getFreeAdDetail(id));
    setTimeout(() => setRefreshing(false), 2000);
  }, [dispatch]);

  function formatCount(viewCount) {
    if (viewCount >= 1000000) {
      return (viewCount / 1000000).toFixed(1) + "m";
    } else if (viewCount >= 1000) {
      return (viewCount / 1000).toFixed(1) + "k";
    } else {
      return viewCount?.toString();
    }
  }

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

  function calculateLastSeen(lastLoginTimestamp) {
    const now = new Date();
    const lastLoginDate = new Date(lastLoginTimestamp);
    const duration = now - lastLoginDate;
    const days = Math.floor(duration / (24 * 60 * 60 * 1000));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    if (days < 3) {
      return "Last seen recently";
    } else if (weeks < 1) {
      return "Last seen within a week";
    } else if (months < 1) {
      return "Last seen within a month";
    } else {
      return "Last seen a long time ago";
    }
  }

  const images = [ads?.image1, ads?.image2, ads?.image3].filter(Boolean);

  const handleClickMessageSeller = () => {
    const queryParams = {
      id: ads.id,
      image1: ads.image1,
      ad_name: ads.ad_name,
      price: ads.price,
      currency: ads?.currency,
      sellerAvatarUrl,
      seller_username: ads.seller_username,
      expiration_date: ads.expiration_date,
      ad_rating: sellerRating,
    };

    navigation.navigate("MessageSeller", { ...queryParams });
  };

  const handleSellerShopFront = () => {
    navigation.navigate("Seller Shop Front", {
      seller_username: ads?.seller_username,
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* <Button title="Go Back" onPress={() => navigation.goBack()} /> */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <View style={styles.details}>
            {images.length > 0 && (
              <Carousel
                loop
                width={300}
                height={300}
                autoPlay={false}
                data={images}
                scrollAnimationDuration={1000}
                renderItem={({ item }) => (
                  <Image source={{ uri: item }} style={styles.image} />
                )}
              />
            )}
          </View>

          <View style={styles.details}>
            <Text style={styles.adName}>{ads?.ad_name}</Text>
            {ads?.count_in_stock > 0 && (
              <Text style={styles.stock}>
                Quantity in Stock: {ads?.count_in_stock}
              </Text>
            )}
            <View style={styles.card}>
              <Text>
                <FontAwesomeIcon icon={faClock} color="#fff" /> Expires in:{" "}
                <PromoTimer expirationDate={ads?.expiration_date} />
              </Text>
              <Text>
                Price: {formatAmount(ads.price)} {ads.currency}
              </Text>
            </View>

            <View style={styles.description}>
              <Text>Ad Description:</Text>
              <RenderHtml
                contentWidth={width}
                source={{ html: ads?.description }}
                tagsStyles={{
                  div: { height: expanded ? "auto" : 100, overflow: "hidden" },
                }}
              />
              {ads?.description?.split(" ")?.length > 10 && (
                <Button
                  title={expanded ? "Less" : "More"}
                  onPress={handleClickMore}
                />
              )}
            </View>

            <View style={styles.sellerDetails}>
              <TouchableOpacity onPress={handleSellerShopFront}>
                <Text>Seller: {ads?.seller_username}</Text>
                {sellerAvatarUrl && (
                  <Image
                    source={{ uri: sellerAvatarUrl }}
                    style={styles.sellerAvatar}
                  />
                )}
              </TouchableOpacity>
              <Text>{calculateLastSeen(ads?.user_last_login)}</Text>

              <Text>
                {isSellerVerified ? "Verified ID" : "ID Not Verified"}
              </Text>

              <RatingSeller
                value={sellerRating}
                text={`${formatCount(sellerReviewCount)} reviews`}
                color="green"
              />
              <Text>
                Joined since {calculateDuration(ads?.seller_joined_since)}
              </Text>
              <ReviewFreeAdSeller adId={ads?.id} />

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

                <TouchableOpacity
                  style={styles.squaredPrimaryButton}
                  onPress={handleClickMessageSeller}
                >
                  <Text style={styles.btnText}>
                    <FontAwesomeIcon icon={faEnvelope} color="#fff" /> Message
                    Seller
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
                            <Text>{ads?.seller_phone} </Text>{" "}
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
            </View>

            <View style={styles.shopfront}>
              <TouchableOpacity
                style={styles.shopfrontButton}
                onPress={handleSellerShopFront}
              >
                <Text style={styles.shopfrontButtonText}>
                  <FontAwesomeIcon icon={faShoppingCart} color="#fff"/> Go to Seller
                  Shopfront
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonGroup}>
              <View style={styles.spaceBtwElement}>
                <ToggleFreeAdSave adId={ads?.id} />
              </View>

              <View style={styles.spaceBtwElement}>
                <TouchableOpacity
                  style={styles.squaredDangerBtn}
                  onPress={handleReportAdOpen}
                >
                  <Text style={styles.btnText}>
                    <FontAwesomeIcon icon={faFlag} color="#fff" /> Report Ad
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Modal visible={reportAdModal} onRequestClose={handleReportAdClose}>
            <ReportFreeAd adId={ads?.id} handleClose={handleReportAdClose} />
          </Modal>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  details: {
    padding: 10,
  },
  adName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  stock: {
    fontSize: 16,
    color: "green",
  },
  card: {
    padding: 10,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    marginVertical: 10,
  },
  description: {
    marginVertical: 10,
  },
  sellerDetails: {
    marginVertical: 10,
  },
  sellerAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  sellerDetails: {
    marginVertical: 10,
  },
  sellerAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  roundedPrimaryBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalLabelBody: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
  },
  modalLabelTitle: {
    fontWeight: "bold",
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
  },
  icon: {
    marginLeft: 10,
    color: "#007bff",
  },
  shopfront: {
    justifyContent: "center",
    alignItems: "center",
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
  payBtn: {
    padding: 20,
  },
  label: {
    color: "#007bff",
  },
  phoneNumber: {
    color: "#007bff",
    padding: 20,
  },
});

export default FreeAdProductDetail;
