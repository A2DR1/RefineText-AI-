import Entypo from '@expo/vector-icons/Entypo';
import { useFocusEffect } from "@react-navigation/native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import Spacer from '../../../components/Spacer';
import ThemedButton from "../../../components/ThemedButton";
import ThemedCard from '../../../components/ThemedCard';
import ThemedScrollView from "../../../components/ThemedScrollView";
import ThemedText from "../../../components/ThemedText";
import ThemedView from "../../../components/ThemedView";
import { Colors } from "../../../constants/Colors";
import { useHistory } from "../../../hooks/useHistory";
import { useUser } from "../../../hooks/useUser";

const Profile = () => {
  const { user, logout, deleteAccount } = useUser();
  const { histories, fetchHistories, fetchHistoryById, deleteAllHistories } = useHistory();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    await logout();
    console.log("Logout button pressed");
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            let currentUser = user;
            try {
              await deleteAccount();
              console.log("Delete account button pressed");
            } catch (error) {
              Alert.alert("Error", "Something went wrong while deleting your account.");
              console.error("Error deleting account:", error);
            }
            finally {
              await deleteAllHistories(currentUser);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  useFocusEffect(
    useCallback(() => {
      if (!user) {
        // console.log("User not logged in, redirecting to needLogin");
        router.replace("/(auth)/login");
      } else {
        // to do?
      }
    }, [user])
  );

  return (
    <ThemedScrollView>
      <ThemedView
        safe={true}
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView, {backgroundColor: theme.navBackground}]}>
            <Image
              source={require("../../../assets/images/profile2.jpeg")}
              style={{ width: 300, height: 300, borderRadius: "50%" }}
            />
              {/* <Text style={styles.modalText}>Hello World!</Text> */}
              <ThemedButton
                style={[styles.button, styles.buttonClose]}
                onPress={() => {}}
              >
                <Text style={styles.textStyle}>Change Profile Picture</Text>
              </ThemedButton>
              <ThemedButton
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                {/* <Text style={styles.textStyle}>Hide Modal</Text> */}
                <Entypo name="cross" size={24} color="white" />
              </ThemedButton>
            </View>
          </View>
        </Modal>

        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: "grey",
                height: 80,
                width: 80,
                borderRadius: 50,
              },
              pressed && {
                opacity: 0.8,
              },
            ]}
            onPress={() => setModalVisible(true)}
          >
            <Image
              source={require("../../../assets/images/profile2.jpeg")}
              style={{ width: 80, height: 80, borderRadius: '50%' }}
            />
          </Pressable>

          <View style={{ marginLeft: 10 }}>
            <ThemedText title={true} style={styles.title}>
              {user?.email || "No user logged in"}
            </ThemedText>
            {/* <ThemedText style={styles.text}>
              {user?.name || "No name available"}
            </ThemedText> */}
          </View>
        </View>

        <Spacer size={20} />

        <ThemedCard style={styles.card}>
          <ThemedText>
            <Text>Current Plan</Text>
          </ThemedText>
        </ThemedCard>

        <ThemedButton
          onPress={handleLogout}
          style={styles.btn}
        >
          <Text style={{ color: "white" }}>Logout</Text>
        </ThemedButton>

        <ThemedButton
          onPress={handleDeleteAccount}
          style={styles.btn}
        >
          <Text style={{ color: "white" }}>Delete Account</Text>
        </ThemedButton>

        {/* <ThemedCard> </ThemedCard> */}
      </ThemedView>
    </ThemedScrollView>
  );
};
export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: 'center',
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    margin: 10,
  },
  text: {
    fontSize: 20,
    margin: 10,
  },
  link: {
    fontSize: 20,
    color: "blue",
    textDecorationLine: "underline",
    marginTop: 10,
  },
  card: {
    width: "80%",
    height: 100,
    margin: 20,
  },
  btn: {
    width: "80%",
    margin: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    opacity: 1,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 10,
  },
  // buttonOpen: {
  //   backgroundColor: '#F194FF',
  // },
  // buttonClose: {
  //   backgroundColor: '#2196F3',
  // },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
