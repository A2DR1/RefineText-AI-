import { useUser } from "../../hooks/useUser";
import { router } from "expo-router";
import { useEffect } from "react";
import ThemedLoader from "../ThemedLoader";

// This component ensures that only authenticated users can access the wrapped children components.
const UserOnly = ({ children }) => {
    const { user, authChecked } = useUser();

    useEffect(() => {
        if (authChecked && !user) {
            router.replace("/login");
        }
    }, [user, authChecked]);

    if (!authChecked && !user) {
        return (
            <ThemedLoader />
        );
    }

    return children;
};

export default UserOnly;