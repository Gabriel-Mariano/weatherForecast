import React from 'react';
import { View, Text } from 'react-native';
import { ICardProps } from './types';
import { styles } from './styles';

import Button from '../Button';
import Icon from 'react-native-vector-icons/Ionicons'
import { COLORS } from '../../themes/colors';
import CardFooter from '../CardFooter';

const Card:React.FC<ICardProps> = props => {
    const { 
        title, 
        subtitle, 
        temperature,
        description,
        media,
        match,
        content
    } = props;

    const renderCardFooter = () => {
        return !content
            ? <Button title="ADICIONAR"/>
            : <CardFooter {...{description, media, match } } />
    }

    return (
        <View style={styles.container}>
            <View style={styles.cardHeader}>
                <View>
                    <Text style={styles.city}>
                        {title}
                    </Text>
                    <Text style={styles.country}>
                        {subtitle}
                    </Text>
                </View>
                <View>
                    <Text style={styles.temperature}>
                        {
                            !content
                                ? null
                                : `${temperature}°`
                        }
                    </Text>
                </View>
            </View>
            <View style={styles.cardFooter}>
                {renderCardFooter()}
            </View>
        </View>
    );
}

export default Card;