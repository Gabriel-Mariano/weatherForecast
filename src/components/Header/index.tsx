import React from 'react';
import { View } from 'react-native'; 
import { styles } from './styles';

import Input from '../Input';

const Header:React.FC = () => {
    return (
        <View style={styles.container}>
            <Input 
                placeholder="Cidades" 
                icon="search"
            />
        </View>
    );
}

export default Header;