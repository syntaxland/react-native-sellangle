// ViewedPaidAds.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUserPaidAdsViews } from "../../redux/actions/marketplaceSellerActions";
import AllPaidAdCard from "./AllPaidAdCard";
import Message from "../../Message";
import Loader from "../../Loader";
import { Pagination } from "../../Pagination";

const ViewedPaidAds = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserPaidAdsViews());
  }, [dispatch]);

  const getUserViewedPaidAdsState = useSelector(
    (state) => state.getUserViewedPaidAdsState
  );
  const { loading, error, viewedAds } = getUserViewedPaidAdsState;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = viewedAds?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Promoted Ads</Text>
      </View>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {currentItems?.length === 0 ? (
            <View style={styles.emptyMessage}>
              <Text>Viewed promoted ads appear here.</Text>
            </View>
          ) : (
            <View style={styles.adsContainer}>
              {currentItems?.map((product) => (
                <View key={product.id} style={styles.adCard}>
                  <AllPaidAdCard product={product} />
                </View>
              ))}
            </View>
          )}
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={viewedAds?.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  header: {
    alignItems: "center",
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  emptyMessage: {
    alignItems: "center",
    marginVertical: 20,
  },
  adsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  adCard: {
    flexBasis: "98%",
    marginBottom: 20,
  },
});

export default ViewedPaidAds;

// // ViewedPaidAds.js
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   ActivityIndicator,
//   TouchableOpacity,
// } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { getUserPaidAdsViews } from "../../redux/actions/marketplaceSellerActions";
// import Message from "../../Message";
// import AllPaidAdCard from "./AllPaidAdCard";

// const ViewedPaidAds = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getUserPaidAdsViews());
//   }, [dispatch]);

//   const getUserViewedPaidAdsState = useSelector(
//     (state) => state.getUserViewedPaidAdsState
//   );
//   const { loading, error, viewedAds } = getUserViewedPaidAdsState;

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = viewedAds?.slice(indexOfFirstItem, indexOfLastItem);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Promoted Ads</Text>
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : error ? (
//         <Message variant="danger">{error}</Message>
//       ) : (
//         <>
//           {currentItems.length === 0 ? (
//             <Text style={styles.message}>Viewed promoted ads appear here.</Text>
//           ) : (
//             <FlatList
//               data={currentItems}
//               renderItem={({ item }) => (
//                 <View style={styles.card}>
//                   <AllPaidAdCard product={item} />
//                 </View>
//               )}
//               keyExtractor={(item) => item._id}
//               numColumns={2}
//               contentContainerStyle={styles.list}
//             />
//           )}
//           <View style={styles.pagination}>
//             {Array.from(
//               { length: Math.ceil(viewedAds?.length / itemsPerPage) },
//               (_, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   onPress={() => paginate(index + 1)}
//                 >
//                   <Text style={styles.pageNumber}>{index + 1}</Text>
//                 </TouchableOpacity>
//               )
//             )}
//           </View>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 2,
//   },
//   title: {
//     fontSize: 24,
//     textAlign: "center",
//     paddingVertical: 10,
//   },
//   message: {
//     textAlign: "center",
//     paddingVertical: 10,
//   },
//   list: {
//     paddingBottom: 20,
//   },
//   card: {
//     flex: 1,
//     margin: 10,
//   },
//   pagination: {
//     flexDirection: "row",
//     justifyContent: "center",
//     paddingVertical: 10,
//   },
//   pageNumber: {
//     margin: 5,
//     padding: 5,
//     fontSize: 16,
//   },
// });

// export default ViewedPaidAds;
