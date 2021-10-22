import { StyleSheet } from "react-native";

const searchStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    mainContainer: {
        width: 200,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 15,
        position: 'absolute',
        left: -170,
        top: -5,
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    searchBox: {
        padding: 3,
        marginStart: 5,
        flex: 1,
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContainer:{
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default searchStyles;