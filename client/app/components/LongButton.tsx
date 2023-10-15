import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

interface LongButtonProps {
  title: string;
  onPress: () => void;
}

const LongButton: FC<LongButtonProps> = ({ title, onPress }) => {
  return (
    <View
      style={{
        elevation: 1,
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: { width: 1, height: 1 },
      }}
    >
      <Button
        buttonStyle={styles.button}
        title={title}
        titleStyle={styles.buttonText}
        onPress={onPress}
      />
    </View>
  );
};

export default LongButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    height: 48,
    width: 187,
    backgroundColor: "#7FFFC6",
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  buttonText: {
    color: "#333333",
    fontWeight: "bold",
    fontSize: 15,
  },
});
