// GetSellerFreeAdMsgInbox.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMessage, faUser } from "@fortawesome/free-solid-svg-icons";
import RenderHtml from "react-native-render-html";
import { getUserProfile } from "../../redux/actions/userProfileActions";
import {
  listBuyerFreeAdMessages,
  clearSellerFreeAdMessageCounter,
} from "../../redux/actions/marketplaceSellerActions";
import Loader from "../../Loader";
import Message from "../../Message";
import { Pagination } from "../../Pagination";

const GetSellerFreeAdMsgInbox = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  const listBuyerFreeAdMessagesState = useSelector(
    (state) => state.listBuyerFreeAdMessagesState
  );
  const { loading, freeAdMessages, error } = listBuyerFreeAdMessagesState;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = freeAdMessages?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [expandedMessages, setExpandedMessages] = useState([]);

  const expandMessage = (messageId) => {
    setExpandedMessages((prevExpanded) => [...prevExpanded, messageId]);
  };

  const handleReplyBuyer = (message) => {
    const queryParams = {
      id: message?.free_ad_id,
      free_ad_message_id: message?.free_ad_message_id,
      image1: message?.free_ad_image1,
      ad_name: message?.free_ad_name,
      price: message?.free_ad_price,
      currency: message?.free_ad_currency,
      sellerAvatarUrl: message?.sellerAvatarUrl,
      seller_username: message?.free_ad_seller_username,
      expiration_date: message?.free_ad_expiration_date,
      ad_rating: message?.free_ad_rating,
    };

    navigation.navigate("Seller Free Ad Message", {
      id: message.id,
      ...queryParams,
    });
  };

  const clearMsgCounter = (msgId) => {
    const counterData = {
      free_ad_message_id: msgId,
    };
    dispatch(clearSellerFreeAdMessageCounter(counterData));
  };

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(listBuyerFreeAdMessages());
  }, [dispatch]);

  const renderItem = ({ item: message }) => (
    <View style={styles.messageItem}>
      <Text style={styles.title}>{message?.subject}</Text>
      <Text style={styles.subtitle}>
        <FontAwesomeIcon icon={faUser} /> {message?.username}
      </Text>
      <RenderHtml
        contentWidth={300}
        source={{
          html: expandedMessages.includes(message.id)
            ? message.message
            : `${message.message.split(" ").slice(0, 10).join(" ")}...`,
        }}
      />
      {!expandedMessages.includes(message.id) && (
        <TouchableOpacity onPress={() => expandMessage(message.id)}>
          <Text style={styles.link}>Read More</Text>
        </TouchableOpacity>
      )}

      <View style={styles.replyMsg}>
        <TouchableOpacity
          onPress={() => {
            handleReplyBuyer(message);
            clearMsgCounter(message.free_ad_message_id);
          }}
        >
          <Text style={styles.roundedPrimaryBtn}>
            Reply Message{" "}
            {message.seller_paid_ad_msg_count > 0 && (
              <Text style={styles.msgCounter}>
                {message.seller_paid_ad_msg_count}
              </Text>
            )}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.timestamp}>
          {new Date(message?.modified_at).toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        {currentItems?.length > 0 && profile.is_marketplace_seller && (
          <View>
            <Text style={styles.header}>
              <FontAwesomeIcon icon={faMessage} /> Seller Free Ad Inbox
            </Text>
            {error && <Message variant="danger">{error}</Message>}
            {loading ? (
              <Loader />
            ) : (
              <>
                {currentItems?.length === 0 ? (
                  <Text style={styles.empty}>
                    Free ad inbox messages appear here.
                  </Text>
                ) : (
                  currentItems.map((item, index) => (
                    <View key={index}>{renderItem({ item })}</View>
                  ))
                )}
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={freeAdMessages?.length}
                  currentPage={currentPage}
                  paginate={paginate}
                />
              </>
            )}
          </View>
        )}
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
    marginBottom: 10,
  },
  empty: {
    textAlign: "center",
    padding: 20,
  },
  messageItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
  },
  link: {
    color: "#007bff",
    marginTop: 5,
  },
  replyMsg: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
  },
  msgCounter: {
    fontSize: 12,
    backgroundColor: "red",
    color: "#fff",
    fontWeight: "bold",
    padding: 6,
    borderRadius: 50,
    marginLeft: 5,
  },
});

export default GetSellerFreeAdMsgInbox;
