import React, { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { PaperProvider } from "react-native-paper";
import { updateUserFields } from "../../utils/db";
import { updateCurrentUser } from "../../store/features/currentUserSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { InsideRootStackParamList } from "../../types";
import Constants from "expo-constants";
import LongButton from "../../components/LongButton";
import ChangeUserInfoBackground from "../../components/wrapper/ChangeUserInfoBackground";
import DropDown from "../../components/DropDown";
const topInset = Constants.statusBarHeight;
type Props = NativeStackScreenProps<InsideRootStackParamList, "UpdateReligion">;
const UpdateReligion = ({ navigation }: Props) => {
  // For the selector (inside the modal)
  const [value, setValue] = useState("");
  // For the modal
  const [isFocus, setIsFocus] = useState(false);
  const possibleSchools = [
    "Christianity",
    "Islam",
    "Hinduism",
    "Buddhism",
    "Judaism",
    "Sikhism",
    "Baha'i Faith",
    "Jainism",
    "Confucianism",
    "Shinto",
    "Taoism",
    "Zoroastrianism",
  ];
  const dropDownItems = possibleSchools.map((school) => ({
    label: school,
    value: school,
  }));

  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: any) => state.currentUser.currentUser
  );
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    setValue(currentUser!.religion);
  }, []);

  const handleUpdate = async () => {
    const updatedField = { religion: value };
    await updateUserFields(updatedField);
    dispatch(updateCurrentUser(updatedField));
    navigation.goBack();
  };

  return (
    <PaperProvider>
      <ChangeUserInfoBackground
        goBack={() => navigation.goBack()}
        showGoBack={true}
      >
        <DropDown
          items={dropDownItems}
          value={value}
          onValueChange={(item: any) => {
            setValue(item.value);
            setIsFocus(false);
          }}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          isFocused={isFocus}
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
    </PaperProvider>
  );
};

const styles = StyleSheet.create({});

export default UpdateReligion;
