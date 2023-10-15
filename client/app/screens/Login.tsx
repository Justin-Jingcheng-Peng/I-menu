import {
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Keyboard,
  Platform,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

import { getUserByEmail } from "../utils/db";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Text } from "react-native";
import LongButton from "../components/LongButton";
const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const auth = FIREBASE_AUTH;
  const [isKeyBoardShown, setIsKeyBoardShown] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyBoardShown(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyBoardShown(false);
      }
    );

    // Cleanup subscriptions
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const signIn = async () => {
    setLoading(true);

    try {
      const user1 = await getUserByEmail(email);

      if (user1 === null) {
        Alert.alert("Login Failed", "This email is not registered.");
        setLoading(false);
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      console.log(e);
      Alert.alert("Login Failed", "Please check your email and password.");
    }
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient
        colors={["#FAFF71", "#50EACD", "#FFFFFF", "#FFFFFF"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        <View style={styles.contentWrapper}>
          <Text style={[styles.title, { marginBottom: hp("6%") }]}>Login</Text>
          <TextInput
            value={email}
            style={[styles.input, { marginBottom: hp("6%") }]}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          ></TextInput>
          <TextInput
            secureTextEntry={true}
            value={password}
            style={styles.input}
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
          ></TextInput>
          <Text
            style={styles.forgotPasswordText}
            onPress={() => {
              navigation.navigate("ResetPassword");
            }}
          >
            Forget Your Password?
          </Text>
          {(!isKeyBoardShown || Platform.OS === "ios") && (
            <View style={styles.buttonView}>
              {loading ? (
                <ActivityIndicator size="large" color="blue" />
              ) : (
                <>
                  <LongButton title="Login" onPress={() => signIn()} />
                  <LongButton
                    title="Sign up"
                    onPress={() => {
                      navigation.navigate("Signup");
                    }}
                  />
                </>
              )}
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
  },
  contentWrapper: {
    flexDirection: "column",
    alignItems: "center",
    top: "15%",
    width: "100%",
    height: "70%",
    position: "absolute",
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
    width: "80%",
  },
  buttonView: {
    width: "80%",
    height: 120,
    position: "absolute",
    bottom: "10%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgotPasswordText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333", // You can specify your desired color here
    marginTop: 10, // Spacing from the top
    textDecorationLine: "underline", // Adds an underline
  },
});
