import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const floatingButtonStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.dark.tint,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        position: 'absolute',
        bottom: 25,
        right: 25,
    },
});

export default floatingButtonStyles;