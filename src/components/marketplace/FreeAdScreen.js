// // FreeAdScreen.js
// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, FlatList } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { getSellerFreeAd } from "../../redux/actions/marketplaceSellerActions";
// import FreeAdCard from "./FreeAdCard";
// import Message from "../../Message";
// import Loader from "../../Loader";
// import { Pagination } from "../../Pagination";

// const FreeAdScreen = () => {
//   const dispatch = useDispatch();

//   const getFreeAdState = useSelector((state) => state.getFreeAdState);
//   const { loading, error, ads } = getFreeAdState;
//   console.log("Free Ads screen:", ads);

//   useEffect(() => {
//     dispatch(getSellerFreeAd());
//   }, [dispatch]);

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = ads?.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(ads?.length / itemsPerPage);

//   const handlePagination = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Running Ads</Text>
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">{error}</Message>
//       ) : (
//         <>
//           {currentItems?.length === 0 ? (
//             <Text style={styles.noData}>Running ads appear here.</Text>
//           ) : (
//             <FlatList
//               data={currentItems}
//               renderItem={({ item }) => (
//                 <View style={styles.card}>
//                   <FreeAdCard product={item} />
//                 </View>
//               )}
//               keyExtractor={(item) => item.id.toString()}
//               contentContainerStyle={styles.cardContainer}
//             />
//           )}
//           <View style={styles.pagination}>
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               paginate={handlePagination}
//             />
//           </View>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginVertical: 10,
//     textAlign: "center",
//   },
//   noData: {
//     textAlign: "center",
//     marginVertical: 20,
//   },
//   cardContainer: {
//     justifyContent: "space-around",
//   },
//   card: {
//     marginVertical: 10,
//     width: "100%",
//   },
//   pagination: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 20,
//   },
// });

// export default FreeAdScreen;

// FreeAdScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getSellerFreeAd } from "../../redux/actions/marketplaceSellerActions";
import FreeAdCard from "./FreeAdCard";
import Message from "../../Message";
import Loader from "../../Loader";
import { Pagination } from "../../Pagination";

const FreeAdScreen = () => {
  const dispatch = useDispatch();

  const getFreeAdState = useSelector((state) => state.getFreeAdState);
  const { loading, error, ads } = getFreeAdState;

  useEffect(() => {
    dispatch(getSellerFreeAd());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ads?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(ads?.length / itemsPerPage);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Running Ads</Text>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {currentItems?.length === 0 ? (
            <Text style={styles.noData}>Running ads appear here.</Text>
          ) : (
            <View style={styles.cardContainer}>
              {currentItems?.map((product) => (
                <View key={product.id} style={styles.card}>
                  <FreeAdCard product={product} />
                </View>
              ))}
            </View>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  card: {
    width: "100%",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  spaceBtwGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 2,
  },
  spaceBtwElement: {
    padding: 10,
  },
});

export default FreeAdScreen;

