import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Image } from "react-native";
import styles from "../HeaderStyles";
import logoImage from "../../assets/logo.png"; 
// import logoImage from "./images/logo.png";

export const navOptions = (nav) => {
  return {
    headerTintColor: "#cbd5e1",
    headerStyle: {
      backgroundColor: "#007bff",
    },
    headerRight: () => (
      <Ionicons
        name="menu"
        size={32}
        color="white"
        onPress={() => nav.toggleDrawer()}
      />
    ),
    headerLeft: () => (
      <TouchableOpacity onPress={() => nav.navigate("Home")}>
        <Image 
        source={logoImage}
        // accessibilityLabel="Sellangle Logo"
         style={styles.logo} /> 
      </TouchableOpacity>
    ),
  };
};
