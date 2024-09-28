// IdleLogout.js
import React, { useEffect, useCallback, useRef } from "react";
import { AppState, TouchableWithoutFeedback } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { logout } from "./redux/actions/userActions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IdleLogout = ({ children }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { userInfo } = useSelector((state) => state.userLogin);

  const idleTimeout = useRef(null);
  const appState = useRef(AppState.currentState);

  const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 minutes
  // const INACTIVITY_LIMIT = 1 * 60 * 1000; // 2 minutes for testing

  const handleLogout = useCallback(async () => {
    await AsyncStorage.removeItem("userInfo");
    dispatch(logout());
    navigation.navigate("Login"); // Ensure 'Login' route exists in your navigator
  }, [dispatch, navigation]);

  const resetIdleTimer = useCallback(() => {
    if (idleTimeout.current) {
      clearTimeout(idleTimeout.current);
    }

    idleTimeout.current = setTimeout(() => {
      handleLogout();
    }, INACTIVITY_LIMIT);
  }, [handleLogout]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        resetIdleTimer();
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);

    if (userInfo) {
      resetIdleTimer();
    }

    return () => {
      subscription.remove(); 
      clearTimeout(idleTimeout.current);
    };
  }, [userInfo, resetIdleTimer]);

  return (
    <TouchableWithoutFeedback onPress={resetIdleTimer}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default IdleLogout;
