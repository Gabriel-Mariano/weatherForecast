import { StyleSheet } from 'react-native';
import { COLORS } from '../../../themes/colors';

export const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:130,

        backgroundColor:COLORS.white,
        borderRadius:2,

        paddingVertical:15,
        paddingHorizontal:16,
        marginBottom:10,

        elevation:1,
        shadowColor:COLORS.black,
        shadowOffset:{ width:0, height:2 },
        shadowOpacity:0.1,
        shadowRadius:2,
    },
    cardHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    cardFooter:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:13
    },
    city:{
        fontSize:24,
        marginBottom:2
    },
    country:{
        fontSize:14
    },
    temperature:{
        fontSize:34,
        color:COLORS.info
    },
})