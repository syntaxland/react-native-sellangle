// Billing.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Button,
  Modal,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getSellerPaidAdCharges } from "../../redux/actions/marketplaceSellerActions";
import { getUserProfile } from "../../redux/actions/userProfileActions";
import { DataTable } from "react-native-paper";
import AdChargeCalculator from "./AdChargeCalculator";
import PayAdCharges from "./PayAdCharges";
import BillingPeriod from "./BillingPeriod";
import { formatAmount } from "../../FormatAmount";
import { formatHour } from "../../formatHour";
import Loader from "../../Loader";
import Message from "../../Message";
import { Pagination } from "../../Pagination";

const Billing = () => {
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
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile());
    }
  }, [dispatch, userInfo]);

  const getSellerPaidAdChargesState = useSelector(
    (state) => state.getSellerPaidAdChargesState
  );
  const { loading, error, paidAdCharges, totalAdCharges } =
    getSellerPaidAdChargesState;

  const currentDate = new Date();
  const monthYear = currentDate?.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [payAdChargesModal, setBuyPayAdChargesModal] = useState(false);
  const handlePayAdChargesOpen = () => {
    setBuyPayAdChargesModal(true);
  };
  const handlePayAdChargesClose = () => {
    setBuyPayAdChargesModal(false);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = paidAdCharges?.slice(indexOfFirstItem, indexOfLastItem);

  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getSellerPaidAdCharges());
    wait(2000).then(() => setRefreshing(false));
  };

  useEffect(() => {
    dispatch(getSellerPaidAdCharges());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.container}>
            <Text style={styles.title}>Billing</Text>
            <Text style={styles.subtitle}>Current Bills ({monthYear})</Text>

            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <>
                {currentItems?.length === 0 ? (
                  <Text style={styles.noItems}>Ad charges appear here.</Text>
                ) : (
                  <>
                    <ScrollView horizontal={true}>
                      <DataTable>
                        <DataTable.Header>
                          <DataTable.Title style={styles.snHeaderCell}>
                            SN
                          </DataTable.Title>
                          <DataTable.Title style={styles.headerCell}>
                            User
                          </DataTable.Title>
                          <DataTable.Title style={styles.headerCell}>
                            Ad
                          </DataTable.Title>
                          <DataTable.Title style={styles.headerCell}>
                            Ad Charges
                          </DataTable.Title>
                        </DataTable.Header>

                        {currentItems?.map((adCharge, index) => (
                          <DataTable.Row key={adCharge.id}>
                            <DataTable.Cell style={styles.snCell}>
                              {indexOfFirstItem + index + 1}
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>
                              {adCharge.username}
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>
                              {adCharge.ad_name}
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>
                              {adCharge.ad_charges} CPS (
                              {adCharge.ad_charge_hours} hours)
                            </DataTable.Cell>
                          </DataTable.Row>
                        ))}
                      </DataTable>
                    </ScrollView>
                    <View style={styles.pagination}>
                      <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(
                          paidAdCharges?.length / itemsPerPage
                        )}
                        paginate={paginate}
                      />
                    </View>
                    <View style={styles.totalCharges}>
                      <Text style={styles.totalChargesText}>
                        Total Ad Charges:{" "}
                        {formatAmount(totalAdCharges?.total_ad_charges)} CPS (
                        {formatHour(totalAdCharges?.total_ad_charge_hours)}{" "}
                        hours)
                      </Text>
                    </View>
                  </>
                )}
              </>
            )}
          </View>
        </ScrollView>

        {profile?.ad_charge_is_owed && (
          <View style={styles.payAdChargesContainer}>
            <Button title="Pay Ad Charges" onPress={handlePayAdChargesOpen} />
          </View>
        )}

        <View style={styles.billingPeriodContainer}>
          <BillingPeriod />
        </View>

        <Modal
          visible={payAdChargesModal}
          onRequestClose={handlePayAdChargesClose}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Pay Ad Charges</Text>
            {payAdChargesModal && (
              <PayAdCharges totalAdCharges={totalAdCharges?.total_ad_charges} />
            )}
            <Button title="Close" onPress={handlePayAdChargesClose} />
          </View>
        </Modal>

        <AdChargeCalculator />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    padding: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  noItems: {
    textAlign: "center",
    marginVertical: 20,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  totalCharges: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  totalChargesText: {
    fontSize: 16,
    fontWeight: "bold",
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
  payAdChargesContainer: {
    padding: 20,
    alignItems: "center",
  },
  billingPeriodContainer: {
    padding: 20,
    // alignItems: "center",
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default Billing;
