import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';
import { LocationProvider } from './hooks/useLocation';

const Main: React.FC = () => {
    return (
        <NavigationContainer>
            <LocationProvider>
                <Routes />
            </LocationProvider>
        </NavigationContainer>
    );
}

export default Main;
