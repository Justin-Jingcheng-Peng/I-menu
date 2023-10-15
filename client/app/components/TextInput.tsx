// InputBox.tsx
import React from "react";
import { TextInput, StyleSheet } from "react-native";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: object;
  clearButtonMode?: "never" | "while-editing" | "unless-editing" | "always";
};

const InputBox: React.FC<Props> = ({
  value,
  onChangeText,
  placeholder,
  style,
  clearButtonMode = "while-editing",
}) => {
  return (
    <TextInput
      style={{ ...styles.input, ...style }}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      clearButtonMode={clearButtonMode}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: "80%",
    margin: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    padding: 10,
    backgroundColor: "transparent",
  },
});

export default InputBox;
