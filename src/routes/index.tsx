import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackProps } from './types';

import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';

const { Navigator, Screen } = createNativeStackNavigator<StackProps>();

const Routes = () => {
    return (
        <Navigator screenOptions={{
            headerShown:false,
        }}>
            <Screen name="Welcome" component={WelcomeScreen} />
            {/* <Screen name="Home" component={HomeScreen} /> */}
        </Navigator>
    );
}

export default Routes;