// logoutAction.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_LOGOUT, RESET_SUCCESS_STATE } from "../constants/userConstants";
import { navigationRef } from "../../navigation/navigationRef";

export const logout = () => async (dispatch) => {
  try {
    // Clear AsyncStorage
    await AsyncStorage.removeItem("userInfo");

    // Dispatch logout action
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: RESET_SUCCESS_STATE });

    // Navigate to the login screen
    if (navigationRef.isReady()) {
      navigationRef.navigate("Login");
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
