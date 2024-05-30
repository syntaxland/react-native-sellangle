// Paysofter.js
// Paysofter.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import PaysofterButton from "./PaysofterButton";
import ApplyPromoCode from "../marketplace/ApplyPromoCode";
import Loader from "../../Loader";
import Message from "../../Message";
import { formatAmount } from "../../FormatAmount";

const Paysofter = ({
  adId,
  promoCode,
  buyerEmail,
  amount,
  sellerApiKey,
  currency,
  usdPrice,
  reference,
  ad_id,
  userEmail,
  adsPrice,
  finalItemsPrice,
}) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

  const getPaidAdDetailState = useSelector((state) => state.getPaidAdDetailState);
  const { ads, loading, error } = getPaidAdDetailState;

  const applyPromoCodeState = useSelector((state) => state.applyPromoCodeState);
  const { discountPercentage, promoDiscount } = applyPromoCodeState;

  console.log("promoCode:", promoCode, "adId:", adId);
  console.log("promoDiscount:", promoDiscount, "discountPercentage:", discountPercentage);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const createdAt = new Date().toISOString();
  const totalPrice = ads?.price;
  const promoTotalPrice = totalPrice - promoDiscount;

  const paymentData = {
    reference: reference,
    ad_id: ad_id,
    amount: totalPrice,
    email: userEmail,
    ads_amount: adsPrice,
    final_ads_amount: finalItemsPrice,
    promo_code_discount_amount: promoDiscount,
    promo_code_discount_percentage: discountPercentage,
    final_total_amount: promoTotalPrice,
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Paysofter Promise Option</Text>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <View style={styles.card}>
        <View style={styles.row}>
          <Image source={{ uri: ads?.image1 }} style={styles.image} />
          <Text style={styles.adName}>{ads?.ad_name}</Text>
        </View>
        <Text>Total Amount: {formatAmount(ads?.price)} {currency}</Text>
        {promoCode && (
          <View style={styles.promoSection}>
            <ApplyPromoCode adId={adId} />
            <Text>
              Promo Discount Amount:{" "}
              {promoDiscount ? (
                <Text>
                  {currency} {formatAmount(promoDiscount)} ({discountPercentage}% )
                </Text>
              ) : (
                <Text>0</Text>
              )}
            </Text>
            <Text>
              Final Total Amount: {currency}{" "}
              {promoTotalPrice ? (
                <Text>{formatAmount(promoTotalPrice)}</Text>
              ) : (
                <Text>{formatAmount(totalPrice)}</Text>
              )}
            </Text>
          </View>
        )}
        <Text>Timestamp: {createdAt}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <PaysofterButton
          showPaymentModal={showPaymentModal}
          setShowPaymentModal={setShowPaymentModal}
          paymentData={paymentData}
          reference={reference}
          buyerEmail={buyerEmail}
          currency={currency}
          usdPrice={usdPrice}
          amount={promoTotalPrice}
          sellerApiKey={sellerApiKey}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  card: {
    backgroundColor: "#f8f9fa",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 20,
  },
  adName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  promoSection: {
    marginTop: 20,
  },
  buttonContainer: {
    alignItems: "center",
  },
});

export default Paysofter;
