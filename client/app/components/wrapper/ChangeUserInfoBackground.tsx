import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconButton } from "react-native-paper";
import Constants from "expo-constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const topInset = Constants.statusBarHeight;

interface ChangeUserInfoBackgroundProps {
  children: React.ReactNode;
  goBack?: () => void;
  showGoBack?: boolean;
}

const ChangeUserInfoBackground: React.FC<ChangeUserInfoBackgroundProps> = ({
  children,
  goBack,
  showGoBack = false,
}) => {
  return (
    <LinearGradient
      colors={["rgba(250, 255, 113, 0.5)", "rgba(80, 234, 205, 0.5)"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {showGoBack && goBack && (
        <IconButton
          icon="arrow-left"
          size={20}
          onPress={goBack}
          style={styles.goBackButton}
        />
      )}
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: hp("10%"),
    position: "relative",
  },
  goBackButton: {
    position: "absolute",
    top: topInset + hp("1%"),
    left: 10,
    width: 30,
    height: 30,
    backgroundColor: "#FDDD3D",
  },
});

export default ChangeUserInfoBackground;
