import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { deletePaidAd } from "../../redux/actions/marketplaceSellerActions";
import Message from "../../Message";
import Loader from "../../Loader";

function DeletePaidAd({ ad_id }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

  const deletePaidAdState = useSelector((state) => state.deletePaidAdState);
  const { success, error, loading } = deletePaidAdState;
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

  const handleDeletePaidAd = () => {
    dispatch(deletePaidAd(adData));
  };

  return (
    <View style={styles.container}>
      {loading && <Loader />}
      {success && <Message variant="success">Ad deleted successfully.</Message>}
      {error && <Message variant="danger">{error}</Message>}

      <View style={styles.warningContainer}>
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          style={styles.warningIcon}
        />
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

      <Button
        title="Delete Ad"
        onPress={handleDeletePaidAd}
        disabled={keyword.toLowerCase() !== "delete"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
  italic: {
    fontStyle: "italic",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default DeletePaidAd;
