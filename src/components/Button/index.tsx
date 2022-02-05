import React from 'react';
import { Pressable, Text } from 'react-native';
import { styles } from './styles';
import { IButtonProps } from './types';

const Button:React.FC<IButtonProps> = props => {
    const { title, ...buttonProps } = props;

    return (
        <Pressable
            onPress={()=> { } }
        >
            <Text style={styles.title}>
                {title}
            </Text>
        </Pressable>
    );
}

export default Button;