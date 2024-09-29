// // LogoutHandler.js
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { navigationRef } from "./navigation/navigationRef";
// import { logout } from "./redux/actions/logoutAction";
// import { resetSuccessState } from "./redux/actions/userActions";
// const LogoutHandler = (store) => {
//   const handleLogout = async () => {
//     try {
//       await AsyncStorage.removeItem("userInfo");

//       store.dispatch(logout());
//       store.dispatch(resetSuccessState());

//       if (navigationRef.isReady()) {
//         navigationRef.navigate("Login");
//       }
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };

//   return { handleLogout };
// };

// export default LogoutHandler;
