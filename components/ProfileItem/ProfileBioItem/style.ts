import { StyleSheet } from "react-native";

const profileBioStyles = StyleSheet.create({
    infoConatiner: {
        flexDirection: 'row',
        padding: 8,
        marginBottom: 8,
        borderBottomColor: 'black',
        borderBottomWidth: .25,
        //backgroundColor:'yellow',
    },
    iconStyle: {
        justifyContent:'center',
        alignSelf:'center',
        marginEnd: 12,
        //backgroundColor: 'green',
    },
    nameConatiner: {
        flex: 1,
        justifyContent: 'space-between',
        marginEnd: 8,
        //backgroundColor: 'blue',
    },
    textCaption: {
        fontSize: 15,
        color: '#455a64',
    },
    textInfo: {
        fontSize: 17,
    },
    modalContainer:{
        backgroundColor: '#546e7a',
        borderTopStartRadius: 16,
        borderTopEndRadius: 16,
        flexDirection: 'row',
        flex: 1,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
    },
    inputBox: {
        height: 60,
        marginLeft: 40,
        flex: 1,
        fontSize: 18,
        padding: 6
    },
    buttonContainer: {
        height: 32,
        width: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 38,
    },
});
export default  profileBioStyles;