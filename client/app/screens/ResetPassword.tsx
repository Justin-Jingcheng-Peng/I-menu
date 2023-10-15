import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LongButton from "../components/LongButton";
const ResetPassword = () => {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const auth = FIREBASE_AUTH;

  const resetPassword = async () => {
    if (!email) {
      Alert.alert("Reset Failed", "Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Success",
        "Password reset email sent. Please check your inbox."
      );
    } catch (error: any) {
      Alert.alert("Reset Failed", "Please enter a valid email address.");
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#F6FFC8", "#FEFC66", "#FFFFFF", "#FFFFFF"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        <View style={styles.contentWrapper}>
          <TextInput
            value={email}
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          ></TextInput>
          <View style={styles.buttonWrapper}>
            {loading ? (
              <ActivityIndicator size="large" color="blue" />
            ) : (
              <>
                <LongButton
                  title="Reset Password"
                  onPress={() => {
                    resetPassword();
                  }}
                />
              </>
            )}
          </View>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  contentWrapper: {
    width: wp("80%"),
    height: hp("20%"),
    marginTop: wp("35%"),
    justifyContent: "space-between",
  },
  input: {
    height: hp("7%"),
    borderWidth: wp("0.3%"),
    borderRadius: wp("1%"),
    padding: wp("3%"),
    backgroundColor: "#fff",
  },
  buttonWrapper: {
    alignItems: "center",
    elevation: 1,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 1 },
  },
});
