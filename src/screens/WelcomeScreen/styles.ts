import { StyleSheet } from 'react-native';
import { COLORS } from '../../themes/colors';

export const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:30,
        backgroundColor:COLORS.primary
    },
    image:{
        width:300,
        height:120,
        resizeMode:'contain',
        marginBottom:50
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        color:COLORS.white,
    },
    description:{
        fontSize:16,
        color:COLORS.white
    },
    bold:{
        fontWeight:'bold'
    },
    button:{
        width:300,
        height:60,
        backgroundColor:'#27408B',
        position:'absolute',
        bottom:60,

        justifyContent:'center',
        alignItems:'center',

        borderRadius:5
    },
    textButton:{
        fontSize:16,
        fontWeight:'bold',
        color:COLORS.white
    }
})