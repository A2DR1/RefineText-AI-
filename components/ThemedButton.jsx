import { Pressable, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

const ThemedButton = ({ style, onPress, ...props }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.btn, pressed && styles.pressed, style]}
      onPress={onPress}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 20,
    marginVertical: 10,
  },
  pressed: {
    opacity: 0.8,
  },
});

export default ThemedButton;
