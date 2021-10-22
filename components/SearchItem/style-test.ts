import { StyleSheet } from "react-native";

const searchStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    mainContainer: {
        
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 15,
        
        left: -156,
        
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    searchBox: {
        width: 200,
        height: 30,
        position: 'absolute',
        left: -156,
        top: -3,

        borderRadius: 16,
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