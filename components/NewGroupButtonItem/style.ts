import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const groupButtonStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.tint,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
  touchableContainer: {
    width:'100%',
    height: '100%',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  mainContainer: {
    backgroundColor: '#e1f5fe',
    width: '95%',
    height: 200,
    justifyContent: 'center', 
    alignItems: 'center',
    borderRadius: 25,
    shadowColor: '#000000',
    elevation: 8,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 18,
  },
  avatar:{
    width: 60,
    height: 60,
    borderRadius: 40,
    marginRight: 10,
    resizeMode: 'cover',
  },
  inputBox: {    
    flex: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  saveButton: {
    padding: 5,
    textAlign: 'center',
    color: '#37474f',
    fontWeight: 'bold',
    borderColor: '#039be5',
    borderWidth: 2,
    borderRadius: 8,
    position: 'absolute',
    bottom: 25,
    right: 20,
  },
});

export default groupButtonStyles;