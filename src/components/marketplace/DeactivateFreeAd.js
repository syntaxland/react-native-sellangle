import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { deactivateFreeAd } from "../../redux/actions/marketplaceSellerActions";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Message from "../../Message";
import Loader from "../../Loader";

function DeactivateFreeAd({ ad_id }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

  const deactivateFreeAdState = useSelector(
    (state) => state.deactivateFreeAdState
  );
  const { success, error, loading } = deactivateFreeAdState;
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigation.navigate("CurrentAds");
      }, 3000);
    }
  }, [success]);

  const adData = {
    ad_id: ad_id,
    keyword: keyword,
  };

  const handleDeactivateFreeAd = () => {
    dispatch(deactivateFreeAd(adData));
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {loading && <Loader />}
        {success && (
          <Message variant="success">Ad deactivated successfully.</Message>
        )}
        {error && <Message variant="danger">{error}</Message>}

        <View style={styles.warningContainer}>
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            style={styles.warningIcon}
          />
          <Text style={styles.warningText}>
            Warning! This action will deactivate this ad. Type{" "}
            <Text style={{ fontStyle: "italic" }}>deactivate</Text> to confirm
            the deactivation.
          </Text>
        </View>

        <TextInput
          style={styles.input}
          value={keyword}
          onChangeText={(text) => setKeyword(text)}
          placeholder="deactivate"
          maxLength={10}
        />

        <TouchableOpacity
          style={[
            styles.button,
            { opacity: keyword.toLowerCase() !== "deactivate" ? 0.5 : 1 },
          ]}
          onPress={handleDeactivateFreeAd}
          disabled={keyword.toLowerCase() !== "deactivate"}
        >
          <Text style={styles.buttonText}>Deactivate Ad</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "80%",
  },
  warningContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  warningIcon: {
    color: "yellow",
    marginRight: 5,
  },
  warningText: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default DeactivateFreeAd;
