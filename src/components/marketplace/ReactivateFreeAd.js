// ReactivateFreeAd.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { reactivateFreeAd } from "../../redux/actions/marketplaceSellerActions";
import { useNavigation } from "@react-navigation/native";
import Message from "../../Message";
import Loader from "../../Loader";

function ReactivateFreeAd({ ad_id }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

  const reactivateFreeAdState = useSelector(
    (state) => state.reactivateFreeAdState
  );
  const { success, error, loading } = reactivateFreeAdState;
  const [duration, setDuration] = useState("");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigation.navigate("CurrentAds");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, navigation]);

  const adData = {
    ad_id: ad_id,
    duration: duration,
  };

  const handleReactivateFreeAd = () => {
    dispatch(reactivateFreeAd(adData));
  };

  const DURATION_CHOICES = [
    ["1 day", "1 day (Free)"],
    ["2 days", "2 days (Free)"],
    ["3 days", "3 days (Free)"],
    ["5 days", "5 days (Free)"],
    ["1 week", "1 week (Free)"],
    ["2 weeks", "2 weeks (Free)"],
    ["1 month", "1 month (Free)"],
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {loading && <Loader />}
        {success && (
          <Message variant="success">Ad successfully reactivated for {duration}.</Message>
        )}
        {error && <Message variant="danger">{error}</Message>}

        <Picker
          selectedValue={duration}
          style={styles.picker}
          onValueChange={(itemValue) => setDuration(itemValue)}
        >
          <Picker.Item label="Select Ad Duration" value="" />
          {DURATION_CHOICES.map((type) => (
            <Picker.Item key={type[0]} label={type[1]} value={type[0]} />
          ))}
        </Picker>

        <TouchableOpacity
          style={[
            styles.button,
            { opacity: duration === "" ? 0.5 : 1 },
          ]}
          onPress={handleReactivateFreeAd}
          disabled={duration === ""}
        >
          <Text style={styles.buttonText}>Reactivate Ad</Text>
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
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 20,
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

export default ReactivateFreeAd;
