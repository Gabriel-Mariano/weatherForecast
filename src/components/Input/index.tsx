import React from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { IInputComponentProps } from './types/index.d';
import { COLORS } from '../../themes/colors';
import { styles } from './styles';

import Icon from 'react-native-vector-icons/Fontisto';

const Input: React.FC<IInputComponentProps> = props => {
    
    const { icon, onPress, ...inputProps } = props;

    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={inputProps.onChangeText}
                value={inputProps.value}
                keyboardType={inputProps.keyboardType}
                placeholder={inputProps.placeholder}
                placeholderTextColor={styles.input.color}
                style={styles.input}
            />
            <Pressable 
                onPress={onPress}
                style={styles.rightContent}
            >
                <Icon 
                    name={icon} 
                    size={16} 
                    color={COLORS.white}
                />
            </Pressable>
        </View>
    );
}

export default Input;