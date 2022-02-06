import { StyleSheet } from "react-native";
import { COLORS } from "../../../themes/colors";

export const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:50,

        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        
        borderRadius:5,
    },
    input:{
        width:'90%',
        height:50,

        justifyContent:'center',
        alignItems:'center',

        borderTopLeftRadius:5,
        borderBottomLeftRadius:5,

        color:COLORS.white,
        fontSize:20,
    },
    rightContent:{
        width:'10%',
        height:40,

        justifyContent:'center',
        alignItems:'center',

        borderTopRightRadius:5,
        borderBottomRightRadius:5,
    }
});