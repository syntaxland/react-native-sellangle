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
import { Picker } from "@react-native-picker/picker";
import {
  getSellerAccount,
  getPaidAdDetail,
  resetApplyPromoCode,
} from "../../redux/actions/marketplaceSellerActions";
import RenderHtml from "react-native-render-html";
import ReportPaidAd from "./ReportPaidAd";
import TogglePaidAdSave from "./TogglePaidAdSave";
import ReviewPaidAdSeller from "./ReviewPaidAdSeller";
import Carousel from "react-native-reanimated-carousel";
import Loader from "../../Loader";
import Message from "../../Message";
import RatingSeller from "../../RatingSeller";
import PromoTimer from "../../PromoTimer";
import ApplyPromoCode from "./ApplyPromoCode";
import { formatAmount } from "../../FormatAmount";
// import { Paysofter } from "../react-native-paysofter/src/index";
import { Paysofter } from "react-native-paysofter"; 

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
  console.log("sellerApiKey", sellerApiKey);

  const applyPromoCodeState = useSelector((state) => state.applyPromoCodeState);
  const { discountPercentage, promoDiscount } = applyPromoCodeState;

  const [selectedQty, setSelectedQty] = useState(1);

  const handleQtyChange = (itemValue) => {
    setSelectedQty(itemValue);
  };

  const calculateTotalPrice = () => {
    return selectedQty * ads?.price;
  };

  const promoTotalPrice = calculateTotalPrice() - promoDiscount;

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

  const handleClickMore = () => setExpanded(!expanded);
  const handleReportAdOpen = () => setReportAdModal(true);
  const handleReportAdClose = () => setReportAdModal(false);
  const handlePaysofterOption = () =>
    setShowPaysofterOption(!showPaysofterOption);

  const handleShowPhoneNumber = () => setShowPhoneNumber(!showPhoneNumber);
  const [isPhoneCopied, setIsPhoneCopied] = useState(false);

  const handleCopyPhoneNumber = async () => {
    await Clipboard.setStringAsync(ads?.seller_phone);
    setIsPhoneCopied(true);
    setTimeout(() => setIsPhoneCopied(false), 2000);
  };

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

  const descriptionHtml = {
    html: ads?.description || "<div>No description available.</div>",
  };

  const handleOnSuccess = () => {
    console.log("handling onSuccess...");
    dispatch(resetApplyPromoCode());
  };

  const onSuccess = () => {
    handleOnSuccess();
  };

  const handleonClose = () => {
    console.log("handling onClose...");
    onRefresh();
    navigation.navigate("Home");
  };

  const onClose = () => {
    handleonClose();
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
                <Text style={styles.expirationText}>
                  <FontAwesomeIcon icon={faClock} /> Expires in:{" "}
                  <PromoTimer expirationDate={ads?.expiration_date} />
                </Text>
                <View>
                  <Text>
                    Price: {formatAmount(ads.price)} {ads.currency}{" "}
                    {ads?.usd_price && (
                      <>
                        / {formatAmount(ads?.usd_price)} {ads?.usd_currency}
                      </>
                    )}
                  </Text>
                </View>
                {/* {ads?.count_in_stock > 0 && (
                  <Text>Quantity in Stock: {ads?.count_in_stock}</Text>
                )} */}
              </Text>
            </View>

            <View style={styles.description}>
              <Text>Ad Description:</Text>
              <RenderHtml
                contentWidth={width}
                source={descriptionHtml}
                tagsStyles={{
                  div: {
                    maxHeight: expanded ? undefined : 100,
                    overflow: expanded ? "visible" : "hidden",
                  },
                }}
              />

              <Text>
                {ads?.description?.split(" ").length > 10 && (
                  <TouchableOpacity onPress={handleClickMore}>
                    <Text style={styles.toggleDescription}>
                      {expanded ? "Less" : "More"}
                    </Text>
                  </TouchableOpacity>
                )}
              </Text>
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
              <Text>
                Joined since {calculateDuration(ads?.seller_joined_since)}
              </Text>
              <RatingSeller
                value={sellerRating}
                text={`${formatCount(sellerReviewCount)} reviews`}
                color="green"
              />

              <ReviewPaidAdSeller adId={ads?.id} />

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

              <View style={styles.shopfront}>
                <TouchableOpacity
                  style={styles.squaredPrimaryButton}
                  onPress={handleSellerShopFront}
                >
                  <Text style={styles.btnText}>
                    <FontAwesomeIcon icon={faShoppingCart} color="#fff" /> Go to
                    Seller Shopfront
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.spaceBtwGroup}>
                <Text style={styles.title}>Ads in Stock Count:</Text>
                <Text style={styles.title}>
                  {ads?.count_in_stock > 0 ? (
                    <Text>{ads?.count_in_stock}</Text>
                  ) : (
                    <Text>Out of Stock</Text>
                  )}
                </Text>
              </View>

              <View style={styles.spaceBtwGroup}>
                <Text style={styles.title}>Total Price: </Text>
                <Text style={styles.title}>
                  {ads?.currency} {formatAmount(calculateTotalPrice())}
                </Text>
              </View>

              <View style={styles.promoSection}>
                <Text>Selected Quantity:</Text>
                <View style={styles.selectContainer}>
                  <Picker
                    selectedValue={selectedQty}
                    onValueChange={handleQtyChange}
                  >
                    {Array.from(
                      { length: ads?.count_in_stock },
                      (_, i) => i + 1
                    ).map((qty) => (
                      <Picker.Item
                        key={qty}
                        label={qty.toString()}
                        value={qty}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              {ads?.promo_code && (
                <View style={styles.promoSection}>
                  <ApplyPromoCode adId={ads?.id} selectedQty={selectedQty} />
                  <Text>
                    Promo Discount Amount:{" "}
                    {promoDiscount ? (
                      <Text>
                        {ads?.currency} {formatAmount(promoDiscount)} (
                        {discountPercentage}%)
                      </Text>
                    ) : (
                      <Text>
                        {" "}
                        {ads?.currency} {formatAmount(0)}
                      </Text>
                    )}
                  </Text>
                  <Text>
                    Final Total Amount: {ads?.currency}{" "}
                    {promoTotalPrice ? (
                      <Text>{formatAmount(promoTotalPrice)}</Text>
                    ) : (
                      <Text>{formatAmount(calculateTotalPrice())}</Text>
                    )}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.buttonGroup}>
              <View style={styles.spaceBtwElement}>
                <TogglePaidAdSave adId={ads?.id} />
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
          </View>

          <View style={styles.payBtn}>
            <TouchableOpacity onPress={handlePaysofterOption}>
              <Text style={styles.roundedPrimaryBtn}>
                Pay With Paysofter Promise
              </Text>
            </TouchableOpacity>
          </View>

          {showPaysofterOption && (
            <Paysofter
              amount={promoTotalPrice}
              currency={ads?.currency}
              email={userInfo?.email}
              paysofterPublicKey={sellerApiKey}
              onSuccess={onSuccess}
              onClose={onClose}
              paymentRef={`PID${Math.floor(
                Math.random() * 100000000000000
              )}`}
              showPromiseOption={true}
              // showFundOption={true}
              // showCardOption={true}
            />
          )}
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
  toggleDescription: {
    color: "#007bff",
    textAlign: "center",
    marginTop: 5,
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
  selectContainer: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    justifyContent: "center",
    textAlign: "center",
    padding: 2,
  },
  promoSection: {
    marginTop: 10,
  },
});

export default PaidAdProductDetail;
