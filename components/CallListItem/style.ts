import { StyleSheet } from "react-native";

const callStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: "100%",
        justifyContent: "space-between",
        padding: 15,
    },
    leftContainer: {
        flexDirection: 'row',
    },
    midContainer: {
        justifyContent: 'space-around',
    },
    avatar:{
        width: 60,
        height: 60,
        /*backgroundColor: 'red',*/
        borderRadius: 40,
        marginRight: 10
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    time: {
        fontSize: 15,
        color: 'grey',
    },
    calls: {
        marginEnd: 8,
        textAlignVertical: 'center',
        color: '#1565c0',
    }

});

export default callStyles;