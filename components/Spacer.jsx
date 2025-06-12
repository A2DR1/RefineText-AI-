import { View } from "react-native";

const Spacer = ({ height = 40, width = "100%", style, ...props }) => {
    return (
        <View
            style={[
                {
                    height: height,
                    width: width,
                },
                style,
            ]}
            {...props}
        />
    );
}
export default Spacer;