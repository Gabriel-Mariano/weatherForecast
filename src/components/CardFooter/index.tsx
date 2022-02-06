import React from 'react';
import { View, Text } from 'react-native';
import { ICardFooterProps } from './types/index.d';
import { COLORS } from '../../themes/colors';
import { styles } from './styles';

import Icon from 'react-native-vector-icons/Ionicons';

const CardFooter:React.FC<ICardFooterProps> = props => {
    const { description, temp_min, temp_max, match } = props;
    return (
        <>
            <View>
                <Text style={styles.description}>
                    {description}
                </Text>
                <Text style={styles.media}>
                    {temp_min}° - {temp_max}°
                </Text>
            </View>
            <View>
                { match 
                    ? <Icon name="heart" size={30} color={COLORS.danger}/>
                    : <Icon name="heart-outline" size={30} color={COLORS.danger}/>
                }
            </View>
        </>
    );
}

export default CardFooter;