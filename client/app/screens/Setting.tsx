import React, { useEffect } from "react";
import { StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import {
  useNavigation,
  ParamListBase,
  useFocusEffect,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { ListItem } from "react-native-elements";
import { Button } from "react-native-elements";
import { getUserById } from "../utils/db";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { Ingredient, MedicalHistory } from "../types";
import { setCurrentUser } from "../store/features/currentUserSlice";
import { LinearGradient } from "expo-linear-gradient";

function getIconByTitle(title: string) {
  switch (title) {
    case "Email": {
      return <FontAwesome5 name="inbox" size={24} color="black" />;
    }
    case "Username": {
      return <FontAwesome5 name="user" size={24} color="black" />;
    }

    case "Program": {
      return <FontAwesome5 name="graduation-cap" size={24} color="black" />;
    }

    case "Ingredients": {
      return <FontAwesome5 name="utensils" size={24} color="black" />;
    }

    case "Medical Histories": {
      return <FontAwesome5 name="file-medical" size={24} color="black" />;
    }

    case "Height": {
      return <FontAwesome5 name="ruler-vertical" size={24} color="black" />;
    }
    case "Weight": {
      return <FontAwesome5 name="balance-scale" size={24} color="black" />;
    }
    case "Religion": {
      return <FontAwesome5 name="pray" size={24} color="black" />;
    }
    case "Age": {
      return <FontAwesome5 name="birthday-cake" size={24} color="black" />;
    }
    case "Gender": {
      return <FontAwesome5 name="venus-mars" size={24} color="black" />;
    }
    default: {
      return <Text>Error</Text>;
    }
  }
}

export default function Setting() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const currentUserRedux = useSelector(
    (state: any) => state.currentUser.currentUser
  );

  const dispatch = useDispatch();
  const handleSignOffClick = async () => {
    try {
      await signOut(FIREBASE_AUTH);
    } catch (error) {
      console.log("Error signing off:", error);
    }
  };
  const settingsOptions = [
    {
      title: "Username",
      onPress: () => {
        navigation.navigate("UpdateUsername");
      },
    },

    {
      title: "Ingredients",
      onPress: () => {
        navigation.navigate("UpdateIngredients");
      },
    },
    {
      title: "Medical Histories",
      onPress: () => {
        navigation.navigate("UpdateMedicalHistories");
      },
    },
    {
      title: "Height",
      onPress: () => {
        navigation.navigate("UpdateHeight");
      },
    },
    {
      title: "Weight",
      onPress: () => {
        navigation.navigate("UpdateWeight");
      },
    },
    {
      title: "Religion",
      onPress: () => {
        navigation.navigate("UpdateReligion");
      },
    },
    {
      title: "Age",
      onPress: () => {
        navigation.navigate("UpdateAge");
      },
    },
    {
      title: "Gender",
      onPress: () => {
        navigation.navigate("UpdateGender");
      },
    },
  ];

  const getFieldText = (field: string) => {
    switch (field) {
      case "Username":
        return currentUserRedux?.username;

      case "Ingredients":
        return currentUserRedux?.Ingredients.map(
          (course: Ingredient) => course.id
        ).join(", ");

      case "Medical Histories":
        return currentUserRedux?.medicalHistories
          .map((course: MedicalHistory) => course.id)
          .join(", ");

      case "Height":
        return `${currentUserRedux?.height}cm`;

      case "Weight":
        return `${currentUserRedux?.weight}kg`;

      case "Religion":
        return `${currentUserRedux?.religion}`;

      case "Age":
        return `${currentUserRedux?.age} years old`;

      case "Gender":
        return `${currentUserRedux?.gender}`;

      default:
        return;
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      const fetchUser = async () => {
        const user = await getUserById(FIREBASE_AUTH.currentUser!.uid);
        dispatch(setCurrentUser(user));
      };
      fetchUser();
      return () => {};
    }, [])
  );

  return (
    <LinearGradient
      // Define the gradient start and end points
      start={{ x: 0, y: 0 }}
      end={{ x: 0.58, y: 1 }}
      // Gradient color stops
      colors={["rgba(128, 252, 250, 0.5)", "rgba(162, 253, 36, 0.5)"]}
      style={styles.container}
    >
      <ScrollView>
        {settingsOptions.map((option, index) => (
          <TouchableOpacity
            onPress={option.onPress}
            activeOpacity={0.6}
            key={index}
          >
            <ListItem key={index} containerStyle={styles.listItem}>
              <ListItem.Content style={styles.iconContainer}>
                {getIconByTitle(option.title)}
              </ListItem.Content>
              <ListItem.Content style={styles.textContainer}>
                <ListItem.Title style={styles.listItemText}>
                  {option.title}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.detailText}>
                  {getFieldText(option.title)}
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron color="#b5b5b5" />
            </ListItem>
          </TouchableOpacity>
        ))}
        <Button
          title="Log Out"
          onPress={handleSignOffClick}
          buttonStyle={styles.logoutButton}
          titleStyle={styles.logoutButtonText}
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    borderRadius: 10,
    marginTop: 12,
    elevation: 1,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 1 },
    width: "95%",
    alignSelf: "center",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 4,
  },
  listItemText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  detailText: {
    fontSize: 14,
    color: "#888",
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#e74c3c",
    borderRadius: 10,
    paddingVertical: 12,
    marginBottom: 20,
    width: "95%",
    alignSelf: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  profileImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#06D1C8",
  },
});
