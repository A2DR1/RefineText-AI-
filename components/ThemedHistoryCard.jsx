import { AntDesign } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { Pressable, StyleSheet, Text, View, useColorScheme } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { CatColors } from "../constants/CatColors";
import { Colors } from "../constants/Colors";
import { useHistory } from "../hooks/useHistory";
import ThemedText from "./ThemedText";

const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque faucibus mauris id velit malesuada, vitae imperdiet nulla porttitor. Integer pretium ante at purus accumsan, nec malesuada nulla rhoncus. Aenean nec magna in nunc egestas fermentum. Sed dictum, diam eget placerat lacinia, velit felis facilisis nulla, sed mattis tellus purus at erat. Curabitur fermentum, est vitae commodo iaculis, sem sem euismod justo, nec posuere turpis arcu ut justo. Fusce dictum cursus diam, vitae fermentum ipsum iaculis a. Vivamus non diam et ligula gravida tincidunt at in turpis. Nullam dictum sem vitae libero dapibus scelerisque. Maecenas a mauris vel lorem lacinia fermentum in vitae erat. Sed fermentum, nisl a iaculis tincidunt, mi sem pretium sem, nec elementum lacus orci non est. In ut sapien risus. Ut ut volutpat leo, ac ultricies libero. Integer dignissim, magna sed porta condimentum, felis justo fermentum orci, id sodales orci arcu nec nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.`;

const CategoryLabel = ({category}) => {
  let col = CatColors[category];
  if (!col) col = CatColors.custom;
  return (
    <View style={{
      backgroundColor: col,
      padding: 5,
      borderRadius: 15,
    }}>
      <Text>{category}</Text>
    </View>
  )
}

const ThemedHistoryCard = ({
  id,
  style,
  onPress,
  title = "Default Title",
  date = "Default Date",
  content = longText,
  refresh,
  category,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  const formattedDate = formatDistanceToNow(new Date(date), { addSuffix: true });
  const { deleteHistory } = useHistory();

  const onDelete = async () => {
    try {
      console.log("Deleting history with ID:", id);
      await deleteHistory(id);
      if (refresh) refresh();
    } catch (error) {
      console.error("Error deleting history:", error);
    }
  };

  const renderRightActions = () => {
    return (
      <Pressable
        style={({pressed})=>[styles.deleteAction, pressed && styles.pressed]}
        onPress={onDelete}
      >
        <AntDesign name="delete" size={24} color="white" />
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      rightThreshold={40}
      style={{
      }}
      
    >
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
          <ThemedText title={true} style={styles.date}>{formattedDate}</ThemedText>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
          <ThemedText title={true} style={styles.date}>
            <CategoryLabel category={category}/>
          </ThemedText>
        </View>
        <ThemedText numberOfLines={5} style={{ width: "100%" }}>
          {content}
          {/* Hello World */}
        </ThemedText>
      </Pressable>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    height: 180,
    // width: "80%",
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
  deleteAction: {
    backgroundColor: "#ff4444",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 180,
    marginVertical: 10,
    borderRadius: 5,
  },
  deleteText: {
    color: "white",
    fontSize: 12,
    marginTop: 5,
  },
});

export default ThemedHistoryCard;
