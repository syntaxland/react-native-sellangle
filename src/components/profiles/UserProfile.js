// UserProfile.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faExclamationTriangle,
  faUserCheck,
  faUser,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  getUserProfile,
  updateUserProfile,
  updateUserAvatar,
} from "../../redux/actions/userProfileActions";
import { sendEmailOtp } from "../../redux/actions/emailOtpActions";
import { List } from "react-native-paper";

import Message from "../../Message"; 
import Loader from "../../Loader";

function UserProfile() {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfile);
  const { loading: profileLoading, error: profileError, profile } = userProfile;
  console.log("userProfile:", userProfile, "profile:", profile);

  const updateProfile = useSelector((state) => state.updateProfile);
  const { loading, success, error } = updateProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log("userInfo:", userInfo);

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const [successMessage, setSuccessMessage] = useState("");

  const handleAvatarChange = (e) => {
    const avatar = e.target.files[0];
    if (avatar) {
      const formData = new FormData();
      formData.append("avatar", avatar);
      dispatch(updateUserAvatar(formData));
    }
  };

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
  });

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (userProfile && userProfile.profile) {
      setUserData({
        first_name: userProfile.profile.first_name,
        last_name: userProfile.profile.last_name,
        phone_number: userProfile.profile.phone_number,
        avatar: userProfile.profile.avatar,
      });
    }
  }, [userProfile]);

  useEffect(() => {
    if (userInfo) {
      setUserData({
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        phone_number: userInfo.phone_number,
        avatar: userInfo.avatar,
      });
    }
  }, [userInfo]);

  useEffect(() => {
    if (success) {
      setSuccessMessage("Profile updated successfully.");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  }, [success]);

  const handleInputChange = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdateProfile = () => {
    dispatch(updateUserProfile(userData));
  };

  const handleResendEmailOtp = () => {
    dispatch(sendEmailOtp(userInfo.email, userInfo.first_name));
    history.push("/verify-email-otp");
  };

  const handleVerifyEmail = () => {
    if (!userInfo.is_verified) {
      handleResendEmailOtp();
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>
          Profile{" "}
          <FontAwesomeIcon icon={userInfo.is_verified ? faUserCheck : faUser} />
        </Text>

        {loading && <Loader />}
        {profileLoading && <Loader />}

        {successMessage && (
          <Message variant="success">{successMessage}</Message>
        )}

        {error && <Message variant="danger">{error}</Message>}
        {profileError && <Message variant="danger">{error}</Message>}

        <Text>
          Verified{" "}
          <FontAwesomeIcon
            icon={userInfo.is_verified ? faCheckCircle : faTimesCircle}
            style={{ color: userInfo.is_verified ? "white" : "red" }}
          />
        </Text>

        <View style={styles.item}>
          <List.Accordion
            title="Bio"
            left={(props) => <List.Icon {...props} icon="account" />}
          >
            {!userInfo.is_verified && (
              <Button title="Verify Email" onPress={handleVerifyEmail} />
            )}

            <TextInput
              style={styles.input}
              placeholder="Username"
              value={profile.username}
              editable={false}
              onChangeText={(value) => handleInputChange("username", value)}
            />

            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={userData.first_name}
              onChangeText={(value) => handleInputChange("first_name", value)}
            />

            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={userData.last_name}
              onChangeText={(value) => handleInputChange("last_name", value)}
            />

            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={profile.email}
              editable={false}
              onChangeText={(value) => handleInputChange("email", value)}
            />

            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={userData.phone_number}
              onChangeText={(value) => handleInputChange("phone_number", value)}
            />

            <Button
              title="Update Profile"
              onPress={handleUpdateProfile}
              color="green"
            />
          </List.Accordion>
        </View>

        <View style={styles.item}>
          <List.Accordion
            title="Update Avatar"
            left={(props) => <List.Icon {...props} icon="camera" />}
          >
            <TextInput
              style={styles.input}
              placeholder="Avatar"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  warning: {
    color: "orange",
    marginBottom: 10,
  },
});

export default UserProfile;
