import React from 'react';
import { View, Text } from 'react-native';
import { ICardFooterProps } from './types/index.d';
import { COLORS } from '../../themes/colors';
import { styles } from './styles';

import Icon from 'react-native-vector-icons/Ionicons';
import { useWeatherData } from '../../hooks/useWeatherData';

const CardFooter: React.FC<ICardFooterProps> = props => {
    const { 
        description, 
        temp_min, 
        temp_max, 
        match, 
        matchIsVisible,  
        id 
    } = props;

    const { weatherData, setWeatherData } = useWeatherData();

    const handleLiked = () => {
        const changeData = weatherData.map((values: any) => {
            return values.id !== id
                ? values
                : { ...values, match: !match }
        });

        setWeatherData(changeData)
    }

    const handleVisibilityMatch = () => {
        return matchIsVisible
            ? renderIcon()
            : null
    }

    const renderIcon = () => {
        return match
            ? <Icon
                name="heart"
                size={30}
                color={COLORS.danger}
                onPress={handleLiked}
              />
            : <Icon
                name="heart-outline"
                size={30}
                color={COLORS.danger}
                onPress={handleLiked}
              />
    }

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
                {handleVisibilityMatch()}
            </View>
        </>
    );
}

export default CardFooter;