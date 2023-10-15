import { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  View,
} from "react-native";
import { updateUserFields } from "../../utils/db";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../../store/features/currentUserSlice";
import { useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { InsideRootStackParamList } from "../../types";
import LongButton from "../../components/LongButton";
import { doesUsernameExist } from "../../utils/db";
import { isValidUsername } from "../../utils/fieldValidation";
import Constants from "expo-constants";
import ChangeUserInfoBackground from "../../components/wrapper/ChangeUserInfoBackground";
import InputBox from "../../components/TextInput";
const topInset = Constants.statusBarHeight;

type Props = NativeStackScreenProps<InsideRootStackParamList, "UpdateUsername">;

const UpdateUsername = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: any) => state.currentUser.currentUser
  );
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [username, setUsername] = useState<string>(() => currentUser.username);

  const handleUpdate = async () => {
    if (isValidUsername(username) === false) {
      Alert.alert(
        "Change Name Failed",
        "Please enter a valid username that meets the following criteria:\n\n" +
          "1. Can contain only letters (uppercase or lowercase), numbers, underscores, and hyphens.\n" +
          "2. Must be between 3 and 20 characters long."
      );
      return;
    }
    const doesExist = await doesUsernameExist(username);
    if (doesExist === true) {
      if (username === currentUser!.username) {
        Alert.alert(
          "Change Name Failed",
          "The username you entered must be different from your previous name."
        );
        return;
      }
      Alert.alert(
        "Change Name Failed",
        "The username you entered already exists. Please choose a different one."
      );
      return;
    }

    const updatedField = { username: username };
    await updateUserFields(updatedField);
    dispatch(updateCurrentUser(updatedField));
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ChangeUserInfoBackground
        goBack={() => navigation.goBack()}
        showGoBack={true}
      >
        <InputBox
          onChangeText={setUsername}
          value={username}
          placeholder="Enter your username"
        />
        <View
          style={{
            position: "absolute",
            top: "50%",
          }}
        >
          <LongButton
            title="Submit"
            onPress={() => {
              handleUpdate();
            }}
          />
        </View>
      </ChangeUserInfoBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  goBackButton: {
    position: "absolute",
    top: topInset + 10,
    left: 10,
    width: 30,
    height: 30,
    backgroundColor: "#FDDD3D",
  },
});

export default UpdateUsername;
