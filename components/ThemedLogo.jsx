import { Image } from "react-native";
import { useColorScheme } from "react-native";
import LightLogo from "../assets/images/react-logo.png"; // Ensure the path is correct
import DarkLogo from "../assets/images/react-logo.png"; // Ensure the path is correct

const ThemedLogo = ({ style, ...props }) => {
    const colorScheme = useColorScheme();
    const logo = colorScheme === 'dark' ? DarkLogo : LightLogo;

    return (
        <Image source={logo}
            style={[style]}
            {...props}
            />
    );
}
export default ThemedLogo;