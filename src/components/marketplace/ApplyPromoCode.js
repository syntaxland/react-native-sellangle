// ApplyPromoCode.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  applyPromoCode,
  // resetApplyPromoCode,
} from "../../redux/actions/marketplaceSellerActions";
import Message from "../../Message";
import Loader from "../../Loader";

const ApplyPromoCode = ({ adId, selectedQty }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

  const applyPromoCodeState = useSelector((state) => state.applyPromoCodeState);
  const { loading, success, discountPercentage, error } = applyPromoCodeState;

  const [promoCode, setPromoCode] = useState("");

  const applyCodeHandler = () => {
    const promoData = {
      ad_id: adId,
      selected_qty: selectedQty,
      promo_code: promoCode.trim(),
    };

    dispatch(applyPromoCode(promoData));
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        // dispatch(resetApplyPromoCode());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success]);

  return (
    <View style={styles.container}>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {success && (
        <Message variant="success">
          Promo code "{promoCode}" with {discountPercentage}% discount applied
          successfully.
        </Message>
      )}

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter promo code"
          value={promoCode}
          onChangeText={(text) => setPromoCode(text)}
          required
        />
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                loading || success || promoCode === "" ? "gray" : "red",
            },
          ]}
          onPress={applyCodeHandler}
          disabled={loading || success || promoCode === ""}
        >
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
  },
  form: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  input: {
    flex: 1,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ApplyPromoCode;
