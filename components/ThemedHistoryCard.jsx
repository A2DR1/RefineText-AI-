import { Pressable, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import { useColorScheme } from "react-native";
import ThemedText from "./ThemedText";
import { View } from "react-native";

  const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque faucibus mauris id velit malesuada, vitae imperdiet nulla porttitor. Integer pretium ante at purus accumsan, nec malesuada nulla rhoncus. Aenean nec magna in nunc egestas fermentum. Sed dictum, diam eget placerat lacinia, velit felis facilisis nulla, sed mattis tellus purus at erat. Curabitur fermentum, est vitae commodo iaculis, sem sem euismod justo, nec posuere turpis arcu ut justo. Fusce dictum cursus diam, vitae fermentum ipsum iaculis a. Vivamus non diam et ligula gravida tincidunt at in turpis. Nullam dictum sem vitae libero dapibus scelerisque. Maecenas a mauris vel lorem lacinia fermentum in vitae erat. Sed fermentum, nisl a iaculis tincidunt, mi sem pretium sem, nec elementum lacus orci non est. In ut sapien risus. Ut ut volutpat leo, ac ultricies libero. Integer dignissim, magna sed porta condimentum, felis justo fermentum orci, id sodales orci arcu nec nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.`;


const ThemedHistoryCard = ({
  style,
  onPress,
  title = "Default Title",
  date = "Default Date",
  content = longText,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: theme.uiBackground,
        },
        styles.card,
        pressed && styles.pressed,
        style,
      ]}
      onPress={onPress}
      {...props}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
        <ThemedText title={true} style={styles.title}>{title}</ThemedText>
        <ThemedText title={true} style={styles.date}>{date}</ThemedText>
      </View>
      <ThemedText numberOfLines={5} style={{ width: "100%" }}>
        {content}
      </ThemedText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    // justifyContent: "center",
    // alignItems: "center",
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    height: 150,
    width: "80%",
  },
  pressed: {
    opacity: 0.6,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  date: {
    fontSize: 16,
  },
});

export default ThemedHistoryCard;
