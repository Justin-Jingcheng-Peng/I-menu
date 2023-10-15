import {
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { User } from "../types";
import { Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Alert } from "react-native";
import {
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from "../utils/fieldValidation";
import { doesUsernameExist } from "../utils/db";
const Signup = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const auth = FIREBASE_AUTH;
  const [isKeyBoardShown, setIsKeyBoardShown] = React.useState(false);
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
  const signUp = async () => {
    setLoading(true);
    if (isValidEmail(email) == false) {
      Alert.alert("Sign Up Failed", "Please enter a valid email!");
      setLoading(false);
      return;
    }
    if (isValidPassword(password) == false) {
      Alert.alert(
        "Sign Up Failed",
        "Please enter a valid password that is at least 6 characters long"
      );
      setLoading(false);
      return;
    }
    if (isValidUsername(username.trim()) == false) {
      Alert.alert(
        "Sign Up Failed",
        "Please enter a valid username that meets the following criteria:\n\n" +
          "1. Can contain only letters (uppercase or lowercase), numbers, underscores, and hyphens.\n" +
          "2. Must be between 3 and 20 characters long."
      );
      setLoading(false);
      return;
    }
    const userNameExist = await doesUsernameExist(username.trim());
    if (userNameExist) {
      Alert.alert(
        "Sign Up Failed",
        "The username you entered already exists. Please choose a different one."
      );
      setLoading(false);
      return;
    }

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await sendEmailVerification(auth.currentUser!);
      const user: User = {
        uid: response.user.uid,
        email: response.user.email!,
        username: username.trim(),
        Ingredients: [],
        medicalHistories: [],
        height: null,
        weight: null,
        religion: null,
        age: null,
        gender: null,
      };
      setEmail("");
      setPassword("");
      setUsername("");
      await setDoc(doc(FIREBASE_DB, "users", response.user.uid), user);
      Keyboard.dismiss();
      await signOut(auth);
      Alert.alert(
        "Email Verification",
        "Please check your email to complete the verification process!"
      );
    } catch (e: any) {
      Alert.alert("Sign Up Failed", "Your email is already registered.");
    }
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient
        // Gradient colors
        colors={["#50EACD", "#FAFF71"]}
        style={styles.container}
      >
        <View
          style={[
            styles.contentWrapper,
            { top: isKeyBoardShown && Platform.OS === "ios" ? "5%" : "15%" },
          ]}
        >
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>Create a free account or log in</Text>
          <TextInput
            value={email}
            style={styles.input}
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
          <TextInput
            value={username}
            style={styles.input}
            placeholder="Username"
            autoCapitalize="none"
            onChangeText={(text) => setUsername(text)}
          ></TextInput>
          <View style={styles.buttonWrapper}>
            {loading ? (
              <ActivityIndicator size="large" color="blue" />
            ) : (
              <>
                <Button
                  buttonStyle={styles.button}
                  title="Create an account"
                  titleStyle={styles.buttonText}
                  onPress={() => signUp()}
                />
              </>
            )}
          </View>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: hp("1%"),
    marginBottom: hp("5%"),
  },
  contentWrapper: {
    flexDirection: "column",
    alignItems: "center",
    top: "20%",
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
    marginBottom: 20,
  },
  button: {
    borderRadius: 30,
    height: 48,
    width: 187,
    backgroundColor: "#7FFFC6",
  },
  buttonText: {
    color: "#333333",
    fontWeight: "bold",
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 0,
    elevation: 1,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 1 },
  },
});
