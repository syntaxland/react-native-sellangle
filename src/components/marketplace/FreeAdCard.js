// FreeAdCard.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faEye,
  faClock,
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
import PromoTimer from "../../PromoTimer";
import RatingSeller from "../../RatingSeller";
import DeleteFreeAd from "./DeleteFreeAd";
import DeactivateFreeAd from "./DeactivateFreeAd";
import ReactivateFreeAd from "./ReactivateFreeAd";

function FreeAdCard({ product }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const getFreeAdDetailState = useSelector(
    (state) => state.getFreeAdDetailState
  );
  const { sellerRating, sellerReviewCount } = getFreeAdDetailState;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

  const isAdExpired = new Date(product?.expiration_date) < new Date();

  const [deleteAdModal, setDeleteModal] = useState(false);
  const [deactivateAdModal, setDeactivateAdModal] = useState(false);
  const [reactivateAdModal, setReactivateAdModal] = useState(false);

  const handleDeleteAdOpen = () => setDeleteModal(true);
  const handleDeleteAdClose = () => setDeleteModal(false);

  const handleDeactivateAdOpen = () => setDeactivateAdModal(true);
  const handleDeactivateAdClose = () => setDeactivateAdModal(false);

  const handleReactivateAdOpen = () => setReactivateAdModal(true);
  const handleReactivateAdClose = () => setReactivateAdModal(false);

  const handleEditAd = () => {
    const id = product?.id;
    if (id) {
      navigation.navigate("Edit Free Ad", { id });
    } else {
      console.error("Product ID is undefined");
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

  function formatNumber(number, decimalPlaces = 2) {
    const formattedNumber = parseFloat(number).toFixed(decimalPlaces);
    const parts = formattedNumber.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  return (
    <ScrollView>
      <View style={styles.card}>
        <TouchableOpacity onPress={handleEditAd}>
          <Image source={{ uri: product.image1 }} style={styles.image} />
        </TouchableOpacity>

        <View style={styles.body}>
          <TouchableOpacity onPress={handleEditAd}>
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

          <Text style={styles.views}>
            <FontAwesomeIcon icon={faEye} size={16} />{" "}
            {formatCount(product?.ad_view_count)} views
          </Text>

          <Text style={styles.price}>
            {formatNumber(product?.price)} {product?.currency}{" "}
            {product?.is_price_negotiable ? <Text>(Negotiable)</Text> : null}
          </Text>

          <View style={styles.promoContainer}>
            <Text style={styles.promoText}>
              <FontAwesomeIcon icon={faClock} size={16} /> Expires in:{" "}
              <PromoTimer expirationDate={product?.expiration_date} />
            </Text>
          </View>

          <View style={styles.buttonsContainer}>
            <ToggleFreeAdSave ad={product} />
          </View>

          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>
              <FontAwesomeIcon icon={faMapMarkerAlt} size={16} />{" "}
              {product?.city} {product?.state_province}, {product?.country}.
            </Text>
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleEditAd}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            {isAdExpired ? (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleReactivateAdOpen}
              >
                <Text style={styles.buttonText}>Reactivate</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleDeactivateAdOpen}
              >
                <Text style={styles.buttonText}>Deactivate</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleDeleteAdOpen}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContainer}>
            <Modal
              visible={deleteAdModal}
              transparent={true}
              animationType="slide"
              onRequestClose={handleDeleteAdClose}
            >
              <View style={styles.modalContent}>
                <DeleteFreeAd ad_id={product?.id} />
                <TouchableOpacity onPress={handleDeleteAdClose}>
                  <Text style={styles.closeButton}>Close</Text>
                </TouchableOpacity>
              </View>
            </Modal>

            <Modal
              visible={deactivateAdModal}
              transparent={true}
              animationType="slide"
              onRequestClose={handleDeactivateAdClose}
            >
              <View style={styles.modalContent}>
                <DeactivateFreeAd ad_id={product?.id} />
                <TouchableOpacity onPress={handleDeactivateAdClose}>
                  <Text style={styles.closeButton}>Close</Text>
                </TouchableOpacity>
              </View>
            </Modal>

            <Modal
              visible={reactivateAdModal}
              transparent={true}
              animationType="slide"
              onRequestClose={handleReactivateAdClose}
            >
              <View style={styles.modalContent}>
                <ReactivateFreeAd ad_id={product?.id} />
                <TouchableOpacity onPress={handleReactivateAdClose}>
                  <Text style={styles.closeButton}>Close</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
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
    backgroundColor: "#007bff",
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
});

export default FreeAdCard;
