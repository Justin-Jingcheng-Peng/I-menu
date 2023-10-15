import React, { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { PaperProvider } from "react-native-paper";
import { updateUserFields } from "../../utils/db";
import { updateCurrentUser } from "../../store/features/currentUserSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { InsideRootStackParamList } from "../../types";
import LongButton from "../../components/LongButton";
import ChangeUserInfoBackground from "../../components/wrapper/ChangeUserInfoBackground";
import DropDown from "../../components/DropDown";
type Props = NativeStackScreenProps<InsideRootStackParamList, "UpdateAge">;
const UpdateAge = ({ navigation }: Props) => {
  const possibleAges = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
    "60",
    "61",
    "62",
    "63",
    "64",
    "65",
    "66",
    "67",
    "68",
    "69",
    "70",
    "71",
    "72",
    "73",
    "74",
    "75",
    "76",
    "77",
    "78",
    "79",
    "80",
    "81",
    "82",
    "83",
    "84",
    "85",
    "86",
    "87",
    "88",
    "89",
    "90",
    "91",
    "92",
    "93",
    "94",
    "95",
    "96",
    "97",
    "98",
    "99",
    "100",
    "101",
    "102",
    "103",
    "104",
    "105",
    "106",
    "107",
    "108",
    "109",
    "110",
  ];

  // For the selector (inside the modal)
  const [value, setValue] = useState("");
  // For the modal
  const [isFocus, setIsFocus] = useState(false);
  const dropDownItems = possibleAges.map((age) => ({
    label: `${age} years old`,
    value: age,
  }));
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: any) => state.currentUser.currentUser
  );
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    setValue(String(currentUser!.age));
  }, []);
  const handleUpdate = async () => {
    const updatedField = { age: parseInt(value, 10) };
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

export default UpdateAge;
