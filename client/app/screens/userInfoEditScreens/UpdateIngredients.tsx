import React, { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Text, PaperProvider, IconButton } from "react-native-paper";
import { updateUserFields } from "../../utils/db";
import { updateCurrentUser } from "../../store/features/currentUserSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { InsideRootStackParamList } from "../../types";
import { Ingredient } from "../../types";
import Ingredients from "../../jsonData/Ingredients.json";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LongButton from "../../components/LongButton";
import ChangeUserInfoBackground from "../../components/wrapper/ChangeUserInfoBackground";
import DropDown from "../../components/DropDown";

type Props = NativeStackScreenProps<
  InsideRootStackParamList,
  "UpdateIngredients"
>;
const UpdateIngredients = ({ route, navigation }: Props) => {
  // For the selector (inside the modal)
  const [value, setValue] = useState("");
  // For the modal
  const [isFocus, setIsFocus] = useState(false);
  const imported = Object.keys(Ingredients).map((key) => {
    return {
      id: key,
      name: (Ingredients as any).name,
    };
  });
  const dropDownItems = imported.map((item) => ({
    label: item.id,
    value: item.id,
  }));
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: any) => state.currentUser.currentUser
  );
  const handleUpdate = async () => {
    if (
      value &&
      !currentUser?.Ingredients?.some(
        (course: Ingredient) => course.id === value
      )
    ) {
      const newCourse: Ingredient = {
        id: value,
        name: (Ingredients as any)[value].name,
      };
      const updatedIngredients = [...currentUser.Ingredients, newCourse];
      dispatch(updateCurrentUser({ Ingredients: updatedIngredients }));
      await updateUserFields({
        Ingredients: updatedIngredients,
      });
    }
  };
  const handleDelete = async (courseToDelete: string) => {
    const updatedIngredients = currentUser?.Ingredients?.filter(
      (course: Ingredient) => course.id !== courseToDelete
    );

    if (updatedIngredients) {
      dispatch(updateCurrentUser({ Ingredients: updatedIngredients }));
      await updateUserFields({
        Ingredients: updatedIngredients,
      });
    }
  };
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <PaperProvider>
      <ChangeUserInfoBackground
        goBack={() => navigation.goBack()}
        showGoBack={true}
      >
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Ingredients</Text>
        </View>

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
        <View style={styles.longButtonWrapper}>
          <LongButton title={"Add"} onPress={handleUpdate} />
        </View>
        <ScrollView style={styles.container}>
          <View style={{ paddingBottom: 40 }}>
            {currentUser?.Ingredients?.map(
              (course: Ingredient, index: number) => (
                <View key={index} style={styles.courseContainer}>
                  <Text style={styles.courseText}>
                    {course.id} - {course.name}{" "}
                  </Text>

                  <IconButton
                    icon="close"
                    iconColor="black"
                    size={10}
                    onPress={() => {
                      handleDelete(course.id);
                    }}
                    style={{
                      backgroundColor: "#FDDD3D",
                      width: 20,
                      height: 20,
                    }}
                  />
                </View>
              )
            )}
          </View>
        </ScrollView>
      </ChangeUserInfoBackground>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp("1%"),
    paddingLeft: wp("10%"),
    paddingRight: wp("10%"),
  },
  titleWrapper: {
    width: wp("80%"),
    alignItems: "flex-start",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  courseContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  courseText: {
    fontSize: 18,
    width: "90%",
  },
  longButtonWrapper: {
    alignItems: "center",
    marginTop: 10,
  },
});

export default UpdateIngredients;
