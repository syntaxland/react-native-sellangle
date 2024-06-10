// AdminSupportTicket.js
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Button, DataTable } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import {
  listAllSupportTickets,
  clearUserSupportMsgCounter,
} from "../../redux/actions/supportActions";
import Message from "../../Message";
import Loader from "../../Loader";
import { Pagination } from "../../Pagination";

const AdminSupportTicket = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const allTicketList = useSelector((state) => state.allTicketList);
  const { loading, tickets, error } = allTicketList;
  console.log("tickets:", tickets);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(listAllSupportTickets());
      setRefreshing(false);
    }, 2000);
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tickets
    ? tickets.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  useEffect(() => {
    dispatch(listAllSupportTickets());
  }, [dispatch]);

  const clearMessageCounter = (ticketId) => {
    const ticketData = {
      ticket_id: ticketId,
    };
    dispatch(clearUserSupportMsgCounter(ticketData));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <Text style={styles.title}>
            <Text style={styles.icon}>
              {" "}
              <FontAwesomeIcon icon={faTicket} />
            </Text>{" "}
            Support Tickets
          </Text>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {currentItems.length === 0 ? (
                <Text style={styles.noTicketsText}>
                  Support tickets appear here.
                </Text>
              ) : (
                <ScrollView horizontal={true}>
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>SN</DataTable.Title>
                      <DataTable.Title>Ticket ID</DataTable.Title>
                      <DataTable.Title>User</DataTable.Title>
                      <DataTable.Title>Account ID</DataTable.Title>
                      <DataTable.Title>Username</DataTable.Title>
                      <DataTable.Title>Subject</DataTable.Title>
                      <DataTable.Title>Category</DataTable.Title>
                      <DataTable.Title>Message</DataTable.Title>
                      <DataTable.Title>Status</DataTable.Title>
                      <DataTable.Title>Resolved</DataTable.Title>
                      <DataTable.Title>Created At</DataTable.Title>
                    </DataTable.Header>
                    {currentItems.map((ticket, index) => (
                      <DataTable.Row key={ticket.id}>
                        <DataTable.Cell>{index + 1}</DataTable.Cell>
                        <DataTable.Cell>
                          <Button
                            onPress={() => {
                              clearMessageCounter(ticket.ticket_id);
                              navigation.navigate("Admin Reply Ticket", {
                                ticketId: ticket.ticket_id,
                              });
                            }}
                          >
                            #{ticket.ticket_id}
                          </Button>
                        </DataTable.Cell>
                        <DataTable.Cell>{ticket.email}</DataTable.Cell>
                        <DataTable.Cell>{ticket.account_id}</DataTable.Cell>
                        <DataTable.Cell>{ticket.user_username}</DataTable.Cell>
                        <DataTable.Cell>{ticket.subject}</DataTable.Cell>
                        <DataTable.Cell>{ticket.category}</DataTable.Cell>
                        <DataTable.Cell>{ticket.message}</DataTable.Cell>
                        <DataTable.Cell>
                          {ticket.is_closed ? (
                            <Text style={{ color: "red" }}>Closed</Text>
                          ) : (
                            <Text style={{ color: "green" }}>Active</Text>
                          )}
                        </DataTable.Cell>
                        <DataTable.Cell>
                          {ticket.is_resolved ? (
                            <Text style={{ color: "green" }}>Resolved</Text>
                          ) : (
                            <Text style={{ color: "red" }}>Not Resolved</Text>
                          )}
                        </DataTable.Cell>
                        <DataTable.Cell>
                          {new Date(ticket.created_at).toLocaleString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                          })}
                        </DataTable.Cell>
                      </DataTable.Row>
                    ))}
                  </DataTable>
                </ScrollView>
              )}
              <View style={styles.pagination}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(tickets.length / itemsPerPage)}
                  paginate={paginate}
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  icon: {
    fontSize: 20,
  },
  noTicketsText: {
    textAlign: "center",
    paddingTop: 10,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default AdminSupportTicket;
