import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/screens/Login";
import Setting from "./app/screens/Setting";
import { useEffect, useRef, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import { Provider } from "react-redux";
import { store } from "./app/store/store";
import { createStackNavigator } from "@react-navigation/stack";
import {
  InsideRootStackParamList,
  OutsideRootStackParamList,
} from "./app/types";
import Signup from "./app/screens/Signup";

import UpdateUsername from "./app/screens/userInfoEditScreens/UpdateUsername";
import UpdateIngredients from "./app/screens/userInfoEditScreens/UpdateIngredients";
import UpdateMedicalHistories from "./app/screens/userInfoEditScreens/UpdateMedicalHistories";
import ResetPassword from "./app/screens/ResetPassword";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { KeyboardAvoidingView, Platform, AppState } from "react-native";
import { View } from "react-native";
import { Header } from "react-native-elements";
import { StatusBar } from "react-native";
import Test from "./app/screens/Test";
import UpdateHeight from "./app/screens/userInfoEditScreens/UpdateHeight";
import React from "react";
import UpdateWeight from "./app/screens/userInfoEditScreens/UpdateWeight";
import UpdateReligion from "./app/screens/userInfoEditScreens/UpdateReligion";
import UpdateAge from "./app/screens/userInfoEditScreens/UpdateAge";
import UpdateGender from "./app/screens/userInfoEditScreens/UpdateGender";
const Stack = createNativeStackNavigator();
const InsideStack = createStackNavigator<InsideRootStackParamList>();
const OutsideStack = createStackNavigator<OutsideRootStackParamList>();

function InsideLayout() {
  return (
    <View style={{ flex: 1 }}>
      <InsideStack.Navigator>
        <InsideStack.Screen
          name="BottomTabs"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <InsideStack.Screen name="UpdateUsername" component={UpdateUsername} />
        <InsideStack.Screen
          name="UpdateIngredients"
          component={UpdateIngredients}
        />
        <InsideStack.Screen
          name="UpdateMedicalHistories"
          component={UpdateMedicalHistories}
        />
        <InsideStack.Screen name="UpdateHeight" component={UpdateHeight} />
        <InsideStack.Screen name="UpdateWeight" component={UpdateWeight} />
        <InsideStack.Screen name="UpdateReligion" component={UpdateReligion} />
        <InsideStack.Screen name="UpdateAge" component={UpdateAge} />
        <InsideStack.Screen name="UpdateGender" component={UpdateGender} />
        <InsideStack.Screen name="Test" component={Test} />
      </InsideStack.Navigator>
    </View>
  );
}
function OutsideLayout() {
  return (
    <>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <OutsideStack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ headerShown: false }}
        />
      </OutsideStack.Navigator>
    </>
  );
}

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  const renderContent = () => (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Setting"
        component={Setting}
        options={{
          title: "Me",
          header: () => (
            <Header
              centerComponent={{
                text: `Me`,
                style: { color: "#000000", height: 20, fontWeight: "bold" },
              }}
              containerStyle={{
                borderBottomWidth: 0,
                backgroundColor: "#FFFFFF",
              }}
              statusBarProps={{
                barStyle: "dark-content",
                backgroundColor: "transparent",
                translucent: true,
              }}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Test"
        component={Test}
        options={{
          title: "Camera",
          header: () => (
            <Header
              centerComponent={{
                text: `Camera`,
                style: { color: "#000000", height: 20, fontWeight: "bold" },
              }}
              containerStyle={{
                borderBottomWidth: 0,
                backgroundColor: "#FFFFFF",
              }}
              statusBarProps={{
                barStyle: "dark-content",
                backgroundColor: "transparent",
                translucent: true,
              }}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="camera" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );

  return Platform.OS === "ios" ? (
    <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
      {renderContent()}
    </KeyboardAvoidingView>
  ) : (
    renderContent()
  );
}
export default function App() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);
  const appState = useRef(AppState.currentState);
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {user && user.emailVerified ? (
            <Stack.Screen
              name="Inside"
              component={InsideLayout}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="Outside"
              component={OutsideLayout}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
