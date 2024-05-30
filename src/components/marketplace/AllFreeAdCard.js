// AllFreeAdCard.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faEye,
  faClock,
  faMessage,
  faMapMarkerAlt,
  faFlag,
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
import { formatAmount } from "../../FormatAmount";
import { formatCount } from "../../FormatCount";
import PromoTimer from "../../PromoTimer";
import RatingSeller from "../../RatingSeller";

function AllFreeAdCard({ product }) {
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
    const pk = product.id;
    if (userInfo) {
      dispatch(getSellerAccount());
      dispatch(getFreeAdDetail(pk));
    }
  }, [dispatch, userInfo, product.id]);

  const adData = {
    ad_id: product.id,
  };

  const viewProductHandler = () => {
    if (!userInfo) {
      navigation.navigate("Login");
    } else {
      dispatch(trackFreeAdView(adData));
      navigation.navigate("Ad Detail", { id: product.id });
    }
  };

  const handleClickMessageSeller = () => {
    if (!userInfo) {
      navigation.navigate("Login");
    } else {
      const queryParams = {
        id: product.id,
        image1: product.image1,
        ad_name: product.ad_name,
        price: product.price,
        currency: product?.currency,
        sellerAvatarUrl,
        seller_username: product.seller_username,
        expiration_date: product.expiration_date,
        ad_rating: sellerRating,
      };

      navigation.navigate("MessageSeller", { queryParams });
    }
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={viewProductHandler}>
        <Image source={{ uri: product.image1 }} style={styles.image} />
      </TouchableOpacity>

      <View style={styles.body}>
        <TouchableOpacity onPress={viewProductHandler}>
          <Text style={styles.title}>{product.ad_name}</Text>
        </TouchableOpacity>

        <View style={styles.ratingContainer}>
          <RatingSeller
            value={sellerRating}
            text={`${formatCount(sellerReviewCount)} reviews `}
            color={"green"}
          />
          <ReviewFreeAdSeller adId={product?.id} />
        </View>

        <Text style={styles.views} onPress={viewProductHandler}>
          <FontAwesomeIcon icon={faEye} size={16} />{" "}
          {formatCount(product?.ad_view_count)} views
        </Text>

        <Text style={styles.price}>
          {formatAmount(product?.price)} {product?.currency}{" "}
          {product?.is_price_negotiable ? <Text>(Negotiable)</Text> : null}
        </Text>

        <View style={styles.promoContainer}>
          <Text style={styles.promoText}>
            <FontAwesomeIcon icon={faClock} size={16} /> Expires in:{" "}
            <PromoTimer expirationDate={product?.expiration_date} />
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleClickMessageSeller}
          >
            <Text style={styles.buttonText}>
              <FontAwesomeIcon icon={faMessage} size={16} /> Message Seller
            </Text>
          </TouchableOpacity>
          <ToggleFreeAdSave ad={product} />
        </View>

        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>
            <FontAwesomeIcon icon={faMapMarkerAlt} size={16} /> {product?.city}{" "}
            {product?.state_province}, {product?.country}.
          </Text>

          <TouchableOpacity
            style={styles.reportButton}
            onPress={handleReportAdOpen}
          >
            <Text style={styles.buttonText}>
              <FontAwesomeIcon icon={faFlag} size={16} /> Report Ad
            </Text>
          </TouchableOpacity>
        </View>

        <Modal visible={reportAdModal} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Report Ad</Text>
              <ReportFreeAd adId={product?.id} />
              <TouchableOpacity onPress={handleReportAdClose}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
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
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor: "#007bff",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  locationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationText: {
    color: "grey",
  },
  reportButton: {
    backgroundColor: "#dc3545",
    borderRadius: 5,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  closeButton: {
    marginTop: 15,
    color: "blue",
    textAlign: "center",
  },
});

export default AllFreeAdCard;
