// SellerPhoto.js
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  RefreshControl,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { sellerPhoto } from "../../redux/actions/marketplaceSellerActions";
import Message from "../../Message";
import Loader from "../../Loader";

function SellerPhoto() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  const marketplaceSellerPhotoState = useSelector(
    (state) => state.marketplaceSellerPhotoState
  );
  const { success, error, loading } = marketplaceSellerPhotoState;

  const [photo, setPhoto] = useState(null);
  const [photoError, setPhotoError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPhoto(null);
    setPhotoError("");
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const sellerData = new FormData();
  if (photo) sellerData.append("photo", photo);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigation.navigate("Home");
        onRefresh();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, navigation, onRefresh]);

  const handleSellerPhoto = (e) => {
    e.preventDefault();
    if (!photo) {
      setPhotoError("Please upload a photo.");
    } else {
      dispatch(sellerPhoto(sellerData));
    }
  };

  const pickImage = async (useLibrary) => {
    let result;
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    };

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync(options);
    }

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const file = {
        uri: uri,
        name: uri.split("/").pop(),
        type: `image/${uri.split(".").pop()}`,
      };
      setPhoto(file);
      setPhotoError("");
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Take Seller's Picture</Text>
        {loading && <Loader />}
        {success && (
          <Message variant="success">
            Seller Account created successfully.
          </Message>
        )}
        {error && <Message variant="danger">{error}</Message>}

        <View style={styles.formGroup}>
          <Text style={styles.label}>Take Photo *</Text>
          <View style={styles.imgContainer}>
            <TouchableOpacity
              style={styles.imagePicker}
              onPress={() => pickImage(true)}
            >
              <Text style={styles.uploadText}>
                {photo ? "Change Photo" : "Select Photo"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.imagePicker}
              onPress={() => pickImage(false)}
            >
              <Text style={styles.uploadText}>Capture Photo</Text>
            </TouchableOpacity>
            {photo ? (
              <>
                <Image
                  source={{ uri: photo.uri }}
                  style={styles.imagePreview}
                />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => setPhoto(null)}
                >
                  <Text style={styles.removeButtonText}>Remove Photo</Text>
                </TouchableOpacity>
              </>
            ) : null}
          </View>
          {photoError && <Text style={styles.errorText}>{photoError}</Text>}
        </View>

        <View style={styles.formGroup}>
          <TouchableOpacity onPress={handleSellerPhoto} disabled={loading}>
            <Text style={styles.roundedPrimaryBtn}>Upload</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 20,
    justifyContent: "center",
    textAlign: "center",
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  imgContainer: {
    width: "100%",
    minHeight: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  imagePicker: {
    marginBottom: 10,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  uploadText: {
    color: "#fff",
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: "#fff",
  },
  errorText: {
    color: "#dc3545",
  },
  roundedPrimaryBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default SellerPhoto;
