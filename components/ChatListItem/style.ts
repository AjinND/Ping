import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
        /*backgroundColor: 'red',*/
        borderRadius: 40,
        marginRight: 10
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    lastMessage: {
        fontSize: 15,
        color: 'grey',
    },
    time: {
        fontSize: 14,
        color: 'grey',
    },

});

export default styles;