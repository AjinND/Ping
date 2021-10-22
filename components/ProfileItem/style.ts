import { StyleSheet } from "react-native";

const profileStyles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#bbdefb'
    },
    imageContainer: {
        alignItems: 'center',
        padding: 5,
        marginTop: 40,
    },
    borderContainer: {
        height: 1,
        width: 200,
        marginTop: 20,
        backgroundColor: 'black',
        alignSelf: 'center'
    },
    avatar: {
        width: 200,
        height: 200,
        borderRadius: 90,
    },
    editImageContainer: {
        height: 50,
        width:50,
        borderRadius: 20,
        position: 'absolute',
        bottom: 13,
        right: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'red',
        borderWidth: 1.5,
    },
    mainContainer: {
        padding: 20,
        marginHorizontal: 10,
        //backgroundColor: 'red',
    },
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
    companyName: {
        position: 'absolute',
        color: '#90caf9',
        bottom: 30,
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default profileStyles;