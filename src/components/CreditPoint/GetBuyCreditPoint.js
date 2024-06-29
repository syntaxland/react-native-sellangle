// GetBuyCreditPoint.js
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCreditCard,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { getUserBuyCreditPoint } from "../../redux/actions/creditPointActions";
import Message from "../../Message";
import Loader from "../../Loader";
import { DataTable } from "react-native-paper";
import { Pagination } from "../../Pagination";
import { formatAmount } from "../../FormatAmount";

const GetBuyCreditPoint = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const getBuyCreditPointState = useSelector(
    (state) => state.getBuyCreditPointState
  );
  const { loading, creditPoints, error } = getBuyCreditPointState;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = creditPoints?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(creditPoints?.length / itemsPerPage);

  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getUserBuyCreditPoint());
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserBuyCreditPoint());
  }, [dispatch]);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
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
            <FontAwesomeIcon icon={faCreditCard} /> Bought/Funded CPS List (NGN)
          </Text>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {currentItems.length === 0 ? (
                <Text style={styles.noData}>Bought cps appear here.</Text>
              ) : (
                <ScrollView horizontal={true}>
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title style={styles.snHeaderCell}>
                        SN
                      </DataTable.Title>
                      <DataTable.Title style={styles.headerCell}>
                        CPS ID
                      </DataTable.Title>
                      <DataTable.Title style={styles.headerCell}>
                        User
                      </DataTable.Title>
                      <DataTable.Title style={styles.headerCell}>
                        Amount Paid
                      </DataTable.Title>
                      <DataTable.Title style={styles.headerCell}>
                        CPS Amount
                      </DataTable.Title>
                      <DataTable.Title style={styles.headerCell}>
                        Old Balance
                      </DataTable.Title>
                      <DataTable.Title style={styles.headerCell}>
                        New Balance
                      </DataTable.Title>
                      <DataTable.Title style={styles.headerCell}>
                        Success
                      </DataTable.Title>
                      <DataTable.Title style={styles.headerCell}>
                        Created At
                      </DataTable.Title>
                    </DataTable.Header>

                    {currentItems.map((cps, index) => (
                      <DataTable.Row key={cps.id}>
                        <DataTable.Cell style={styles.snCell}>
                          {indexOfFirstItem + index + 1}
                        </DataTable.Cell>
                        <DataTable.Cell style={styles.cell}>
                          <ScrollView horizontal>
                            <Text>{cps.cps_purchase_id}</Text>
                          </ScrollView>
                        </DataTable.Cell>
                        <DataTable.Cell style={styles.cell}>
                          <ScrollView horizontal>
                            <Text>{cps.username}</Text>
                          </ScrollView>
                        </DataTable.Cell>
                        <DataTable.Cell style={styles.cell}>
                          <ScrollView horizontal>
                            <Text>NGN {formatAmount(cps.amount)}</Text>
                          </ScrollView>
                        </DataTable.Cell>
                        <DataTable.Cell style={styles.cell}>
                          <ScrollView horizontal>
                            <Text style={{ color: "green" }}>
                              {formatAmount(cps.cps_amount)}
                            </Text>
                          </ScrollView>
                        </DataTable.Cell>
                        <DataTable.Cell style={styles.cell}>
                          <ScrollView horizontal>
                            <Text>{formatAmount(cps.old_bal)}</Text>
                          </ScrollView>
                        </DataTable.Cell>
                        <DataTable.Cell style={styles.cell}>
                          <ScrollView horizontal>
                            <Text>{formatAmount(cps.new_bal)}</Text>
                          </ScrollView>
                        </DataTable.Cell>
                        <DataTable.Cell style={styles.cell}>
                          <ScrollView horizontal>
                            {cps.is_success ? (
                              <Text style={{ color: "green" }}>
                                <FontAwesomeIcon
                                  color="green"
                                  icon={faCheckCircle}
                                  // size={styles.iconSize}
                                  // style={styles.icon}
                                />{" "}
                                Yes
                              </Text>
                            ) : (
                              <Text style={{ color: "red" }}>
                                <FontAwesomeIcon
                                  color="red"
                                  icon={faTimesCircle}
                                  // size={styles.iconSize}
                                  // style={styles.icon}
                                />{" "}
                                No
                              </Text>
                            )}
                          </ScrollView>
                        </DataTable.Cell>
                        <DataTable.Cell style={styles.cell}>
                          <ScrollView horizontal>
                            <Text>
                              {new Date(cps.created_at).toLocaleString(
                                "en-US",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "numeric",
                                  second: "numeric",
                                }
                              )}
                            </Text>
                          </ScrollView>
                        </DataTable.Cell>
                      </DataTable.Row>
                    ))}
                  </DataTable>
                </ScrollView>
              )}

              <View style={styles.pagination}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  paginate={handlePagination}
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
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  noData: {
    textAlign: "center",
    marginVertical: 20,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  headerCell: {
    width: 150,
    marginLeft: 20,
    borderRightWidth: 1,
    borderColor: "black",
  },
  cell: {
    width: 150,
    marginLeft: 10,
  },
  snHeaderCell: {
    width: 50,
    borderRightWidth: 1,
    borderColor: "black",
  },
  snCell: {
    width: 50,
  },
});

export default GetBuyCreditPoint;
 