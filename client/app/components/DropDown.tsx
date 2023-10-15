import React from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

type Props = {
  items: Array<{ label: string; value: string }>;
  value: string;
  onValueChange: (item: any) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  isFocused?: boolean;
};

const DropDown: React.FC<Props> = ({
  items,
  value,
  onValueChange,
  onFocus,
  onBlur,
  isFocused,
}) => {
  return (
    <View style={{ width: "80%", margin: 20, height: 50 }}>
      <Dropdown
        style={[
          styles.dropdown,
          { borderColor: isFocused ? "black" : "black" },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={items}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        searchPlaceholder="Search..."
        placeholder={!isFocused ? "Select item" : "..."}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onValueChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    paddingHorizontal: 8,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default DropDown;
