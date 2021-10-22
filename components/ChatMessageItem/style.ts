import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const chatMessageStyles = StyleSheet.create({
    container: {
        padding: 8,
    },
    messageBox: {
        borderRadius: 5,
        padding: 9,
    },
    userName: {
        color: Colors.dark.tint,
        fontWeight: 'bold',
        marginBottom: 5
    },
    message: {
        color: '#37474f',
    },
    time: {
        alignSelf: 'flex-end',
        color: '#455a64'
    },
});

export default chatMessageStyles;