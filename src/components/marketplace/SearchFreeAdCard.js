// SearchFreeAdCard.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faEye,
  faClock,
  faMapMarkerAlt,
  faFlag,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  getSellerAccount,
  getFreeAdDetail,
  trackFreeAdView,
} from "../../redux/actions/marketplaceSellerActions";
import ReportFreeAd from "./ReportFreeAd";
import ToggleFreeAdSave from "./ToggleFreeAdSave";
import ReviewFreeAdSeller from "./ReviewFreeAdSeller";
import RatingSeller from "../../RatingSeller";
import PromoTimer from "../../PromoTimer";

function SearchFreeAdCard({ freeSearchAd }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const getFreeAdDetailState = useSelector(
    (state) => state.getFreeAdDetailState
  );
  const { sellerAvatarUrl, sellerRating, sellerReviewCount } =
    getFreeAdDetailState;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [reportAdModal, setReportAdModal] = useState(false);
  const handleReportAdOpen = () => {
    if (!userInfo) {
      navigation.navigate("Login");
    } else {
      setReportAdModal(true);
    }
  };

  const handleReportAdClose = () => {
    setReportAdModal(false);
  };

  useEffect(() => {
    const pk = freeSearchAd.id;
    if (userInfo) {
      dispatch(getSellerAccount());
      dispatch(getFreeAdDetail(pk));
    }
  }, [dispatch, userInfo, freeSearchAd.id]);

  const adData = {
    ad_id: freeSearchAd.id,
  };

  const viewProductHandler = () => {
    if (!userInfo) {
      navigation.navigate("Login");
    } else {
      dispatch(trackFreeAdView(adData));
      navigation.navigate("FreeAdDetail", { id: freeSearchAd.id });
    }
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

  const handleClickMessageSeller = () => {
    if (!userInfo) {
      navigation.navigate("Login");
    } else {
      const queryParams = {
        id: freeSearchAd.id,
        image1: freeSearchAd.image1,
        ad_name: freeSearchAd.ad_name,
        price: freeSearchAd.price,
        currency: freeSearchAd?.currency,
        sellerAvatarUrl,
        seller_username: freeSearchAd.seller_username,
        expiration_date: freeSearchAd.expiration_date,
        ad_rating: sellerRating,
      };

      // navigation.navigate("BuyerMessage", queryParams);

      navigation.navigate("Seller Free Ad Message", {
        id: freeSearchAd.id,
        ...queryParams,
      });
    }
  };

  function formatNumber(number, decimalPlaces = 2) {
    const formattedNumber = parseFloat(number).toFixed(decimalPlaces);
    const parts = formattedNumber.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  return (
    <ScrollView style={styles.card}>
      <TouchableOpacity onPress={viewProductHandler}>
        <Image source={{ uri: freeSearchAd.image1 }} style={styles.image} />
      </TouchableOpacity>

      <View style={styles.body}>
        <TouchableOpacity onPress={viewProductHandler}>
          <Text style={styles.title}>{freeSearchAd.ad_name}</Text>
        </TouchableOpacity>

        <View style={styles.ratingContainer}>
          <RatingSeller
            value={sellerRating}
            text={`${formatCount(sellerReviewCount)} reviews `}
            color={"green"}
          />
          <ReviewFreeAdSeller adId={freeSearchAd?.id} />
        </View>

        <Text style={styles.views}>
          <FontAwesomeIcon icon={faEye} size={16} />{" "}
          {formatCount(freeSearchAd?.ad_view_count)} views
        </Text>

        <Text style={styles.price}>
          {formatNumber(freeSearchAd?.price)} {freeSearchAd?.currency}{" "}
          {freeSearchAd?.is_price_negotiable ? <Text>(Negotiable)</Text> : null}
        </Text>

        <View style={styles.promoContainer}>
          <Text style={styles.promoText}>
            <FontAwesomeIcon icon={faClock} size={16} /> Expires in:{" "}
            <PromoTimer expirationDate={freeSearchAd?.expiration_date} />
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <ToggleFreeAdSave ad={freeSearchAd} />
          <Button
            title="Message Seller"
            color="#007bff"
            onPress={handleClickMessageSeller}
          />
        </View>

        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>
            <FontAwesomeIcon icon={faMapMarkerAlt} size={16} />{" "}
            {freeSearchAd?.city} {freeSearchAd?.state_province},{" "}
            {freeSearchAd?.country}.
          </Text>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleReportAdOpen}
          >
            <Text style={styles.buttonText}>Report Ad</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.modalContainer}>
          <Modal
            visible={reportAdModal}
            transparent={true}
            animationType="slide"
            onRequestClose={handleReportAdClose}
          >
            <View style={styles.modalContent}>
              <ReportFreeAd adId={freeSearchAd?.id} />
              <TouchableOpacity onPress={handleReportAdClose}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  body: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  views: {
    color: "grey",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  promoContainer: {
    marginBottom: 5,
  },
  promoText: {
    color: "green",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationText: {
    color: "grey",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionButton: {
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  closeButton: {
    color: "#007bff",
    marginTop: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  spaceBtwGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 2,
  },
  spaceBtwElement: {
    padding: 10,
  },
});

export default SearchFreeAdCard;
