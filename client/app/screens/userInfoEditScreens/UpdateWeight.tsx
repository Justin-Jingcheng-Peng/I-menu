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
type Props = NativeStackScreenProps<InsideRootStackParamList, "UpdateWeight">;
const UpdateWeight = ({ navigation }: Props) => {
  const possibleWeights = [
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
    "111",
    "112",
    "113",
    "114",
    "115",
    "116",
    "117",
    "118",
    "119",
    "120",
    "121",
    "122",
    "123",
    "124",
    "125",
    "126",
    "127",
    "128",
    "129",
    "130",
    "131",
    "132",
    "133",
    "134",
    "135",
    "136",
    "137",
    "138",
    "139",
    "140",
    "141",
    "142",
    "143",
    "144",
    "145",
    "146",
    "147",
    "148",
    "149",
    "150",
    "151",
    "152",
    "153",
    "154",
    "155",
    "156",
    "157",
    "158",
    "159",
    "160",
    "161",
    "162",
    "163",
    "164",
    "165",
    "166",
    "167",
    "168",
    "169",
    "170",
    "171",
    "172",
    "173",
    "174",
    "175",
    "176",
    "177",
    "178",
    "179",
    "180",
    "181",
    "182",
    "183",
    "184",
    "185",
    "186",
    "187",
    "188",
    "189",
    "190",
    "191",
    "192",
    "193",
    "194",
    "195",
    "196",
    "197",
    "198",
    "199",
    "200",
  ];

  // For the selector (inside the modal)
  const [value, setValue] = useState("");
  // For the modal
  const [isFocus, setIsFocus] = useState(false);
  const dropDownItems = possibleWeights.map((weight) => ({
    label: `${weight} kg`,
    value: weight,
  }));
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: any) => state.currentUser.currentUser
  );
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    setValue(String(currentUser!.weight));
  }, []);
  const handleUpdate = async () => {
    const updatedField = { weight: parseInt(value, 10) };
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

export default UpdateWeight;
