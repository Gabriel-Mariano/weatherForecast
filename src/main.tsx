import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { WeatherDataProvider } from './hooks/useWeatherData';
import Routes from './routes';

const Main: React.FC = () => {
    return (
        <NavigationContainer>
            <WeatherDataProvider>
                <Routes />
            </WeatherDataProvider>
        </NavigationContainer>
    );
}

export default Main;
