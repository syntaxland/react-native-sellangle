// Settings.js
import React from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faExclamationTriangle,
  faSun,
  faMoon,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { List } from "react-native-paper";
import Message from "../../Message";
import Loader from "../../Loader";

function Settings() {
  // Replace useSelector and useHistory with equivalent React Native functionality if needed
  // const updateProfile = useSelector((state) => state.updateProfile);
  // const { loading, error } = updateProfile;

  // const history = useHistory();

  const handleDeleteAccount = () => {
    // Navigate to delete account screen
  };

  const handleChangePassword = () => {
    // Navigate to change password screen
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>
          <FontAwesomeIcon icon={faGear} /> Settings
        </Text>

        {/* Loader and error message components */}
        {/* Replace with equivalent React Native components */}

        <View style={styles.item}>
          <List.Accordion title="Dark Mode">
            <TouchableOpacity>
              <Text>
                <FontAwesomeIcon icon={faSun} /> Light
              </Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text>
                <FontAwesomeIcon icon={faMoon} /> Dark
              </Text>
            </TouchableOpacity>
          </List.Accordion>
        </View>

        <View style={styles.item}>
          <List.Accordion title="Change Password">
            {/* Add your change password form */}
            <Button title="Change Password" onPress={handleChangePassword} />
          </List.Accordion>
        </View>

        <View style={styles.item}>
          <List.Accordion title="Delete Account">
            <Text style={styles.warning}>
              <FontAwesomeIcon icon={faExclamationTriangle} /> Warning! This
              action is irreversible and all your data will be deleted from our
              database.
            </Text>
            <Button
              title="Delete Account"
              onPress={handleDeleteAccount}
              color="red"
            />
          </List.Accordion>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 20,
  },
  item: {
    marginBottom: 20,
  },
  warning: {
    color: "orange",
    marginBottom: 10,
  },
});

export default Settings;
