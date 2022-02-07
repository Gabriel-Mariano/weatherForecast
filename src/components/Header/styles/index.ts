import { StyleSheet } from 'react-native';
import { COLORS } from '../../../themes/colors';

export const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:56,
        paddingHorizontal:16,
        
        justifyContent:'center',
        backgroundColor:COLORS.primary
    },
    wrapper:{
        height:56,
        flexDirection:'row',
        alignItems:'center',
    },
    icon:{
        padding:10,
    },
    title:{
        color:COLORS.white,
        fontSize:16,
        marginLeft:20
    }
});

