import { router } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native";
import { useUser } from "../../hooks/useUser";
import ThemedLoader from "../ThemedLoader";

const GuestOnly = ({ children }) => {
    const { user, authChecked } = useUser();

    useEffect(() => {
        // If the user is authenticated, redirect them to the home page
        if (authChecked && user) {
            router.replace("/home");
        }
    }, [user, authChecked]);

    if (!authChecked && user) {
        return (
            <ThemedLoader />
        );
    }

    return children;
};

export default GuestOnly;