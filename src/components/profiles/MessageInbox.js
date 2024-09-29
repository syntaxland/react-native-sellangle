// MessageInbox.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMessage, faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import RenderHtml from "react-native-render-html";
import {
  getUserMessages,
  clearMessageCounter,
} from "../../redux/actions/messagingActions";
import Loader from "../../Loader";
import Message from "../../Message";
import { Pagination } from "../../Pagination";

const MessageInbox = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  const getUserMessagesState = useSelector(
    (state) => state.getUserMessagesState
  );
  const { loading, messages, error } = getUserMessagesState;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  const msgCounted = messages?.reduce(
    (total, userMessages) => total + userMessages.msg_count,
    0
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = messages?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(getUserMessages());
  }, [dispatch]);

  const [expandedMessages, setExpandedMessages] = useState([]);

  const expandMessage = (messageId) => {
    setExpandedMessages((prevExpanded) => [...prevExpanded, messageId]);
  };

  const clearMsgCounter = (msgId) => {
    const messageData = {
      msg_id: msgId,
    };
    dispatch(clearMessageCounter(messageData));
  };

  const renderItem = ({ item: message }) => (
    <View style={styles.messageItem}>
      <Text style={styles.title}>{message.subject}</Text>
      <Text style={styles.subtitle}>{message?.sender?.username}</Text>
      <RenderHtml
        contentWidth={300}
        source={{
          html: expandedMessages.includes(message.id)
            ? message.message
            : `${message.message.split(" ").slice(0, 10).join(" ")}...`,
        }}
      />
      {!expandedMessages.includes(message.id) && (
        <TouchableOpacity
          onPress={() => {
            expandMessage(message.id);
            clearMsgCounter(message.id);
          }}
        >
          <Text style={styles.link}>View</Text>
        </TouchableOpacity>
      )}
      <View style={styles.footer}>
        <Text style={styles.timestamp}>
          {new Date(message.timestamp).toLocaleString()}
        </Text>
        {message.is_read && (
          <Text style={styles.seen}>
            <FontAwesomeIcon icon={faCheckDouble} color="green" /> Seen
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>
          <FontAwesomeIcon icon={faMessage} />{" "}
          Message Inbox {msgCounted > 0 && `(${msgCounted})`}
        </Text>
        {error && <Message variant="danger">{error}</Message>}
        {loading ? (
          <Loader />
        ) : (
          <>
            {currentItems?.length === 0 ? (
              <Text style={styles.empty}>Inbox messages appear here.</Text>
            ) : (
              currentItems?.map((item, index) => (
                <View key={index}>{renderItem({ item })}</View>
              ))
            )}
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={messages?.length}
              currentPage={currentPage}
              paginate={paginate}
            />
          </>
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
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
  },
  seen: {
    fontSize: 12,
    color: "green",
  },
});

export default MessageInbox;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigation } from "@react-navigation/native";
// import {
//   View,
//   Text,
//   Button,
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { faMessage, faCheckDouble } from "@fortawesome/free-solid-svg-icons";
// import RenderHtml from "react-native-render-html";
// import {
//   getUserMessages,
//   clearMessageCounter,
// } from "../../redux/actions/messagingActions";
// import Loader from "../../Loader";
// import Message from "../../Message";
// import { Pagination } from "../../Pagination";

// const MessageInbox = () => {
//   const dispatch = useDispatch();
//   const navigation = useNavigation();

//   const userProfile = useSelector((state) => state.userProfile);
//   const { profile } = userProfile;

//   const getUserMessagesState = useSelector(
//     (state) => state.getUserMessagesState
//   );
//   const { loading, messages, error } = getUserMessagesState;

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   useEffect(() => {
//     if (!userInfo) {
//       navigation.navigate("Login");
//     }
//   }, [userInfo, navigation]);

//   const msgCounted = messages?.reduce(
//     (total, userMessages) => total + userMessages.msg_count,
//     0
//   );

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = messages?.slice(indexOfFirstItem, indexOfLastItem);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   useEffect(() => {
//     dispatch(getUserMessages());
//   }, [dispatch]);

//   const [expandedMessages, setExpandedMessages] = useState([]);

//   const expandMessage = (messageId) => {
//     setExpandedMessages((prevExpanded) => [...prevExpanded, messageId]);
//   };

//   const clearMsgCounter = (msgId) => {
//     const messageData = {
//       msg_id: msgId,
//     };
//     dispatch(clearMessageCounter(messageData));
//   };

//   const renderItem = ({ item: message }) => (
//     <View style={styles.messageItem}>
//       <Text style={styles.title}>{message.subject}</Text>
//       <Text style={styles.subtitle}>{message?.sender?.username}</Text>
//       <RenderHtml
//         contentWidth={300}
//         source={{
//           html: expandedMessages.includes(message.id)
//             ? message.message
//             : `${message.message.split(" ").slice(0, 10).join(" ")}...`,
//         }}
//       />
//       {!expandedMessages.includes(message.id) && (
//         <TouchableOpacity
//           onPress={() => {
//             expandMessage(message.id);
//             clearMsgCounter(message.id);
//           }}
//         >
//           <Text style={styles.link}>View</Text>
//         </TouchableOpacity>
//       )}
//       <View style={styles.footer}>
//         <Text style={styles.timestamp}>
//           {new Date(message.timestamp).toLocaleString()}
//         </Text>
//         {message.is_read && (
//           <Text style={styles.seen}>
//             <FontAwesomeIcon icon={faCheckDouble} color="green" /> Seen
//           </Text>
//         )}
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>
//         <FontAwesomeIcon icon={faMessage} />
//         Message Inbox {msgCounted > 0 && `(${msgCounted})`}
//       </Text>
//       {error && <Message variant="danger">{error}</Message>}
//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           {currentItems.length === 0 ? (
//             <Text style={styles.empty}>Inbox messages appear here.</Text>
//           ) : (
//             <FlatList
//               data={currentItems}
//               renderItem={renderItem}
//               keyExtractor={(item) => item.id.toString()}
//             />
//           )}
//           <Pagination
//             itemsPerPage={itemsPerPage}
//             totalItems={messages?.length}
//             currentPage={currentPage}
//             paginate={paginate}
//           />
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   empty: {
//     textAlign: "center",
//     padding: 20,
//   },
//   messageItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderColor: "#ccc",
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#777",
//   },
//   link: {
//     color: "#007bff",
//     marginTop: 5,
//   },
//   footer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   timestamp: {
//     fontSize: 12,
//     color: "#888",
//   },
//   seen: {
//     fontSize: 12,
//     color: "green",
//   },
// });

// export default MessageInbox;
