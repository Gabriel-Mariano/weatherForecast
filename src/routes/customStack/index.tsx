import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackProps } from '../types/index.d';

import HomeScreen from '../../screens/HomeScreen';
import DetailsScreen from '../../screens/DetailsScreen';

const { Navigator, Screen } = createNativeStackNavigator<StackProps>();

const Stack = () => {
    return (
        <Navigator screenOptions={{ headerShown:false }}>
            <Screen name="Home" component={HomeScreen} />
            <Screen name="Details" component={DetailsScreen} />
        </Navigator>
    );
}

export default Stack;