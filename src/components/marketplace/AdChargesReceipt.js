// AdChargesReceipt.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDownload, faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
// import RNFetchBlob from "rn-fetch-blob";
import { Buffer } from "buffer";
import axios from "axios";
import Loader from "../../Loader";

import { API_URL } from "../../config/apiConfig";

const AdChargesReceipt = ({ adChargesReceiptMonth, billingPeriodLoading }) => {
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleCloseReceiptModal = () => {
    setShowReceiptModal(false);
    setSuccess(false);
    setError(null);
  };

  const handleShowReceiptModal = () => setShowReceiptModal(true);

  // const downloadAdChargesReceipt = async () => {
  //   try {
  //     setLoading(true);

  //     const response = await axios.get(
  //       `${API_URL}/api/get-ad-charges-receipt/`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${userInfo?.access}`,
  //         },
  //         params: {
  //           ad_charges_receipt_month: adChargesReceiptMonth,
  //         },
  //         responseType: "arraybuffer",
  //       }
  //     );

  //     if (response.status === 200) {
  //       const { dirs } = RNFetchBlob.fs;
  //       const path = `${dirs.DownloadDir}/${adChargesReceiptMonth}_ad_charges_receipt.pdf`;

  //       await RNFetchBlob.fs.writeFile(path, response.data, "base64");
  //       await RNFetchBlob.android.addCompleteDownload({
  //         title: "Ad Charges Receipt",
  //         description: `Ad charges receipt for ${adChargesReceiptMonth}`,
  //         mime: "application/pdf",
  //         path,
  //         showNotification: true,
  //       });

  //       console.log("File downloaded to ", path);
  //       setSuccess(true);
  //     } else {
  //       setError("Error downloading ad charges receipt.");
  //     }
  //   } catch (error) {
  //     setError(`Error downloading ad charges receipt: ${error.message}`);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const downloadAdChargesReceipt = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API_URL}/api/get-ad-charges-receipt/`,
        {
          headers: {
            Authorization: `Bearer ${userInfo?.access}`,
          },
          params: {
            ad_charges_receipt_month: adChargesReceiptMonth,
          },
          responseType: "arraybuffer",
        }
      );

      if (response.status === 200) {
        const fileUri =
          FileSystem.documentDirectory +
          `${adChargesReceiptMonth}_ad_charges_receipt.pdf`;

        await FileSystem.writeAsStringAsync(
          fileUri,
          Buffer.from(response.data, "binary").toString("base64"),
          {
            encoding: FileSystem.EncodingType.Base64,
          }
        );

        console.log("File downloaded to ", fileUri);
        setSuccess(true);
      } else {
        setError("Error downloading ad charges receipt.");
      }
    } catch (error) {
      setError(`Error downloading ad charges receipt: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // const downloadAdChargesReceipt = async () => {
  //   try {
  //     setLoading(true);

  //     const response = await axios.get(
  //       `${API_URL}/api/get-ad-charges-receipt/`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${userInfo?.access}`,
  //         },
  //         params: {
  //           ad_charges_receipt_month: adChargesReceiptMonth,
  //         },
  //         responseType: "arraybuffer",
  //       }
  //     );

  //     if (response.status === 200) {
  //       const base64 = Buffer.from(response.data, "binary").toString("base64");
  //       const fileUri =
  //         FileSystem.documentDirectory +
  //         `${adChargesReceiptMonth}_ad_charges_receipt.pdf`;

  //       await FileSystem.writeAsStringAsync(fileUri, base64, {
  //         encoding: FileSystem.EncodingType.Base64,
  //       });

  //       const { status } = await MediaLibrary.requestPermissionsAsync();
  //       if (status === "granted") {
  //         const asset = await MediaLibrary.createAssetAsync(fileUri);
  //         let album = await MediaLibrary.getAlbumAsync("Download");
  //         if (!album) {
  //           album = await MediaLibrary.createAlbumAsync("Download", asset, false);
  //         } else {
  //           await MediaLibrary.addAssetsToAlbumAsync([asset], album.id, false);
  //         }
  //         console.log("File saved to Downloads");
  //       } else {
  //         setError("Permission to access media library is required.");
  //       }

  //       console.log("File downloaded to ", fileUri);
  //       setSuccess(true);
  //     } else {
  //       setError("Error downloading ad charges receipt.");
  //     }
  //   } catch (error) {
  //     setError(`Error downloading ad charges receipt: ${error.message}`);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleShowReceiptModal}
          disabled={
            loading ||
            billingPeriodLoading ||
            // success ||
            adChargesReceiptMonth === ""
          }
        >
          <Text style={styles.buttonText}>
            <FontAwesomeIcon
              icon={faDownload}
              style={styles.icon}
              color="#fff"
            />{" "}
            {loading ? "Downloading..." : "Download"}
          </Text>
        </TouchableOpacity>

        <Modal
          visible={showReceiptModal}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalBody}>
              <Text style={styles.modalTitle}>Ad Charges Receipt</Text>
              {loading ? (
                <>
                  <Loader />
                  <Text>Downloading...</Text>
                </>
              ) : success ? (
                <Text style={styles.successMessage}>
                  Ad charges receipt for {adChargesReceiptMonth} downloaded
                  successfully.
                </Text>
              ) : error ? (
                <Text style={styles.errorMessage}>{error}</Text>
              ) : (
                <>
                  <Text>
                    Download your ad billing receipt for:{" "}
                    {adChargesReceiptMonth}?
                  </Text>
                  <TouchableOpacity
                    style={styles.downloadButton}
                    onPress={downloadAdChargesReceipt}
                  >
                    <Text style={styles.downloadButtonText}>
                      <FontAwesomeIcon
                        icon={faFileDownload}
                        style={styles.icon}
                        color="#fff"
                      />{" "}
                      Download Now
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              <TouchableOpacity
                onPress={handleCloseReceiptModal}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  icon: {
    marginRight: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalBody: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },

  successMessage: {
    color: "green",
    marginBottom: 10,
  },
  errorMessage: {
    color: "red",
    marginBottom: 10,
  },
  downloadButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  downloadButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 20,
  },
  closeButtonText: {
    color: "blue",
    fontSize: 16,
  },
});

export default AdChargesReceipt;
