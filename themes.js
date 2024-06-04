import  { StyleSheet } from "react-native";
import colors from "./colors";



export const CardConfig = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: colors.secondary,
        marginVertical: 5,
        borderRadius: 15,
        shadowColor: '#000000',
        height: 'auto',
        width: '90%',
        top: 50,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 3,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 13,
    },
    logoCamaleon: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: 300,
        height: 150,
        top: -25,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    input: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 5,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius : 20,
        
    },
    container: {
		flex: 1,
		justifyContent : "flex-start",
		backgroundColor: 'white',
	},
    userContainer: {
        backgroundColor: "white",
        width: '90%',
        borderRadius: 16,
        marginTop: 20,
        padding: 20
    },
    userInformation:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
});