import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InitalRouteProps } from './types';

import WelcomeScreen from '../screens/WelcomeScreen';
import MyTabs from './customTabs';

const { Navigator, Screen } = createNativeStackNavigator<InitalRouteProps>();

const Routes = () => {
    return (
        <Navigator screenOptions={{ headerShown:false }}>
            <Screen name="Welcome" component={WelcomeScreen} />
            <Screen name="Tabs" component={MyTabs}/>
        </Navigator>
    );
}

export default Routes;