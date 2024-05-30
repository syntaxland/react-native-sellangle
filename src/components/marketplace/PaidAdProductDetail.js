// PaidAdProductDetail.js
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
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  getSellerAccount,
  getPaidAdDetail,
} from "../../redux/actions/marketplaceSellerActions";
import RenderHtml from "react-native-render-html";
import ReportPaidAd from "./ReportPaidAd";
import TogglePaidAdSave from "./TogglePaidAdSave";
import ReviewPaidAdSeller from "./ReviewPaidAdSeller";
import Carousel from "react-native-reanimated-carousel";
import Paysofter from "../MarketplacePayment/Paysofter";
import Loader from "../../Loader";
import Message from "../../Message";
import RatingSeller from "../../RatingSeller";
import PromoTimer from "../../PromoTimer";
import { formatAmount } from "../../FormatAmount";

const PaidAdProductDetail = () => {
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

  const getPaidAdDetailState = useSelector(
    (state) => state.getPaidAdDetailState
  );
  const {
    loading,
    error,
    ads,
    sellerApiKey,
    sellerAvatarUrl,
    isSellerVerified,
    sellerRating,
    sellerReviewCount,
  } = getPaidAdDetailState;

  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [reportAdModal, setReportAdModal] = useState(false);
  const [showPaysofterOption, setShowPaysofterOption] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getPaidAdDetail(id));
    setTimeout(() => setRefreshing(false), 2000);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPaidAdDetail(id));
    dispatch(getSellerAccount());
  }, [dispatch, id]);

  const handleShowPhoneNumber = () => setShowPhoneNumber(!showPhoneNumber);
  const handleClickMore = () => setExpanded(!expanded);
  const handleReportAdOpen = () => setReportAdModal(true);
  const handleReportAdClose = () => setReportAdModal(false);
  const handlePaysofterOption = () =>
    setShowPaysofterOption(!showPaysofterOption);

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
    navigation.navigate("SellerShopFront", { username: ads?.seller_username });
  };

  const descriptionHtml = {
    html: ads?.description || "<div>No description available.</div>",
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Button title="Go Back" onPress={() => navigation.goBack()} />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
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
            <Button
              title="Promoted"
              color="green"
              disabled
              style={styles.promotedButton}
            />
            <Text>
              Promo Code: {ads?.promo_code} ({ads?.discount_percentage}% Off)
            </Text>
            <View style={styles.card}>
              <Text>
                Expires in: <PromoTimer expirationDate={ads?.expiration_date} />
              </Text>
              <Text>
                Price: {formatAmount(ads.price)} {ads.currency}
              </Text>
              {ads?.usd_price && (
                <Text>
                  / {formatAmount(ads?.usd_price)} {ads?.usd_currency}
                </Text>
              )}
              {ads?.count_in_stock > 0 && (
                <Text>Quantity in Stock: {ads?.count_in_stock}</Text>
              )}
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
              <ReviewPaidAdSeller adId={ads?.id} />
              <Button
                title={showPhoneNumber ? "Hide Contact" : "Show Contact"}
                onPress={handleShowPhoneNumber}
              />
              {showPhoneNumber && <Text>{ads?.seller_phone}</Text>}
              <View style={styles.spaceBtwGroup}>
                <Button
                  title="Message Seller"
                  onPress={handleClickMessageSeller}
                />
                <Button
                  title="Go to Seller Shopfront"
                  onPress={handleSellerShopFront}
                />
              </View>
            </View>
          </View>

          <View style={styles.formGroup}>
            <TouchableOpacity onPress={handlePaysofterOption}>
              <Text style={styles.roundedPrimaryBtn}>
                Pay With Paysofter Promise
              </Text>
            </TouchableOpacity>
          </View>

          {showPaysofterOption && (
            <Paysofter
              promoCode={ads?.promo_code}
              adId={ads?.id}
              buyerEmail={userInfo?.email}
              currency={ads?.currency}
              usdPrice={ads?.usd_price}
              amount={ads?.price}
              sellerApiKey={sellerApiKey}
            />
          )}

          <Modal
            visible={reportAdModal}
            animationType="slide"
            onRequestClose={handleReportAdClose}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalLabelTitle}>
                  Pay With Paysofter Promise
                </Text>
                <View style={styles.modalLabelBody}>
                  <ReportPaidAd adId={ads?.id} />
                </View>

                <Button title="Close" onPress={handleReportAdClose} />
              </View>
            </View>
          </Modal>

          <View style={styles.buttonGroup}>
            <View style={styles.spaceBtwElement}>
              <TogglePaidAdSave adId={ads?.id} />
            </View>

            <View style={styles.spaceBtwElement}>
              <Button title="Report Ad" onPress={handleReportAdOpen} />
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 10,
  },
  details: {
    padding: 10,
  },
  adName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  promotedButton: {
    marginVertical: 5,
  },
  card: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
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
    padding: 10,
  },
  spaceBtwGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
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
});

export default PaidAdProductDetail;
