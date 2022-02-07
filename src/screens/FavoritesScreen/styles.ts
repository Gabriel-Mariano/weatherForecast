import { StyleSheet } from 'react-native';
import { COLORS } from '../../themes/colors';

export const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    body:{
        flex:1,
        width:'100%',
        paddingHorizontal:16,
        paddingVertical:16
    },
    title:{
        alignSelf:'center',
        fontSize:20,
        fontWeight:'bold',
        color:COLORS.primary,
        marginVertical:20
    },
    wrapper:{
        width:'100%',
        paddingHorizontal:15,
    },
    info:{
        fontSize:20,
        fontWeight:'bold',
        color:COLORS.black,
        textAlign:'center',
        marginTop:40,
        marginBottom:16,
    },
    description:{
        fontSize:16,
        textAlign:'center'
    }
});