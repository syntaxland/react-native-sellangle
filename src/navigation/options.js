import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Image, View } from "react-native";
import styles from "../HeaderStyles";
import logoImage from "../../assets/logo.png";

export const navOptions = (nav) => {
  return {
    headerTintColor: "#cbd5e1",
    headerStyle: {
      backgroundColor: "#007bff",
    },
    headerRight: () => (
      <View style={{ flexDirection: "row", alignItems: "center", marginRight: 15 }}>
        <TouchableOpacity
          style={{ marginRight: 35 }}
          onPress={() => nav.navigate("Search Results")}
        >
          <View style={styles.cartIcon}>
            <Ionicons
              name="search"
              size={24}
              color="white"
              style={styles.cartIcon}
            />
          </View>
        </TouchableOpacity>

        <Ionicons
          name="menu"
          size={32}
          color="white"
          onPress={() => nav.toggleDrawer()}
        />
      </View>
    ),
    headerLeft: () => (
      <TouchableOpacity onPress={() => nav.navigate("Home")}>
        <Image source={logoImage} style={styles.logo} />
      </TouchableOpacity>
    ),
  };
};
