import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { deleteFreeAd } from "../../redux/actions/marketplaceSellerActions";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Message from "../../Message";
import Loader from "../../Loader";

function DeleteFreeAd({ ad_id }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login"); 
    }
  }, [userInfo]);

  const deleteFreeAdState = useSelector((state) => state.deleteFreeAdState);
  const { success, error, loading } = deleteFreeAdState;

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigation.navigate("CurrentAds");
      }, 3000);
    }
  }, [success, navigation]);

  const adData = {
    ad_id: ad_id,
    keyword: keyword,
  };

  const handleDeleteFreeAd = () => {
    dispatch(deleteFreeAd(adData));
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {loading && <Loader />}
        {success && (
          <Message variant="success">Ad deleted successfully.</Message>
        )}
        {error && <Message variant="danger">{error}</Message>}

        <View style={styles.warningContainer}>
          <FontAwesomeIcon icon={faExclamationTriangle} style={styles.warningIcon} />
          <Text style={styles.warningText}>
            Warning! This action will delete this ad and it's irreversible. Type{" "}
            <Text style={{ fontStyle: "italic" }}>delete</Text> to confirm the
            deletion.
          </Text>
        </View>

        <TextInput
          style={styles.input}
          value={keyword}
          onChangeText={(text) => setKeyword(text)}
          placeholder="delete"
          maxLength={6}
        />

        <TouchableOpacity
          style={[styles.button, { opacity: keyword.toLowerCase() !== "delete" ? 0.5 : 1 }]}
          onPress={handleDeleteFreeAd}
          disabled={keyword.toLowerCase() !== "delete"}
        >
          <Text style={styles.buttonText}>Delete Ad</Text>
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

export default DeleteFreeAd;
