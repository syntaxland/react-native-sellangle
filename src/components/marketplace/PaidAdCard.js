// PaidAdCard.js
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
  faMapMarkerAlt,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import RatingSeller from "../../RatingSeller";
import PromoTimer from "../../PromoTimer";
import DeletePaidAd from "./DeletePaidAd";
import DeactivatePaidAd from "./DeactivatePaidAd";
import ReactivatePaidAd from "./ReactivatePaidAd";
import TogglePaidAdSave from "./TogglePaidAdSave";
import ReviewPaidAdSeller from "./ReviewPaidAdSeller";
import { formatAmount } from "../../FormatAmount";
import { formatHour } from "../../formatHour";

function PaidAdCard({ product }) {
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  const getPaidAdDetailState = useSelector(
    (state) => state.getPaidAdDetailState
  );
  const { sellerRating, sellerReviewCount } = getPaidAdDetailState;

  const isAdExpired = new Date(product?.expiration_date) < new Date();

  const [deleteAdModal, setDeleteModal] = useState(false);
  const [deactivateAdModal, setDeactivateAdModal] = useState(false);
  const [reactivateAdModal, setReactivateAdModal] = useState(false);

  const handleDeleteAdOpen = () => setDeleteModal(true);
  const handleDeleteAdClose = () => setDeleteModal(false);

  const handleDeactivateAdOpen = () => setDeactivateAdModal(true);
  const handleDeactivateAdClose = () => setDeactivateAdModal(false);

  const handleReactivateAdOpen = () => setReactivateAdModal(true);
  const handleReleteAdClose = () => setReactivateAdModal(false);

  const handleEditAd = () => {
    const id = product.id;
    navigation.navigate("Edit Paid Ad", { id });
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
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => navigation.navigate("AdDetail", { id: product.id })}
      >
        <Image source={{ uri: product.image1 }} style={styles.image} />
      </TouchableOpacity>

      <View style={styles.body}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate("AdDetail", { id: product.id })}
          >
            <Text style={styles.title}>{product.ad_name}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.promoBadge} disabled>
            <Text style={styles.promoBadgeText}>Promoted</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.ratingContainer}>
          <RatingSeller
            value={sellerRating}
            text={`${formatCount(sellerReviewCount)} reviews`}
            color={"green"}
          />
          <ReviewPaidAdSeller adId={product?.id} />
        </View>

        <Text style={styles.views}>
          <FontAwesomeIcon icon={faEye} size={16} />{" "}
          {formatCount(product?.ad_view_count)} views
        </Text>

        <Text style={styles.price}>
          {formatNumber(product?.price)} {product?.currency}
          {product?.usd_price && (
            <Text>
              {" "}
              / {product?.usd_price} {product?.usd_currency}
            </Text>
          )}
          {product?.is_price_negotiable && <Text> (Negotiable)</Text>}
        </Text>

        {product?.promo_code && (
          <View style={styles.promoContainer}>
            <Text style={styles.promoText}>
              Promo Code: {product.promo_code} {product.discount_percentage}%
              Off
            </Text>
          </View>
        )}

        <View style={styles.promoContainer}>
          <Text style={styles.expiration}>
            <FontAwesomeIcon icon={faClock} size={16} /> Expires in:{" "}
            <PromoTimer expirationDate={product?.expiration_date} />
          </Text>
        </View>

        <TogglePaidAdSave ad={product} />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleEditAd}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          {isAdExpired ? (
            <TouchableOpacity
              style={styles.button}
              onPress={handleReactivateAdOpen}
            >
              <Text style={styles.buttonText}>Reactivate</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={handleDeactivateAdOpen}
            >
              <Text style={styles.buttonText}>Deactivate</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={handleDeleteAdOpen}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.dueCharges}>
          Due Ad Charges: {formatAmount(product?.ad_charges)} CPS (
          {formatHour(product?.ad_charge_hours)} hours)
        </Text>

        <Text style={styles.location}>
          <FontAwesomeIcon icon={faMapMarkerAlt} size={16} /> {product?.city}{" "}
          {product?.state_province}, {product?.country}.
        </Text>
      </View>

      <Modal visible={deleteAdModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete Ad</Text>
            <DeletePaidAd ad_id={product?.id} />
            <TouchableOpacity onPress={handleDeleteAdClose}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={deactivateAdModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Deactivate Ad</Text>
            <DeactivatePaidAd ad_id={product?.id} />
            <TouchableOpacity onPress={handleDeactivateAdClose}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={reactivateAdModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reactivate Ad</Text>
            <ReactivatePaidAd ad_id={product?.id} />
            <TouchableOpacity onPress={handleReleteAdClose}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  promoBadge: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 5,
  },
  promoBadgeText: {
    color: "#fff",
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
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
    marginVertical: 5,
  },
  promoText: {
    color: "blue",
  },
  expiration: {
    color: "red",
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  button: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
  },
  dueCharges: {
    color: "grey",
    marginBottom: 5,
  },
  location: {
    color: "grey",
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
    color: "#007bff",
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

export default PaidAdCard;
