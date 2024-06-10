// UserReplySupportTicket.js
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  userReplySupportTicket,
  getTicketDetail,
  listSupportTicketReply,
} from "../../redux/actions/supportActions";
import Loader from "../../Loader";
import Message from "../../Message";

const UserReplySupportTicket = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const { ticketId } = route.params;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  const [replyMessage, setReplyMessage] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(getTicketDetail(ticketId));
      dispatch(listSupportTicketReply(ticketId));
      setReplyMessage("");
      setRefreshing(false);
    }, 2000);
  }, [dispatch, ticketId]);

  const replySupportTicketState = useSelector(
    (state) => state.replySupportTicketState
  );
  const { loading, success, error } = replySupportTicketState;

  const ticketDetailList = useSelector((state) => state.ticketDetailList);
  const { tickets } = ticketDetailList;

  const listSupportTicketReplyState = useSelector(
    (state) => state.listSupportTicketReplyState
  );
  const { ticketReplies } = listSupportTicketReplyState;

  useEffect(() => {
    dispatch(getTicketDetail(ticketId));
    dispatch(listSupportTicketReply(ticketId));
  }, [dispatch, ticketId]);

  const handleSubmitReply = () => {
    const replyticketData = {
      ticket_id: ticketId,
      message: replyMessage,
    };

    dispatch(userReplySupportTicket(replyticketData));
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
      }, 100);
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
        <View style={styles.ticketDetails}>
          <Text style={styles.header}>Support Ticket Details</Text>
          <View style={styles.ticketInfo}>
            <Text style={styles.detailItem}>Ticket ID: {ticketId}</Text>
            {tickets?.map((ticket) => (
              <View key={ticket.id}>
                <Text style={styles.detailItem}>Subject: {ticket.subject}</Text>
                <Text style={styles.detailItem}>
                  <FontAwesomeIcon icon={faUser} />{" "}
                  {ticket.user_username.charAt(0).toUpperCase() +
                    ticket.user_username.slice(1)}
                </Text>
                <Text style={styles.detailItem}>Message: {ticket.message}</Text>
                <Text style={styles.detailItem}>
                  {new Date(ticket.created_at).toLocaleString("en-US", {
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
            ))}
          </View>
        </View>

        {ticketReplies?.map((message, index) => (
          <View key={message.id}>
            {isFirstMessageOfDay(index, ticketReplies) && (
              <Text style={styles.dateLabel}>
                {isFirstMessageOfDay(index, ticketReplies)}
              </Text>
            )}
            <View
              style={[
                styles.messageItem,
                message.admin_user ? styles.adminMessage : styles.userMessage,
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  message.admin_user ? styles.adminBubble : styles.userBubble,
                ]}
              >
                <Text style={styles.username}>
                  <FontAwesomeIcon icon={faUser} />{" "}
                  {message.user_username
                    ? message.user_username.charAt(0).toUpperCase() +
                      message.user_username.slice(1)
                    : message.admin_username.charAt(0).toUpperCase() +
                      message.admin_username.slice(1)}
                </Text>
                <Text>{message.message}</Text>
                <Text style={styles.timestamp}>
                  {new Date(message.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
            </View>
          </View>
        ))}

        {loading && <Loader />}
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
            value={replyMessage}
            onChangeText={setReplyMessage}
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
  ticketDetails: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  detailItem: {
    marginBottom: 10,
  },
  ticketInfo: {
    marginBottom: 10,
  },
  messageItem: {
    marginBottom: 10,
    maxWidth: "75%",
  },
  adminMessage: {
    alignSelf: "flex-start",
  },
  userMessage: {
    alignSelf: "flex-end",
  },
  messageBubble: {
    borderRadius: 10,
    padding: 10,
  },
  adminBubble: {
    backgroundColor: "#f8f9fa",
  },
  userBubble: {
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
    justifyContent: "center",
    alignItems: "center",
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
  },
  formGroup: {
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
  },
  roundedPrimaryBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    textAlign: "center",
    overflow: "hidden",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default UserReplySupportTicket;
