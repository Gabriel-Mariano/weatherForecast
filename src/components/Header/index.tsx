import React from 'react';
import { View } from 'react-native'; 
import { IHeaderProps } from './types';
import { styles } from './styles';

import Input from '../Input';

const Header:React.FC<IHeaderProps> = props => {
    const { onPress, onChangeText, inputValue } = props;
    return (
        <View style={styles.container}>
            <Input 
                placeholder="Cidades" 
                icon="search"
                value={inputValue}
                onChangeText={(text)=> onChangeText(text) }
                onPress={onPress}
            />
        </View>
    );
}

export default Header;