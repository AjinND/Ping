import { StyleSheet } from "react-native";

const optionStyles = StyleSheet.create({
    container: {
        width: 200,
        flex: 1,  
        marginTop: 24,
        position: 'absolute',
        right: 0,
      },
      innerContainer: {
        margin: 20,
        backgroundColor: '#eeeeee',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 1,
          height: 3,
        },
        shadowOpacity: .5,
        shadowRadius: 4,
        elevation: 5,
      },
      modalText: {
        margin: 5,
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 16,
      }
});

export default optionStyles;