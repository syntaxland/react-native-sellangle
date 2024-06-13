// DashboardSeller.js
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Dimensions,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faDashboard,
  faEye,
  faHeart,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { LineChart, PieChart } from "react-native-chart-kit";
import {
  getSellerAdStatistics,
  getSellerDetail,
} from "../../redux/actions/marketplaceSellerActions";
import Message from "../../Message";
import Loader from "../../Loader";

function DashboardSeller() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

  const getSellerAdStatState = useSelector(
    (state) => state.getSellerAdStatState
  );
  const { loading, error, totalSellerAdsViews, totalSellerAdSaved, totalFollwersCount } =
    getSellerAdStatState;

  const getSellerDetailState = useSelector(
    (state) => state.getSellerDetailState
  );
  const { sellerDetail } = getSellerDetailState;

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(getSellerAdStatistics());
      dispatch(getSellerDetail());
      setRefreshing(false);
    }, 2000);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSellerAdStatistics());
    dispatch(getSellerDetail());
  }, [dispatch]);

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ["Rainy Days"],
  };

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const pieChartData = [
    {
      name: "Seoul",
      population: 21500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Beijing",
      population: 527612,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "New York",
      population: 8538000,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <Text style={styles.title}>
          <FontAwesomeIcon
            icon={faDashboard}
            style={styles.icon}
          />{" "}
          Dashboard (Seller)
        </Text>
        <View>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <View style={styles.statsContainer}>
                <Text>
                  <FontAwesomeIcon icon={faEye} style={styles.icon} /> Total
                  Views: {totalSellerAdsViews}
                </Text>
                <Text>
                  <FontAwesomeIcon icon={faHeart} style={styles.icon} /> Total
                  Likes: {totalSellerAdSaved}
                </Text>
                <Text>
                  <FontAwesomeIcon icon={faPeopleGroup} style={styles.icon} />{" "}
                  Total Followers: {totalFollwersCount}
                </Text>
              </View>
              <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Ads Views</Text>
                <LineChart
                  data={data}
                  width={screenWidth}
                  height={220}
                  chartConfig={chartConfig}
                />
              </View>
              <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Saved</Text>
                <PieChart
                  data={pieChartData}
                  width={screenWidth}
                  height={220}
                  chartConfig={chartConfig}
                  accessor={"population"}
                  backgroundColor={"transparent"}
                  paddingLeft={"15"}
                  center={[10, 50]}
                  absolute
                />
              </View>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  statsContainer: {
    marginBottom: 20,
  },
  chartContainer: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default DashboardSeller;
