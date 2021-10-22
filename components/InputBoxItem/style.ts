import { StyleSheet } from "react-native";

const inputBoxStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    mainContainer: {
        flexDirection: 'row',
        backgroundColor: '#e0f2f1',
        padding: 8,
        borderRadius: 15,
        marginStart: 10,
        marginEnd: 6,
        marginBottom: 10,
        alignItems: 'center',
        flex: 1,
    },
    inputBox: {
        marginStart: 5,
        flex: 1,
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icons: {
        marginHorizontal: 4,
    },
    buttonContainer:{
        backgroundColor: '#e0f7fa',
        marginBottom: 10,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 8,
        width: 32,
    },
});

export default inputBoxStyles;