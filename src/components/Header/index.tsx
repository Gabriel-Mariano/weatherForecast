import React from 'react';
import { View, Text } from 'react-native'; 
import { IHeaderProps } from './types';
import { styles } from './styles';
import { COLORS } from '../../themes/colors';

import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackProps } from '../../routes/types';

import Input from '../Input';
import Icon from 'react-native-vector-icons/Ionicons'

const Header:React.FC<IHeaderProps> = props => {
    const { onPress, onChangeText, inputValue, route, title } = props;

    const navigation = useNavigation<NativeStackNavigationProp<StackProps>>();

    const renderContentHeader = () => {
        return route === 'Details'
            ? <View style={styles.wrapper}>
                <Icon 
                    name="arrow-back" 
                    size={18} 
                    color={COLORS.white} 
                    style={styles.icon}
                    onPress={()=> navigation.goBack() }
                />
                <Text style={styles.title}>
                    {title}
                </Text>
              </View>
            : <Input
                placeholder="Cidades"
                icon="search"
                value={inputValue}
                onChangeText={(text) => onChangeText && onChangeText(text)}
                onPress={onPress}
               />
    }


    return (
        <View style={styles.container}>
            {renderContentHeader()}
        </View>
    );
}

export default Header;