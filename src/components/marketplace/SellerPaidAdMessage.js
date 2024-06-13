// SellerPaidAdMessage.js
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Image,
  RefreshControl,
  TouchableOpacity, 
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faUser,
  faPaperPlane,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  sellerReplyPaidAdMessage,
  listPaidAdMessages,
} from "../../redux/actions/marketplaceSellerActions";
import Loader from "../../Loader";
import Message from "../../Message";
import RatingSeller from "../../RatingSeller";
import PromoTimer from "../../PromoTimer";
import { formatAmount } from "../../FormatAmount";

const SellerPaidAdMessage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const {
    id,
    paid_ad_message_id,
    image1,
    ad_name,
    price,
    currency,
    sellerAvatarUrl,
    seller_username,
    expiration_date,
    ad_rating,
  } = route.params;

  const [message, setMessage] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(listPaidAdMessages({ ad_id: id, paid_ad_message_id }));
      setMessage("");
      setRefreshing(false);
    }, 2000);
  }, [dispatch, id, paid_ad_message_id]);

  const sellerReplyPaidAdMessageState = useSelector(
    (state) => state.sellerReplyPaidAdMessageState
  );
  const { loading, success, error } = sellerReplyPaidAdMessageState;

  const listPaidAdMessageState = useSelector(
    (state) => state.listPaidAdMessageState
  );
  const {
    loading: listPaidAdMessageLoading,
    error: listPaidAdMessageError,
    adMessages,
  } = listPaidAdMessageState;

  useEffect(() => {
    dispatch(listPaidAdMessages({ ad_id: id, paid_ad_message_id }));
  }, [dispatch, id, paid_ad_message_id]);

  const handleSubmitReply = () => {
    const messageData = {
      ad_id: id,
      paid_ad_message_id,
      message,
    };

    dispatch(sellerReplyPaidAdMessage(messageData));
  };

  const isFirstMessageOfDay = (currentIndex, messages) => {
    if (currentIndex === 0)
      return formatDateLabel(new Date(messages[0].timestamp));

    const currentDate = new Date(messages[currentIndex].timestamp);
    const prevDate = new Date(messages[currentIndex - 1].timestamp);

    if (currentDate.toLocaleDateString() !== prevDate.toLocaleDateString()) {
      return formatDateLabel(currentDate);
    }
    return "";
  };

  const formatDateLabel = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (isSameDay(date, today)) {
      return "Today";
    } else if (isSameDay(date, yesterday)) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        onRefresh();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [success, onRefresh]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <View style={styles.adDetails}>
          <Text style={styles.header}>Ad Details</Text>
          <View style={styles.adInfo}>
            <View>
              <Image source={{ uri: image1 }} style={styles.adImage} />
              <Text style={styles.detailItem}>{ad_name}</Text>
              <Text style={styles.detailItem}>
                {currency} {formatAmount(price)}
              </Text>
              <Text style={styles.timer}>
                <FontAwesomeIcon icon={faClock} color="#dc3545" /> Expires in:{" "}
                <PromoTimer expirationDate={expiration_date} />
              </Text>
              <Image source={{ uri: sellerAvatarUrl }} style={styles.avatar} />
              <Text>{seller_username}</Text>
              <Text style={styles.detailItem}>
                <RatingSeller value={ad_rating} color="green" />
              </Text>
            </View>
          </View>
        </View>

        {adMessages?.map((message, index) => (
          <View key={index}>
            {isFirstMessageOfDay(index, adMessages) && (
              <Text style={styles.dateLabel}>
                {isFirstMessageOfDay(index, adMessages)}
              </Text>
            )}
            <View
              style={[
                styles.messageItem,
                message.seller ? styles.sellerMessage : styles.buyerMessage,
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  message.seller ? styles.sellerBubble : styles.buyerBubble,
                ]}
              >
                <Text style={styles.username}>
                  <FontAwesomeIcon icon={faUser} />{" "}
                  {message.buyer_username
                    ? message.buyer_username
                    : message.seller_username}
                </Text>
                <Text>{message.message}</Text>
                <Text style={styles.timestamp}>
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
            </View>
          </View>
        ))}

        {/* {adMessages?.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageItem,
              message.buyer ? styles.buyerMessage : styles.sellerMessage,
            ]}
          >
            {isFirstMessageOfDay(index, adMessages) && (
              <Text style={styles.dateLabel}>
                {isFirstMessageOfDay(index, adMessages)}
              </Text>
            )}
            <View
              style={[
                styles.messageBubble,
                message.buyer ? styles.buyerBubble : styles.sellerBubble,
              ]}
            >
              <Text style={styles.username}>
                <FontAwesomeIcon icon={faUser} />{" "}
                {message.buyer_username
                  ? message.buyer_username
                  : message.seller_username}
              </Text>
              <Text>{message.message}</Text>
              <Text style={styles.timestamp}>
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
          </View>
        ))} */}

        {loading && <Loader />}
        {listPaidAdMessageLoading && <Loader />}
        {listPaidAdMessageError && (
          <Message variant="danger">{listPaidAdMessageError}</Message>
        )}
        {error && (
          <Message variant="danger" fixed>
            {error}
          </Message>
        )}
        {success && (
          <Message variant="success" fixed>
            Message sent successfully.
          </Message>
        )}

        <View style={styles.replyForm}>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Type your message"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.formGroup}>
          <TouchableOpacity onPress={handleSubmitReply} disabled={loading}>
            <Text style={styles.roundedPrimaryBtn}>
              Send <FontAwesomeIcon icon={faPaperPlane} color="#fff" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  adDetails: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
  },
  detailItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
  },
  timer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    color: "#dc3545",
  },
  adInfo: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  adImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  messageItem: {
    marginBottom: 10,
    maxWidth: "75%",
  },
  buyerMessage: {
    alignSelf: "flex-start",
  },
  sellerMessage: {
    alignSelf: "flex-end",
  },
  messageBubble: {
    borderRadius: 10,
    padding: 10,
  },
  buyerBubble: {
    backgroundColor: "#f8f9fa",
  },
  sellerBubble: {
    backgroundColor: "#28a745",
  },
  username: {
    fontWeight: "bold",
  },
  timestamp: {
    textAlign: "right",
    fontSize: 10,
  },
  dateLabel: {
    textAlign: "center",
    fontSize: 12,
    color: "#888",
    marginVertical: 5,
  },
  replyForm: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  roundedPrimaryBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 10,
    borderRadius: 25,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
});

export default SellerPaidAdMessage;
