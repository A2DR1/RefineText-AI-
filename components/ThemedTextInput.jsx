import { StyleSheet, TextInput } from "react-native";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

const ThemedTextInput = ({ style, ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <TextInput
      style={[{ 
        backgroundColor: theme.uiBackground,
        color: theme.text, 
        padding: 20,
        borderRadius: 10,
    }, style]}
      {...props}
    />
  );
};

export default ThemedTextInput;