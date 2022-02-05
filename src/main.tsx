import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';

const Main: React.FC = () => {
    return (
        <NavigationContainer>
            <Routes />
        </NavigationContainer>
    );
}

export default Main;
