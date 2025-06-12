import { ScrollView } from "react-native";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

const ThemedScrollView = ({ style, ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <ScrollView
      style={{
        backgroundColor: theme.background,
      }}
      {...props}
    />
  );
};
export default ThemedScrollView;
