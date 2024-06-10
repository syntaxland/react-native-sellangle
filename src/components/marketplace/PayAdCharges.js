// PayAdCharges.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Button, StyleSheet, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { payAdCharges } from "../../redux/actions/marketplaceSellerActions";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../Loader";
import Message from "../../Message";
import { formatAmount } from "../../FormatAmount";

const PayAdCharges = ({ totalAdCharges, visible, onClose }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

  const payAdChargesState = useSelector((state) => state.payAdChargesState);
  const { success, error, loading } = payAdChargesState;

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const adData = {
    ad_charges_amt: totalAdCharges,
  };

  const handlePayAdCharges = () => {
    dispatch(payAdCharges(adData));
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {loading && <Loader />}
          {success && (
            <Message variant="success">Ad charges paid successfully.</Message>
          )}
          {error && <Message variant="danger">{error}</Message>}

          <View style={styles.warningContainer}>
            <FontAwesomeIcon icon={faExclamationTriangle} size={18} color="orange" />
            <Text style={styles.warningText}>
              Warning! This action will deduct the ad charges of {formatAmount(totalAdCharges)} from your CPS wallet.
            </Text>
          </View>

          <Button title="Pay Now" onPress={handlePayAdCharges} />
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  warningContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  warningText: {
    marginLeft: 10,
    color: "orange",
    textAlign: "center",
  },
});

export default PayAdCharges;
