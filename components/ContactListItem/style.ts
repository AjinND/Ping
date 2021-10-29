import { StyleSheet } from "react-native";

const contactStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: "100%",
        padding: 15,
    },
    leftContainer: {
        flexDirection: 'row',
    },
    rightContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        flex: 1,
    },
    innerContainer: {
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    avatar:{
        width: 60,
        height: 60,
        backgroundColor: 'red',
        borderRadius: 40,
        marginRight: 10
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    status: {
        color: '#455a64',
    },
});

export default contactStyles;